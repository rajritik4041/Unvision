import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/mongodb";
import User from "@/models/user";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],

  session: {
    strategy: "jwt"
  },

  callbacks: {

    // 🔹 Signup + Login
    async signIn({ profile }) {
      await connectDB();

      const email = profile.email;

      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          first_name: profile.given_name,
          last_name: profile.family_name,
          email,
          googleId: profile.sub,
          profilePic: profile.picture,
          isProfileComplete: false
        });
      } else {
        if (!user.googleId) {
          user.googleId = profile.sub;
          user.profilePic = profile.picture;
          await user.save();
        }
      }

      return true;
    },
  //   async jwt({ token }) {
  //     await connectDB();
  //     const user = await User.findOne({ email: token.email });
  //     if (user) {
  //       token.id = user._id.toString();
  //       token.isProfileComplete = user.isProfileComplete;
  //     }
  //     return token;
  //   },

  //   async session({ session, token }) {
  //     session.user.id = token.id;
  //     session.user.isProfileComplete = token.isProfileComplete;
  //     return session;
  //   }
  // },
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
    }
  },

  pages: {
    signIn: "/login"
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };