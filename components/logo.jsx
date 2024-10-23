import { cn } from "@/lib/utils";
import "./Logo.css";

export const Logo = ({ className = "" }) => {

  return (
    <h1 className={cn("logo", className)}>
      edutech<span className="highlight">online</span>
    </h1>
  );
};
