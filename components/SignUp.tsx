"use client";
import logo from "../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PasswordField, FormField, SubmitButton, SocialSign } from "./ui";
import { FaUser, FaUserTie } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

function SignUp() {
  const [registrationType, setRegistrationType] = useState<
    "user" | "organizer"
  >("user");

  const handleTypeChange = (type: "user" | "organizer") => {
    setRegistrationType(type);
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-black">
      <div className="w-full sm:w-1/3 bg-black text-white p-8 flex flex-col justify-center sm:justify-start items-center sm:items-start">
        <div className="mb-8 text-center sm:text-left">
          <Image
            src={logo}
            alt="Luxtix Logo"
            className="mb-4 mx-auto sm:mx-0 size-24"
          />
          <h1 className="text-3xl font-bold">Discover tailored events.</h1>
          <p className="text-xl mt-2">
            <span className="text-luxtix-6 font-bold">Sign up</span> for
            personalized recommendations today!
          </p>
        </div>
      </div>
      <div className="w-full bg-white p-10 sm:p-24 flex flex-col justify-center sm:rounded-l-3xl">
        <div className="">
          <div className="hidden sm:flex justify-end mb-4">
            <Link href="/" className="btn-anim text-luxtix-8 font-bold">
              <AiOutlineArrowLeft size={25} />
            </Link>
          </div>
          <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">
            Create Account
          </h2>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6 text-sm">
            <a className="btn-anim">
              <SocialSign provider={<FcGoogle />} text="Sign up with Google" />
            </a>
            <a className="btn-anim">
              <SocialSign
                provider={<BsFacebook />}
                text="Sign up with Facebook"
              />
            </a>
          </div>

          <div className="flex items-center mb-6">
            <hr className="flex-1 border-luxtix-7" />
            <span className="px-4 text-zinc-400">OR</span>
            <hr className="flex-1 border-luxtix-7" />
          </div>

          <div className="mb-6">
            <label className="block text-luxtix-1 mb-2">Register As:</label>
            <div className="flex space-x-4">
              <div
                onClick={() => handleTypeChange("user")}
                className={`flex-1 p-4 border-2 rounded-lg cursor-pointer flex flex-col items-center ${
                  registrationType === "user"
                    ? "border-luxtix-5"
                    : "border-luxtix-7"
                }`}
              >
                <FaUser size={30} className="mb-2" />
                <span className="text-luxtix-1">User</span>
              </div>
              <div
                onClick={() => handleTypeChange("organizer")}
                className={`flex-1 p-4 border-2 rounded-lg cursor-pointer flex flex-col items-center ${
                  registrationType === "organizer"
                    ? "border-luxtix-5"
                    : "border-luxtix-7"
                }`}
              >
                <FaUserTie size={30} className="mb-2" />
                <span className="text-luxtix-1">Organizer</span>
              </div>
            </div>
          </div>

          <form>
            <FormField
              label={
                registrationType === "user" ? "Username" : "Company Username"
              }
              type="text"
              placeholder={
                registrationType === "user"
                  ? "Enter your username"
                  : "Enter your company username"
              }
            />
            <FormField
              label={
                registrationType === "user"
                  ? "E-mail Address"
                  : "Company E-mail Address"
              }
              type="email"
              placeholder={
                registrationType === "user"
                  ? "Enter your e-mail"
                  : "Enter your company e-mail"
              }
            />
            <PasswordField />
            {registrationType === "user" ? (
              <FormField
                label="Referral (Optional)"
                type="text"
                placeholder="Enter referral"
              />
            ) : null}
            <SubmitButton text="Create Account" />
          </form>
          <p className="mt-4 text-center text-luxtix-7">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-luxtix-8 font-bold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
