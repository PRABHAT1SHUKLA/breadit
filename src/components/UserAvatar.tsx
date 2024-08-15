import { User } from "@prisma/client";
import { AvatarFallback, AvatarFallbackProps } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import { Icons } from "./icons";

interface UserAvatarProps extends AvatarFallbackProps {
    user: Pick<User, 'image' | 'name'>
}

export function UserAvatar({ user, ...props }:
    UserAvatarProps
) {
    return (
        <Avatar {...props}>
            {user.image ? (
                <div className="relative aspect-square h-full w-full">
                    <Image
                        fill
                        src={user.image}
                        alt='profile picture'
                        referrerPolicy='no-referrer' />
                </div>
            ) : (
                <AvatarFallback>
                    <span className="sr-only">
                        {user?.name}
                    </span>
                    <Icons.user className='h-4 w-4' />
                </AvatarFallback>
            )}
        </Avatar>
    )
}