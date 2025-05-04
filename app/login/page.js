import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "./_components/login-form";
import SocialLogins from "./_components/social-logins";

const LoginPage = () => {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Go to Home
        </Link>
      </div>

      <div className="container">
        <LoginForm />
        <SocialLogins />
      </div>
    </div>
  );
};

export default LoginPage;
