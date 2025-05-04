import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "lmsViber - Next-Gen LMS for Future-Ready Minds.",
  description: "lmsViber is a next-generation learning platform designed to energize your skills, knowledge, and growth — anytime, anywhere.",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={cn(inter.className, poppins.className)}>
        <div className="bg-[linear-gradient(to_right,_rgba(144,137,252,0.2),_rgba(255,128,181,0.1))]">
          {children}
        </div>
        <Toaster richColors position="top-center"/>
      </body>
    </html>
  );
}
