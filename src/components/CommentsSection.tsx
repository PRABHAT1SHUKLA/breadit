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
    
}