import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import React from "react";
import Image from "next/image";

function Navbar() {
  const currentUser = useUser();

  const discord = currentUser.user?.externalAccounts.find(
    (account) => account.provider === "discord"
  );
  return (
    <div className="flex w-full flex-row items-center justify-between text-3xl font-bold uppercase text-white">
      <img src="/Logo.png" width={100} height={100} alt="logo" />
      <div className="flex flex-row items-center justify-end gap-4 text-xl font-bold uppercase text-white">
        <span>Signups</span>
        <span>Admin portal</span>
        <span>Stats</span>
        <span>{discord ? discord.username : null}</span>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "h-16 w-16",
                userButtonPopoverCard: "bg-red-500 ",
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="rounded-xl bg-[#252525] p-4 font-bold uppercase text-white">
              SIGN IN
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
}

export default Navbar;
