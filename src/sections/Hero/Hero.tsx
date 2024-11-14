import { ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";
import NavLink from "./NavLink";
import TypedText from "./TypedText";
import { motion } from "framer-motion";
import DirLink from "./DirLink";
import { Link } from "react-router-dom";

export default function Hero({ isAuthenticated }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className="relative flex flex-col items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1713942590390-8b6b45e374b1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-85"></div>

      {/* Navigation */}
      <nav className="relative z-50 w-full flex justify-between items-center px-4 py-4 mt-5 md:px-8 lg:px-12">
        <div
          className={`flex items-center transition-colors duration-300 ${
            isMenuOpen ? "text-gray-800" : "text-white"
          }`}
        >
          <span className="text-4xl font-knewave">Keepr</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink onClick={() => scrollToSection("about")}>About</NavLink>
          <NavLink onClick={() => scrollToSection("features")}>
            Features
          </NavLink>
          {isAuthenticated !== false && (
            <DirLink to="/dashboard">MyCapsule</DirLink>
          )}
          {isAuthenticated === false && (
            <>
              <DirLink to="/login">Login</DirLink>
              <DirLink to="/signup" isButton>
                Sign Up
              </DirLink>
            </>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className={`md:hidden focus:outline-none z-50 transition-colors duration-300 ease-in-out ${
            isMenuOpen ? "fixed top-4 right-4" : "relative"
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-800 mt-7" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
        <div
          className={`absolute top-0 left-0 right-0 bg-white bg-opacity-90 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex flex-col items-center py-16 px-6 space-y-4 mt-12">
            <NavLink mobile onClick={() => scrollToSection("about")}>
              About
            </NavLink>
            <NavLink mobile onClick={() => scrollToSection("features")}>
              Features
            </NavLink>
            {isAuthenticated !== false && (
              <DirLink to="/dashboard" mobile>MyCapsule</DirLink>
            )}
            {isAuthenticated === false && (
              <>
                <DirLink to="/login" mobile>
                  Login
                </DirLink>
                <DirLink to="/signup" mobile isButton>
                  Sign Up
                </DirLink>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-[50px] md:leading-none">
          <motion.span
            initial={{ opacity: 0, y: -60 }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: { delay: 0.2, duration: 0.5 },
            }}
            viewport={{ once: false, amount: 0.5 }}
            className="relative inline-block"
          >
            <span className="relative z-10">Capture,</span>
            <span className="absolute -bottom-2 left-0 w-4/5 h-2 bg-lime-300 transform -rotate-3 z-0 rounded-full"></span>
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, y: -60 }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: { delay: 0.4, duration: 0.5 },
            }}
            viewport={{ once: false, amount: 0.5 }}
            className="relative inline-block"
          >
            <span className="relative z-10">Store,</span>
            <span className="absolute -bottom-2 left-0 w-4/5 h-2 bg-lime-300 transform -rotate-3 z-0 rounded-full"></span>
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, y: -60 }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: { delay: 0.6, duration: 0.5 },
            }}
            viewport={{ once: false, amount: 0.5 }}
            className="relative inline-block"
          >
            <span className="relative z-10">Remember</span>
            <span className="absolute -bottom-2 left-0 w-4/5 h-2 bg-lime-300 transform -rotate-3 z-0 rounded-full"></span>
          </motion.span>
        </h1>
        <TypedText className="text-xl md:text-2xl mb-8" />
        <Link
          to={isAuthenticated ? "/dashboard" : "/signup"}
          className="flex gap-1 items-center bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 text-xl rounded-full font-bold focus:ring ring-black ring-opacity-10 gradient element-to-rotate transform hover:scale-105 transition duration-300 ease-in-out"
        >
            {isAuthenticated ? "My Capsule" : "Get Started"}
          <ChevronRight className="animate-pointy" />
        </Link>
      </div>
    </header>
  );
}
