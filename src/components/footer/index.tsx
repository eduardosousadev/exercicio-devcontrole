import Link from "next/link";
import { Container } from "../container";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <Container 
      as="footer" 
      tailwindClass="h-10 flex flex-col justify-center items-center sm:flex-row sm:justify-between"
    >
      <p className="text-xs sm:text-base text-black">
        <strong>Eduardo Sousa</strong> &copy; { year }. Todos os direitos reservados
      </p>
      <div className="flex gap-2">
        <Link 
          href="https://github.com/eduardosousadev" target="_blank"
          className="sm:text-xl cursor-pointer text-gray-900 transition duration-300 hover:scale-110 hover:text-blue-500"
        >
          <FaGithub />
        </Link>
        <Link 
          href="https://www.linkedin.com/in/eduardosousadev/" target="_blank"
          className="sm:text-xl cursor-pointer text-gray-900 transition duration-300 hover:scale-110 hover:text-blue-500"
        >
          <FaLinkedin />
        </Link>
      </div>
    </Container>
  )
}