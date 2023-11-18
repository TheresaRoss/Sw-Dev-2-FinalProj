import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  //console.log("sesssion", session);

  return (
    <div className="text-[40px] flex items-center justify-center">
      Hello {session ? session.user.name : null}
    </div>
  );
}
