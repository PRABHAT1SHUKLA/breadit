import Link from "next/link"
import { Icons } from "./icons"
import { buttonVariants } from './ui/Button'
import { authOptions } from "@/lib/auth"
import UserAccountNav from "./UserAccountNav"
import { getServerSession } from "next-auth"
import SearchBar from "./SearchBar"

const Navbar = async () => {

    const session = await getServerSession(authOptions)
    return (
        <div className="fixed top-0 inset-x-0 h-fitbg-zinc-100 border-b border-zinc-300
      z-[10] py-2">
            <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
                {/* logo */}
                <Link href='/' className="flex gap-2 items-center">
                    <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
                    <p className='hidden text-zinc-700 text-sm font-medium md:block'>Breadit</p>
                </Link>

                {/* Searchbar */}
                <SearchBar/>

                {session?.user  ? (<UserAccountNav
                    user={session.user} />) : (<Link href='/sign-in' className={buttonVariants()}>
                        Sign In
                    </Link>)}

            </div>
        </div>


    )
}

export default Navbar