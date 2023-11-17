import {getServerSession} from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Link } from "@mui/material";
export default async function Signin() {
  const session = await getServerSession(authOptions)
  return <div>
    {
                session? <Link href="/api/auth/signout"> 
                <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                    Sign-Out of {session.user?.name}</div> </Link>
                : <Link href="/api/auth/signin">
                    <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                Sign-In</div></Link>
    }
    </div>;

}