import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Comment, CommentVote, User } from "@prisma/client";


type ExtendedComment = Comment & {
    votes : CommentVote[]
    author: User
    replies: ReplyComment[]
}
type ReplyComment = Comment & {
    votes: CommentVote[]
    author: User
}

interface CommentSectionProps {
    postId : string
    comments: ExtendedComment[]
}

const CommentsSection = async({postId}: CommentSectionProps) =>{

    const session = await getAuthSession()

    const comments = await db.comment.findMany({
        where:{
            postId:postId,
            replyToId: null,
        },
        include:{
            author: true,
            votes: true,
            replies:{
                 include:{
                    author: true,
                    votes: true,
                 },
            },
        },
    })
    

}