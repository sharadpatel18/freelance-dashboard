import { prisma } from '@/lib/prisma'

export const syncClerkUser = async (clerkUser: {
  id: string
  email: string
  name?: string
}) => {
  const existing = await prisma.user.findUnique({
    where: { id: clerkUser.id },
  })

  if (!existing) {
    await prisma.user.create({
      data: {
        id: clerkUser.id,
        email: clerkUser.email,
        name: clerkUser.name || '',
      },
    })
  }
  return true
}


export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({})
    return users
  } catch (error) {
    console.log("Error getting all users:", error)
    throw new Error("something wrong when try to get all users.")
  }
}

export const getUserById = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    return user
  } catch (error) {
    console.log("Error getting user using id:", error)
    throw new Error("something wrong when try to get user using id.")
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    return user
  } catch (error) {
    console.log("Error getting user using email:", error)
    throw new Error("something wrong when try to get user using email.")
  }
}

export const deleteUserById = async (userId: string) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (error) {
    console.log("Error deleting user using ID:", error);
    throw new Error("Something went wrong when trying to delete user using ID.");
  }
}

export const updateUserById = async (userId: string, user: any) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: user,
    });
    return updatedUser;
  } catch (error) {
    console.log("Error updating user using ID:", error);
    throw new Error("Something went wrong when trying to update user using ID.");
  }
}

