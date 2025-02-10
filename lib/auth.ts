import { createAuth } from "next-firebase-auth-edge";
// import { cert } from "firebase-admin/app";

export const auth = createAuth({
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  serviceAccount: {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  },
  cookieSecret: process.env.COOKIE_SECRET!,
});
