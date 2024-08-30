'use client'

import { useOnClickOutside } from "@/hooks/use-on-click-outside"
import { Prisma, Subreddit } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import debounce from "lodash.debounce"
import { usePathname } from "next/navigation"
import { useRouter } from "next/router"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { Command, CommandInput } from "./ui/command"

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


  return (
    <Command ref={commandRef}
    className="relative rounded-lg border max-w-lg z-50 overflow-visible">
        <CommandInput
           isLoading={isFetching}
           onValueChange={(text) => {
            setInput(text)
            debounceRequest()
           }}
           value={input}
           className="outline-none border-none focus:border-none focus:outline-none ring-0"
           placeholder="Search Communities ..."/>

    </Command>
  )
}