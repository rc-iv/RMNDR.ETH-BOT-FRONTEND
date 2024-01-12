import { NextAuthOptions} from "next-auth";

import DiscordProvider from "next-auth/providers/discord";

export const authConfig: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "identify guilds email",
        },
      },
    }),
  ],
  // Add more configuration here if needed
};
