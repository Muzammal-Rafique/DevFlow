import React from "react";
import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Question | Dev Overflow",
};
const Page = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  // console.log(mongoUser)

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default Page;
