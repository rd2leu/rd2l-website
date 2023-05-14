import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { clerkClient } from "@clerk/clerk-sdk-node";

const userRole = ["ADMIN", "USER"] as const;

interface metadata {
  role: string;
}

export const userRouter = createTRPCRouter({
  updateRole: publicProcedure
    .input(
      z.object({
        role: z.enum(userRole),
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { role } = ctx.auth.sessionClaims?.metadata as metadata;
      if (role === "ADMIN") {
        await clerkClient.users.updateUser(input.id, {
          publicMetadata: {
            role: input.role,
          },
        });
      }
      return {
        status: ctx.auth,
      };
    }),
  signup: publicProcedure
    .input(
      z.object({
        username: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const id = ctx.auth.sessionClaims?.id as string;
      if (input.username) {
        try {
          const user = await ctx.prisma.signup.create({
            data: {
              userId: id,
              username: input.username,
            },
          });
          return {
            user,
          };
        } catch (error) {
          throw "Account already signed up";
        }
      } else {
        if (!id) {
          throw "user not signed in";
        } else {
          throw "discord not linked";
        }
      }
    }),
});
