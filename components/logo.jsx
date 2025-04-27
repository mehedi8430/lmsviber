import { cn } from "@/lib/utils";
import { Lobster } from "next/font/google";
import "./Logo.css";

const lobster = Lobster({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lobster",
});

export const Logo = ({ className = "" }) => {

  return (
    <h1 className={cn("logo", lobster.variable, className)}>
      <span className="highlight text-4xl">lmsViber</span>
    </h1>
  );
};
