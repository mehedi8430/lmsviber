import { cn } from "@/lib/utils";
import "./Logo.css"; // Import your CSS file

export const Logo = ({ className = "" }) => {
  return (
    <h1 className={cn("logo", className)}>
      edutech<span className="highlight">online</span>
    </h1>
  );
};
