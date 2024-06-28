"use client";
import logo from "../../../../public/logo.svg";

import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FormField, PasswordField, SocialSign, SubmitButton } from "@/components/ui";

function SignIn() {
  return (
    <div className="flex flex-col sm:flex-row h-screen bg-black">
      <div className="w-full sm:w-1/3 bg-black text-white p-8 flex flex-col justify-center sm:justify-center items-center sm:items-center">
        <div className="mb-8 text-center sm:text-left">
          <Image
            src={logo}
            alt="Luxtix Logo"
            className="mb-4 mx-auto sm:mx-0 size-24"
          />
          <h1 className="text-3xl font-bold">Discover tailored events.</h1>
          <p className="text-xl mt-2">
            <span className="text-luxtix-6 font-bold">Sign in</span> for
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
            Login
          </h2>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6 text-sm">
            <a className="btn-anim">
              <SocialSign provider={<FcGoogle />} text="Sign in with Google" />
            </a>
            <a className="btn-anim">
              <SocialSign
                provider={<BsFacebook />}
                text="Sign in with Facebook"
              />
            </a>
          </div>

          <div className="flex items-center mb-6">
            <hr className="flex-1 border-luxtix-7" />
            <span className="px-4 text-zinc-400">OR</span>
            <hr className="flex-1 border-luxtix-7" />
          </div>

          <form>
            <FormField
              label="E-mail Address"
              type="email"
              placeholder="Enter your e-mail"
            />
            <PasswordField />
            <div className="text-right mb-6">
              <Link href="/forgot-password" className="text-luxtix-8 font-bold">
                Forgot Password?
              </Link>
            </div>
            <SubmitButton text="Login" />
          </form>
          <p className="mt-4 text-center text-luxtix-7">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-luxtix-8 font-bold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
