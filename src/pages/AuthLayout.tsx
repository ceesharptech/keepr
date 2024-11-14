import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Camera } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  type: "login" | "signup";
  bgImageUrl: string;
}

export default function AuthLayout({
  children,
  type,
  bgImageUrl,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Hidden on mobile */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col justify-between p-8 text-white">
          <div className="flex items-center gap-2">
            <Camera className="h-8 w-8" />
            <span className="text-xl font-knewave">Keepr</span>
          </div>
          <div>
            <blockquote className="text-lg md:text-xl mb-4">
              "This app has revolutionized how I store and organize my memories.
              The interface is intuitive, and the features are exactly what I
              needed."
            </blockquote>
            <cite className="text-sm text-gray-300">
              - Sarah Parker, Photographer
            </cite>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gray-50">
        <Card className="w-full max-w-md bg-white">
          <CardHeader>
            {/* Mobile logo - Only visible on mobile */}
            <div className="flex md:hidden items-center gap-2 mb-8">
              <Camera className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Keepr</span>
            </div>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
