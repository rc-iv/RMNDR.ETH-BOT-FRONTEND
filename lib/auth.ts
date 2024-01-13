import { NextAuthOptions } from "next-auth";
import { Session } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { JWT } from "next-auth/jwt";


export interface Guild {
  id: string;
  name: string;
  isOwner: boolean;
  permissions: number;
}

export interface ExtendedUser {
  id?: string;
  guilds?: Guild[];
}

export const authConfig: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify guilds email",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      //console.log("jwt", token, account);
      if (account?.access_token) {
        const res = await fetch("https://discord.com/api/users/@me/guilds", {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          },
        });
        const guilds = await res.json();
        (token.guilds as Guild[]) = [];        
        for (const guild of guilds) {
          const id = guild.id;
          const name = guild.name;
          const isOwner = guild.owner;
          const permissions = guild.permissions;
          (token.guilds as Guild[]).push({
            id,
            name,
            isOwner,
            permissions,
          });
        }
        // console.log("guilds", token.guilds);
      }
      return token;
    },
    async session({ session, token }) {
      const customSession = session as Session & { user: ExtendedUser };
      customSession.user.id = token.sub as string;
      customSession.user.guilds = token.guilds as Guild[];
      return customSession;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
