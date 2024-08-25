import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { Comment, CommentVote, User } from '@prisma/client'
import CreateComment from './CreateComment'
import PostComment from './comments/PostComment'

type ExtendedComment = Comment & {
  votes: CommentVote[]
  author: User
  replies: ReplyComment[]
}

type ReplyComment = Comment & {
  votes: CommentVote[]
  author: User
}

interface CommentsSectionProps {
  postId: string
  comments: ExtendedComment[]
}

const CommentSection = async({postId}: CommentsSectionProps)=>{


    const session = await getAuthSession()
    
    const comments = await db.comment.findMany({
        where: {
          postId: postId,
          replyToId: null, // only fetch top-level comments
        },
        include: {
          author: true,
          votes: true,
          replies: {
            // first level replies
            include: {
              author: true,
              votes: true,
            },
          },
        },
        })

        return(
            <div className='flex flex-col gap-y-4 mt-4'>
               <hr className='w-full h-px my-6' />\
               <CreateComment postId={postId} />
               <CreateComment postId={postId} />
               
            </div>
        )

}

export default CommentsSection