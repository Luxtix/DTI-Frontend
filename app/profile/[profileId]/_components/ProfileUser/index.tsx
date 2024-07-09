"use client";

import logo from "@/public/logo.svg";
import profileItems from "@/utils/profileItems";
import ProfileSideMenu from "../ProfileSideMenu";
import Image from "next/image";
import { AiFillCamera } from "react-icons/ai";
import { useState } from "react";

const profileReff = profileItems[1];

function Profile() {
  const [isUserProfile, setIsUserProfile] = useState(true);

  const toggleProfile = () => {
    setIsUserProfile(!isUserProfile);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <ProfileSideMenu />
      <main className="w-3/4 p-2 sm:p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">
            {isUserProfile ? "Account Information" : "Organization Information"}
          </h1>
          <button
            onClick={toggleProfile}
            className="btn-anim bg-luxtix-6 text-luxtix-1 py-2 px-4 rounded hover:bg-luxtix-2 transition duration-300"
          >
            {isUserProfile
              ? "Switch to Organizer Profile Test"
              : "Switch to User Profile Test"}
          </button>
        </div>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Profile Photo</h2>
          <div className="relative w-24 h-24 mx-auto mb-4">
            <Image
              src={logo}
              alt="Profile Photo"
              className="rounded-full w-full h-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-2">
              <AiFillCamera />
            </button>
          </div>
        </section>
        {isUserProfile ? (
          <>
            <section>
              <h2 className="text-xl font-semibold mb-4">
                Profile Information
              </h2>
              <form className="space-y-4">
                <div className="flex flex-col">
                  {/* <FormField
                    label="Full Name"
                    type="text"
                    placeholder="Input your Full Name"
                  />
                </div>
                <div className="flex flex-col">
                  <FormField
                    label="Phone Number"
                    type="text"
                    placeholder="Input your Phone Number"
                  />
                </div>
                <div className="flex flex-col">
                  <FormField
                    label="E-Mail Address"
                    type="text"
                    placeholder="Input your e-mail"
                  /> */}
                </div>
                <div className="flex flex-col">
                  <label className="block text-luxtix-8 mb-2">
                    Referral Code:
                  </label>
                  {profileReff.referralId}
                </div>
                <div className="pt-12">
                  <button
                    type="submit"
                    className="btn-anim bg-luxtix-6 text-luxtix-1 py-2 px-4 rounded hover:bg-luxtix-2 transition duration-300"
                  >
                    Save My Profile
                  </button>
                </div>
              </form>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2 className="text-xl font-semibold mb-4">
                Organization Information
              </h2>
              <form className="space-y-4">
                <div className="flex flex-col">
                  {/* <FormField
                    label="Company Name"
                    type="text"
                    placeholder="Input your company name"
                  />
                </div>
                <div className="flex flex-col">
                  <FormField
                    label="Company Phone Number"
                    type="text"
                    placeholder="Input your company phone number"
                  />
                </div>
                <div className="flex flex-col">
                  <FormField
                    label="Company E-Mail Address"
                    type="text"
                    placeholder="Input your company e-mail"
                  /> */}
                </div>
                <div className="pt-12">
                  <button
                    type="submit"
                    className="btn-anim bg-luxtix-6 text-luxtix-1 py-2 px-4 rounded hover:bg-luxtix-2 transition duration-300"
                  >
                    Save My Profile
                  </button>
                </div>
              </form>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Profile;
