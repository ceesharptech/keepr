import React from "react";

interface NavLinkProps {
  href?: string;
  children: React.ReactNode;
  isButton?: boolean;
  mobile?: boolean;
  onClick?: () => void; // Make onClick optional
}

export default function NavLink({
  href,
  children,
  isButton = false,
  mobile = false,
  onClick,
}: NavLinkProps) {
  const baseClasses = mobile ? "text-gray-800 py-2 text-lg" : "text-white";
  const buttonClasses = isButton
    ? "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
    : "hover:text-blue-300";

  return (
    <a 
      href={href}
      className={`${baseClasses} ${buttonClasses} text-lg transition duration-300 ease-in-out`}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </a>
  );
}
