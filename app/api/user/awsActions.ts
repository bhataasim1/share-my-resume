"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function getSignedURL(filename: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { error: "You are Not authorized to access this." };
    }

    const s3 = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
      },
    });

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: filename,
    });

    const signedUrl = await getSignedUrl(s3, putObjectCommand, {
      expiresIn: 60, // 60 seconds
    });

    return { message: "Signed URL Generated", url: signedUrl };
  } catch (error) {
    return error;
  }
}
