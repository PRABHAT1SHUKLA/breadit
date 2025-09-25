"use client"

import { User } from "next-auth";
import { FC } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/DropdownMenu";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { LogOut, Rss, Settings, Users } from "lucide-react";
import { signOut } from "next-auth/react";

interface UserAccountNavProps {
  user: Pick<User, "name" | "image" | "email">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      {/* This is the Icon */}
      <DropdownMenuTrigger>
        <UserAvatar
          className="h-8 w-8"
          user={user}
        />
      </DropdownMenuTrigger>

      {/* Dropdown Menu Content */}
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.name && <p className="w-[200px] truncate text-sm text-zinc-700">{user.email}</p>}
          </div>
        </div>
        <DropdownMenuSeparator />

        {/* Dropdown Menu Items */}
        <DropdownMenuItem>
          <Rss className="mr-2 h-4 w-4" />
          <Link href="/">Feed</Link>
        </DropdownMenuItem>

        <DropdownMenuItem >
          <Users className="mr-2 h-4 w-4"  />
          <Link href="/r/create">Create Community</Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout Button  */}
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`
            })
          }}
          className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
