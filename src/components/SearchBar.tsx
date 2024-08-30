'use client'

import { useOnClickOutside } from "@/hooks/use-on-click-outside"
import { Prisma, Subreddit } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import debounce from "lodash.debounce"
import { usePathname } from "next/navigation"
import { useRouter } from "next/router"
import { FC, useCallback, useEffect, useRef, useState } from "react"

interface SearchBarProps{}

const SearchBar: FC<SearchBarProps> = ({}) => {
    const [input , setInput] = useState<string>('')

    const pathname = usePathname()

    const commandRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useOnClickOutside(commandRef , ()=>{
        setInput('')
    })

    const request = debounce(async() =>{
        refetch()
    },300)

    const debounceRequest = useCallback(()=>{
        request()
    },[])

   const {
    isFetching,
    data: queryResults,
    refetch,
    isFetched,
   } = useQuery({
    queryFn: async() =>{
        if (!input) return []
        const {data} = await axios.get(`/api/search?q=${input}`)

        return data as (Subreddit & {
            _count: Prisma.SubredditCountOutputType
        })[]
    },
    queryKey: ['search-query'],
    enabled: false,
   })

   useEffect(() => {
    setInput('')
  }, [pathname])

}