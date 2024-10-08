import CustomFeed from '@/components/homepage/CustomFeed'
import GeneralFeed from '@/components/homepage/GeneralFeed'
import { HomeIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { getAuthSession } from '@/lib/auth';

export default async function Home() {
  const session = await getAuthSession()
  return (
    <>
      <h1 className="font-bold text-3xl text-center md:text-4xl justify-between flex flex-col space-y-6 space-x-10"> Your feed </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-10">
         
         {session ? <CustomFeed /> : <GeneralFeed />}
        
          {/* subreddit info */}

          <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
            <div className='bg-emerald-100 px-6 py-4'>
              <p className='font-semibold py-3 flex items-center gap-2.5'>
                <HomeIcon className='h-7 w-7' />
                Home
              </p>
            </div>

            <div className='-my-3 divide-y divide-red-100 px-6 py-4 text-sm leading-6'>
            <div className='flex justify-between gap-x-4 py-3'>
              <p className='text-zinc-500'>
                Your personal Breadit frontpage. Come here to check in with your
                favorite communities.
              </p>
              
            </div>

            <Link
              className={buttonVariants({
                className: 'w-full gap-x-2 mt-4 mb-6',
              })}
              href={`/r/create`}>
              <PlusIcon className="w-4 h-4"/>  
              Create Community
            </Link>

           

            </div>


          </div>
        </div>
    
    </>
  )
}
