import { AuthProvider} from "@/context/AuthContext";
import "./globals.css";
import Header from "@/components/Header";
import { poppins } from "@/fonts";
import { BlogProvider } from "@/context/BlogContext";

export const metadata = {
  title: "DevDiary",
  description: "Explore and Create your favourite content.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>
          <BlogProvider>
            <Header/>
            {children}
          </BlogProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
