import { Link } from "react-router-dom";

interface DirLinkProps {
    to: string
    children: React.ReactNode;
    isButton?: boolean;
    mobile?: boolean;
}

export default function DirLink({
    to,
    children,
    isButton = false,
    mobile = false,
  }: DirLinkProps) {
    const baseClasses = mobile ? "text-gray-800 py-2 text-lg" : "text-white";
    const buttonClasses = isButton
      ? "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      : "hover:text-blue-300";
  
    return (
      <Link 
        to={to}
        className={`${baseClasses} ${buttonClasses} text-lg transition duration-300 ease-in-out`}
      >
        {children}
      </Link>
    );
  }