import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signIn } from "aws-amplify/auth";
import { useState } from "react";

// Define validation schema for email format
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

type LoginPageProps = {
  updateAuthStatus: (authStatus: boolean) => void;
};

export default function LoginPage({ updateAuthStatus }: LoginPageProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      const user = await signIn({
        username: values.email,
        password: values.password,
      });
      console.log("Login successful:", user);
      updateAuthStatus(true);
      navigate("/dashboard"); // Redirect to a dashboard or homepage after login
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      type="login"
      bgImageUrl="https://img.freepik.com/free-photo/high-angle-couple-taking-selfie_23-2150329557.jpg?t=st=1731009593~exp=1731013193~hmac=f67cb16806440cc22727f9d35c94a7a2283ee66dceb77b52921e0f1c80053add&w=1920"
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <Form className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
              <p className="text-sm text-gray-500">
                Enter your email to sign in to your account
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-600 text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-600 text-xs"
                />
              </div>
              {error && <p className="text-red-600 text-xs">{error}</p>}
              <Button
                type="submit"
                className="w-full text-white"
                disabled={loading || !isValid}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline">
                  Sign up
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
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
