export const isUserLogin = async (req, res, next)=>{
    try {
      if (req.headers && req.headers["authorization"]) {
        const access_token = req.headers["authorization"].split(" ")[1];
        const decoded = await verifyAccessToken(access_token);
        console.log(decoded);
        if (decoded) {
            const userWOP = {
                _id: decoded.id,
                name: decoded.name,
                email: decoded.email,
                designation: decoded.designation,
              };
            req.user = userWOP;
            next();
        } else {
          if (req.cookies && req.cookies["refreshToken"]) {
            const refreshToken = req.cookies["refreshToken"];
            if (refreshToken) {
              const decoded = await verifyRefreshToken(refreshToken);
              console.log("REfresh", decoded);
              if (decoded) {
                const userWOP = {
                    _id: decoded.id,
                    name: decoded.name,
                    email: decoded.email,
                    designation: decoded.designation,
                  };
                const newAccessToken = await createToken({
                    ...userWOP,
                    role: "USER",
                  });
                  req.user = userWOP;
                  res.cookie("token",newAccessToken,{
                    httpOnly: true,
                    secure: true,
                    maxAge: 60 * 1000, 
                  })
                  next();
              } else {
                const error = new Error();
                error.statusCode = 403;
                error.reasons = ["Invalid Refresh!!"];
                throw error;
              }
            } else {
              const error = new Error();
              error.statusCode = 403;
              error.reasons = ["Invalid Token!!"];
              throw error;
            }
          } else {
            const error = new Error();
            error.statusCode = 403;
            error.reasons = ["UnAuthorized User!!"];
            throw error;
          }
        }
      } else {
        console.log(req.cookies);
        if (req.cookies && req.cookies["refreshToken"]) {
          const refreshToken = req.cookies["refreshToken"];
          if (refreshToken) {
            const decoded = await verifyRefreshToken(refreshToken);
            console.log("REfresh", decoded);
            if (decoded) {
              if (decoded.role === "USER") {
                const isAllowed = await userRepository.findUserById(decoded.id);
                console.log(isAllowed);
                if (isAllowed) {
                  if (!isAllowed.isVerified) {
                    const error = new Error();
                    error.statusCode = 403;
                    error.reasons = ["You are temporarily blocked by admin!!"];
                    throw error;
                  } else {
                    const userWOP = {
                      id: isAllowed.id,
                      email: isAllowed.email,
                      mobile: isAllowed.mobile,
                      firstname: isAllowed.firstname,
                      lastname: isAllowed.lastname,
                      image: isAllowed.image,
                      address: isAllowed.address,
                      walletBalance: isAllowed.walletBalance,
                      isVerified: isAllowed.isVerified,
                    };
                    const newAccessToken = await createToken({
                      ...userWOP,
                      role: "USER",
                    });
                    req.newUserToken = newAccessToken;
                    req.user = userWOP;
                    next();
                  }
                } else {
                  const error = new Error();
                  error.statusCode = 403;
                  error.reasons = ["Invalid Refresh!!"];
                  throw error;
                }
              } else {
                const error = new Error();
                error.statusCode = 403;
                error.reasons = ["UnAuthorized User!!"];
                throw error;
              }
            } else {
              const error = new Error();
              error.statusCode = 403;
              error.reasons = ["Invalid Refresh!!"];
              throw error;
            }
          } else {
            const error = new Error();
            error.statusCode = 403;
            error.reasons = ["Invalid Token!!"];
            throw error;
          }
        } else {
          const error = new Error();
          error.statusCode = 403;
          error.reasons = ["UnAuthorized User!!"];
          throw error;
        }
      }
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  }