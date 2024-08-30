'use client'

import { User } from "@prisma/client"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement>{
    user : Pick<User , 'id'|'username'>
}