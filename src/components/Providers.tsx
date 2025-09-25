"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

const Providers = ({ children, session }: {children: React.ReactNode, session: Session | null }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>  
    </QueryClientProvider>
  )
}

export default Providers