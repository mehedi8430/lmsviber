import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SignupForm } from "../_components/signup-form";

const RegisterPage = ({ params: { role } }) => {

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
        <SignupForm role={role} />
      </div>
    </div>
  );
};

export default RegisterPage;
