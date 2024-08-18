import Link from "next/link"
import { toast } from "./use-toast"
import { buttonVariants } from "@/components/ui/Button"

export const useCustomToasts = () => {
    const loginToast = () => {
        const { dismiss } = toast({
            title: "Login Required",
            description: "Please login to access this feature",
            variant: 'destructive',
            action: (
                <Link
                    onClick={() => dismiss()}
                    href='/sign-in'
                    className={buttonVariants({
                        variant: 'outline'
                    })}>
                    login
                </Link>
            ),
        })
    }

    return { loginToast }
}
