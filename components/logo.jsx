// import { cn } from "@/lib/utils";
import { Lobster } from "next/font/google";
import Image from "next/image";
import "./Logo.css";

const lobster = Lobster({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lobster",
});

export const Logo = ({ className = "" }) => {

  return (
    <div className="w-80 h-28 my-auto flex items-center">
      <Image
        src="/logo.png"
        alt="Logo"
        width={310}
        height={100}
        className="ml-[-56px]"
        priority
      />
    </div>
  );
};
