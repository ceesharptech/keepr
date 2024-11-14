import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa";
import AuthLayout from "./AuthLayout";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { signUp } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Validation schema
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});

interface PasswordInputProps {
  placeholder: string;
  id: string;
  name: string;
}

function PasswordInput({ placeholder, id, name }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Field
        as={Input}
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>
    </div>
  );
}

export default function SignUpPage() {
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (values: { username: string; email: string; password: string }) => {
    setLoading(true);
    try {
      await signUp({
        username: values.email,
        password: values.password,
        options: {
          userAttributes: {
            preferred_username: values.username,
          },
        },
      });
      setIsSignUpSuccessful(true);
      setSignUpError(null);
      // Store the email in sessionStorage
      sessionStorage.setItem("userEmail", values.email);
    } catch (error: any) {
      setSignUpError(error.message);
    } finally {
      setLoading(false);
      navigate("/validate");
    }
  };

  return (
    <AuthLayout
      type="signup"
      bgImageUrl="https://img.freepik.com/free-photo/side-view-smiley-friends-taking-selfie_23-2149737083.jpg?t=st=1731009537~exp=1731013137~hmac=668d92e915fb2db553753a6161dfeb3966032b92f4169058daf8b91c81edde74&w=1920"
    >
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSignUp(values)}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Create an account
              </h1>
              <p className="text-sm text-gray-500">
                Enter your email below to create your account
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">
                    Username {" (This will be your display name)"}
                  </Label>
                  <Field
                    as={Input}
                    id="username"
                    name="username"
                    placeholder="John Doe"
                  />
                  {errors.username && touched.username && (
                    <p className="text-red-500 text-xs">{errors.username}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <PasswordInput
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-xs">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <PasswordInput
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-500 text-xs">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {signUpError && (
                <p className="text-red-500 text-sm">{signUpError}</p>
              )}
              {isSignUpSuccessful && (
                <p className="text-green-500 text-sm">
                  Sign up successful! Please check your email to confirm.
                </p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing up..." : "Sign up with Email"}
              </Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                  Login
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={() => {}}>
                <FaGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
              <p className="text-center text-sm text-gray-500">
                By clicking continue, you agree to our{" "}
                <a
                  href="#"
                  className="underline underline-offset-4 hover:text-blue-600"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="underline underline-offset-4 hover:text-blue-600"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
