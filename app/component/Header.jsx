"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./ThemeBtn";
import Image from "next/image";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4 md:p-6">
      <div className="flex items-center space-x-4">
  <Image
    src="/favicon.webp"
    alt="Logo"
    width={40}
    height={40}
    className="rounded-full"
  />
  <span className="text-2xl font-bold font-noto-sans">VidGrab</span>
</div>


        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="hover:text-gray-400 transition duration-300 text-lg"
          >
            Home
          </Link>
          <Link
            href="/About"
            className="hover:text-gray-400 transition duration-300 text-lg"
          >
            About
          </Link>
          <Link
            href="/Howtouse"
            className="hover:text-gray-400 transition duration-300 text-lg"
          >
            How to use
          </Link>
          <Link
            href="/Contact"
            className="hover:text-gray-400 transition duration-300 text-lg"
          >
            Contact
          </Link>
          <ModeToggle />
        </nav>
        <div className="flex md:hidden items-center">
          <ModeToggle />
          <button onClick={toggleMenu} className="focus:outline-none ml-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {}
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } transition-all duration-300`}
      >
        <nav className="flex flex-col space-y-2 mt-2 p-4 rounded-md">
          <Link
            href="/"
            className="block p-2 hover:bg-gray-600 transition duration-300 text-lg"
          >
            Home
          </Link>
          <Link
            href="/About"
            className="block p-2 hover:bg-gray-600 transition duration-300 text-lg"
          >
            About
          </Link>
          <Link
            href="/Howtouse"
            className="block p-2 hover:bg-gray-600 transition duration-300 text-lg"
          >
            How to use
          </Link>
          <Link
            href="/Contact"
            className="block p-2 hover:bg-gray-600 transition duration-300 text-lg"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
