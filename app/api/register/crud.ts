import { userRegisterSchema } from "@/lib/zodValidation";
import prisma from "@/prisma/schema";
import { UserRegisterType } from "@/types/types";
import { hash } from "bcryptjs";

export async function registerUser(userData: UserRegisterType) {
  const { username, name, email, password } = userData;

  const validationResult = userRegisterSchema.safeParse(userData);

  if (!validationResult.success) {
    return { error: validationResult.error.errors[0] };
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (existingUser?.email === email) {
      return { error: "User with this email already exists" };
    }

    if (existingUser?.username === username) {
      return { error: "User with this username already exists" };
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
      },
    });

    await prisma.userDetail.create({
      data: {
        userId: newUser.id,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Something went wrong" };
  }
}
