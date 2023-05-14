import { type NextPage } from "next";
import Head from "next/head";

import { api } from "@/utils/api";
import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";

const Home: NextPage = () => {
  const userId = "user_2PIqfrV5PIKcL7qCcWrSzgg1z9M";
  const updateRole = api.users.updateRole.useMutation();
  const signUp = api.users.signup.useMutation();
  const currentUser = useUser();
  const discord = currentUser.user?.externalAccounts.find(
    (account) => account.provider === "discord"
  );

  return (
    <>
      <Head>
        <title>RD2L</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center gap-10   p-10">
        <Navbar />
        <span className="text-3xl font-bold uppercase tracking-widest text-white">
          TEST FUNCTIONS
        </span>
        <button
          onClick={() => {
            updateRole.mutate({ role: "ADMIN", id: userId });
          }}
          className="rounded-xl bg-[#252525] p-4 font-bold uppercase text-white"
        >
          Update user role
        </button>
        <button
          onClick={() => {
            signUp.mutate({ username: discord?.username });
          }}
          className="rounded-xl bg-[#252525] p-4 font-bold uppercase text-white"
        >
          Sign Up
        </button>
        {signUp.isSuccess && (
          <span className="font-bold uppercase text-white ">
            Sign up successfull
          </span>
        )}
        {signUp.isError && (
          <span className="font-bold uppercase text-red-500">
            {signUp.error.message}
          </span>
        )}
      </main>
    </>
  );
};

export default Home;
