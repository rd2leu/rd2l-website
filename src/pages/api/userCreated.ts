// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { clerkClient } from "@clerk/clerk-sdk-node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const evt = req.body as WebhookEvent;
  if (evt.type === "user.created") {
    console.log(process.env.CLERK_SECRET_KEY);
    //get userlist from clerk
    const users = await clerkClient.users.updateUser(evt.data.id, {
      publicMetadata: {
        role: "USER",
      },
    });
    console.log(users);
  }
  res.status(200).json({ status: "ok" });
}
