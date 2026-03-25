import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import MicrosoftProvider from "next-auth/providers/azure-ad";
import AppleProvider from "next-auth/providers/apple";
import connectDB from "@/lib/mongodb";
// import connectDB from "@/config/mongodb";
import User from "@/models/user";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    MicrosoftProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      tenantId: "common"
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();

      try {
        let email = profile?.email || user?.email;
        if (!email) {
          email = `${profile?.id || Date.now()}@${account.provider}.com`;
        }
        let existingUser = null;

        //  GOOGLE
        if (account.provider === "google") {
          existingUser = await User.findOne({ googleId: profile.sub });
        }
        //  GITHUB
        if (account.provider === "github") {
          existingUser = await User.findOne({
            githubId: profile.id?.toString(),
          });
        }
        //  MICROSOFT
        if (account.provider === "azure-ad") {
          existingUser = await User.findOne({
            microsoftId: profile.sub,
          });
        }
        //  fallback by email
        if (!existingUser && email) {
          existingUser = await User.findOne({ email });
        }

        if (!existingUser) {
          let username;
          let isUnique = false;

          while (!isUnique) {
            username =
              email.split("@")[0] + Math.floor(Math.random() * 10000);

            const exists = await User.findOne({ username });
            if (!exists) isUnique = true;
          }

          existingUser = await User.create({
            first_name:
              profile?.given_name ||
              profile?.name?.split(" ")[0] ||
              "User",

            last_name:
              profile?.family_name ||
              profile?.name?.split(" ")[1] ||
              "",

            email,
            username,

            googleId:
              account.provider === "google" ? profile.sub : null,

            githubId:
              account.provider === "github"
                ? profile.id?.toString()
                : null,

            microsoftId:
              account.provider === "azure-ad"
                ? profile.sub
                : null,

          

            provider: account.provider,

            profilePic:
              profile?.picture ||
              profile?.avatar_url ||
              "",

            isProfileComplete: false,
          });
        } else {
     
          let isUpdated = false;
          if (
            account.provider === "google" &&
            !existingUser.googleId
          ) {
            existingUser.googleId = profile.sub;
            isUpdated = true;
          }

          if (
            account.provider === "github" &&
            !existingUser.githubId
          ) {
            existingUser.githubId = profile.id?.toString();
            isUpdated = true;
          }

          if (
            account.provider === "azure-ad" &&
            !existingUser.microsoftId
          ) {
            existingUser.microsoftId = profile.sub;
            isUpdated = true;
          }

          if (!existingUser.profilePic) {
            existingUser.profilePic =
              profile?.picture || profile?.avatar_url || "";
            isUpdated = true;
          }

          if (isUpdated) {
            await existingUser.save();
          }
        }

        return true;
      } catch (error) {
        console.log("SignIn Error:", error);
        return false;
      }
    },

    async redirect({ baseUrl }) {
      return baseUrl + "/profile/home";
    },

    async jwt({ token }) {
      await connectDB();
      const user = await User.findOne({ email: token.email });
      if (user) {
        token.id = user._id.toString();
        token.isProfileComplete = user.isProfileComplete;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.isProfileComplete = token.isProfileComplete;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };