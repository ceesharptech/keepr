import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <nav className="flex flex-wrap justify-center md:justify-start gap-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-blue-400 text-lg transition duration-300">
              About
            </a>
            <a href="#" className="hover:text-blue-400 text-lg transition duration-300">
              Features
            </a>
          </nav>
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/in/eniolamusu/"
              className="hover:text-lime-400 hover:rotate-12 transition duration-300"
            >
              <FaLinkedin className="w-8 h-8" />
            </a>
            <a
              href="https://www.instagram.com/emmanuel.dev/"
              className="hover:text-lime-400 hover:rotate-12 transition duration-300"
            >
              <FaInstagram className="w-8 h-8" />
            </a>
            <a
              href="https://github.com/ceesharptech/"
              className="hover:text-lime-400 hover:rotate-12 transition duration-300"
            >
              <FaGithub className="w-8 h-8" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-md text-gray-400">
          © {new Date().getFullYear()} Keepr. All rights reserved. Built with ❤
          by CeeSharp Tech
        </div>
      </div>
    </footer>
  );
}
