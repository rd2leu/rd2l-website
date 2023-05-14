import React from "react";
import { SignIn } from "@clerk/nextjs";

function SignInComponent() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}

export default SignInComponent;
