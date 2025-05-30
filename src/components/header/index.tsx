"use client";

import Link from "next/link";
import { Container } from "../container";
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const { status, data } = useSession();

  const handleLogin = async () => {
    await signIn();
  };

  const handleLogout = async () => {
    await signOut();
  };
  return (
    <Container as="header" tailwindClass="flex justify-between items-center py-4 bg-white h-20">
      <div>
        <Link href="/">
          <h1 className="text-xl text-black md:text-2xl font-bold hover:tracking-widest transition-all duration-300">
            <span className="text-blue-500">DEV</span> CONTROLE
          </h1>
        </Link>
      </div>

      { status === "loading" && (
        <button className="text-xl md:text-2xl animate-spin">
          <FiLoader />
        </button>
      )}

      { status === "unauthenticated" && (
        <button 
          className="text-xl md:text-2xl cursor-pointer text-[#4b5563] transition-all duration-300 hover:text-blue-500" 
          onClick={ handleLogin }
        >
          <FiLock />
        </button>
      )}

      { status === "authenticated" && (
        <div className="flex items-center gap-4">
          { data?.user?.image && (
            <Link href="/dashboard">
              <img 
                src={ data.user.image } 
                alt="Avatar do usuário" 
                className="w-8 md:w-10 h-8 md:h-10 rounded-full border-2 border-black cursor-pointer transition-all duration-300 hover:border-blue-500" 
                title={ `${ data.user.name }` }
              />
            </Link>
          ) }
          <button 
            className="text-2xl md:text-3xl cursor-pointer text-[#4b5563] transition-all duration-300 hover:text-blue-500" 
            onClick={ handleLogout }
          >
            <FiLogOut />
          </button>
        </div>
      )}
    </Container>
  )
}