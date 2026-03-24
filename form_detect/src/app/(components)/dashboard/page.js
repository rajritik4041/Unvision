import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Dashboard() {

  const cookieStore = await cookies();

  const jwtToken = cookieStore.get("token")?.value;
  const jwtUser = verifyToken(jwtToken);

  const session = await getServerSession(authOptions);

  const user = jwtUser || session?.user;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user?.email}</p>
    </div>
  );
}