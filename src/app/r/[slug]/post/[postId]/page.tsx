import { buttonVariants } from "@/components/ui/Button"
import { db } from "@/lib/db"
import { redis } from "@/lib/redis"
import { CachedPost } from "@/types/redis"
import { Post, User, Vote } from "@prisma/client"
import { ArrowBigUp, Loader2 } from "lucide-react"
import { notFound } from "next/navigation"
import { Suspense } from "react"

interface SubRedditPostPageProps {
    params: {
        postId: string
    }
}

const SubRedditPostPage = async ({ params }:
    SubRedditPostPageProps) => {
    const cachedPost = (await redis.hgetall(
        `post:${params.postId}`
    )) as CachedPost


    let post: (Post & { votes: Vote[]; author: User }) | null = null

    if (!cachedPost) {
        post = await db.post.findFirst({
            where: {
                id: params.postId,
            },
            include: {
                votes: true,
                author: true,
            },
        })
    }

    if (!post && !cachedPost) return notFound()

    return (
        <div>
            <div className="h-full flex flex-col sm:flex-row items-center sm:items-start justify-between">
                <Suspense fallback={<PostVoteShell />}>
                </Suspense>

            </div>

        </div>
    )
}

function PostVoteShell() {
    return (
        <div className="flex items-center flex-col pr-6 w-20">
            {/* upvote */}
            <div className={buttonVariants({ variant: 'ghost' })}>

                <ArrowBigUp className='h-5 w-5 text-zinc-700' />

            </div>
            {/* 
              score  */}

            <div className="text-center py-2 font-medium text-sm text-zinc-900">
                <Loader2 className='h-3 w-3 animate-spin' />
            </div>


            {/* downvote */}
            <div className={buttonVariants({ variant: 'ghost' })}>
                <ArrowBigDown className='h-5 w-5 text-zinc-700' />
            </div>

        </div>
    )
}

export default SubRedditPostPage