import { NextAuthOptions } from "next-auth";

import DiscordProvider from "next-auth/providers/discord";



interface Guild {
  guildId: string;
  guildName: string;
  isOwner: boolean;
  permissions: number;
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
          const guildId = guild.id;
          const guildName = guild.name;
          const isOwner = guild.owner;
          const permissions = guild.permissions;
          (token.guilds as Guild[]).push({
            guildId,
            guildName,
            isOwner,
            permissions,
          });
        }
        // console.log("guilds", token.guilds);
      }
      return token;
    },
    async session({ session, token }) {
      session.user!.id = token.sub; // Discord's OAuth2 spec uses 'sub' for the ID
      session.user!.guilds = token.guilds;
      return session;
    },
  },
};
