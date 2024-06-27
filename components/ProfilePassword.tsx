"use client";
import ProfileSideMenu from "./ProfileSideMenu";
import { FormField } from "./ui";

function ProfilePassword() {
  return (
    <div className="flex min-h-screen bg-white">
      <ProfileSideMenu />
      <div className="w-3/4 p-2 sm:p-10">
        <h1 className="text-2xl font-bold mb-8">Current Password</h1>
        <form className="space-y-4">
          <div className="flex flex-col">
            <FormField
              label="Old Password"
              type="text"
              placeholder="Input your old password"
            />
          </div>
          <div className="flex flex-col">
            <FormField
              label="New Password"
              type="text"
              placeholder="Input your new password"
            />
          </div>
          <div className="flex flex-col">
            <FormField
              label="Confirm New Password"
              type="text"
              placeholder="Input your new password again"
            />
          </div>
          <div className="pt-12">
            <button
              type="submit"
              className="bg-luxtix-6 text-luxtix-1 py-2 px-4 rounded hover:bg-luxtix-2"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePassword;
