import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function login({username, password}: {username: string, password: string}) {
    const userWithPassword = await prisma.user.findUnique({
        where: { username },
        include: {password: true}
    })
    await prisma.$disconnect()
    if (!userWithPassword || !userWithPassword.password?.hash) {
        return null
    }
    const isValid = await bcrypt.compare(password, userWithPassword.password.hash)
    if (!isValid) {
        return null
    }
    const {password: _password, ...user} = userWithPassword
    return user
}