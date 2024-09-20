"use client"; // This must be a client component to handle rendering errors

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Error boundary caught an error:", error);
  }, [error]);

  return (
    <div className="pt-[8rem] px-12">
      <h2>Oops! Something went wrong.</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
