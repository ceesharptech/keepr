import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Camera } from "lucide-react";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

export default function OTPValidation() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const email = sessionStorage.getItem("userEmail") || "no-mail";

  useEffect(() => {
    if (!email || email === "no-mail") {
      // If no email is found, redirect to the signup page
      navigate("/signup");
      return;
    }
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [email, navigate]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = otp.join("");
    setIsLoading(true);
    setError(null);
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: verificationCode,
      });
      console.log("Account verified successfully");
      sessionStorage.removeItem("userEmail");
      navigate("/login");
      // Redirect user to login page or home page
    } catch (err) {
      setError("Invalid code, please try again.");
      console.error("Verification error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await resendSignUpCode({ username: email });
      console.log("OTP resent successfully");
    } catch (err) {
      console.error("Resend error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Camera className="h-8 w-8 text-blue-500 mr-2" />
            <CardTitle className="text-2xl font-bold text-center text-blue-600">
              Keepr
            </CardTitle>
          </div>
          <CardDescription className="text-center">
            Enter the 6-digit code sent to your email
            <br />
            <span className="font-semibold">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center space-x-2">
            {otp.map((data, index) => (
              <Input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <Button
            onClick={handleVerify}
            disabled={isLoading}
            className={`w-full ${
              isLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            } transition-colors duration-300`}
          >
            {isLoading ? "Verifying..." : "Verify Account"}
          </Button>
          <div className="text-center">
            <button
              onClick={handleResend}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Resending..." : "Resend OTP"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
