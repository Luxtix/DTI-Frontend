"use client";

import logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const result = await response.json();
      toast({
        title: "Login Successful",
        description: "You have been successfully logged in.",
      });

      {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
            <Button variant="outline" className="flex-1">
              <FcGoogle className="mr-2" /> Sign in with Google
            </Button>
            <Button variant="outline" className="flex-1">
              <BsFacebook className="mr-2" /> Sign in with Facebook
            </Button>
          </div>

          <div className="flex items-center mb-6">
            <hr className="flex-1 border-luxtix-7" />
            <span className="px-4 text-zinc-400">OR</span>
            <hr className="flex-1 border-luxtix-7" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <FaEyeSlash className="h-4 w-4" />
                          ) : (
                            <FaEye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-luxtix-8 font-bold"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-luxtix-6 text-luxtix-1 hover:bg-luxtix-2"
              >
                Login
              </Button>
            </form>
          </Form>

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
