"use client"

import { useCustomToasts } from "@/hooks/use-custom-toast"
import { CommentRequest } from "@/lib/validators/comment"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

import { useRouter } from "next/router"
import { FC, useState } from "react"


interface CreateCommentProps {
    postId : string
    replyToId?: string
}

const CreateComment: FC<CreateCommentProps>=({
  postId, replyToId
}) =>{
    const [input , setInput] = useState<string>('')
    const router = useRouter()
    const {loginToast} = useCustomToasts()

    const {mutate : comment , isLoading} = useMutation({
        mutationFn: async ({ postId , text , replyToId}: CommentRequest)  =>{
            const payload : CommentRequest ={
                postId ,
                text ,
                replyToId
            }

            const {data} = await axios.patch(`/api/subreddit/post/comment/`,payload)
            
            return data
        },
        
        onError: (err) => {
            if (err instanceof AxiosError) {
              if (err.response?.status === 401) {
                return loginToast()
              }
            }
      
            return toast({
              title: 'Something went wrong.',
              description: "Comment wasn't created successfully. Please try again.",
              variant: 'destructive',
            })
          },
          onSuccess: () => {
            router.refresh()
            setInput('')
          },

    })

}