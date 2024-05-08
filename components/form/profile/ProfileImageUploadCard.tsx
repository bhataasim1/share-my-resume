import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { userUpdateImageValidationSchema } from "../zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { CrudServices } from "../crud/crudServices";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import myImage from "@/public/undraw_male_avatar_g98d.svg";
import * as z from "zod";

type UserFormValue = z.infer<typeof userUpdateImageValidationSchema>;

const ProfileImageUploadCard = () => {
  const crudServices = new CrudServices();
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | undefined>();
  const [uploading, setUploading] = useState<boolean>(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(userUpdateImageValidationSchema),
    defaultValues: {
      avatar: "",
    },
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const res = await crudServices.getUserProfile();
      // console.log("res", res.data);
      //@ts-ignore
      if (res) {
        //@ts-ignore
        setImage(res.data.UserDetail[0].avatar);
      } else {
        toast.error("Failed to fetch user profile. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData: FormData) => {
    try {
      setUploading(true);
      const response = await crudServices.updateUserAvatar(formData);

      const image = response.data.data.avatar;
      // console.log("image", image);

      if (!image) {
        toast.error("Error updating image");
      }

      if (response.error) {
        console.error(response.error);
        toast.error("Error updating image");
      }

      setImage(image);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent>
        <div className="grid gap-2 mt-2">
          {loading ? (
            <Skeleton className="aspect-square w-full rounded-md bg-slate-400" />
          ) : (
            <Image
              alt={session?.user?.name || "User Profile Image"}
              className="aspect-square w-full rounded-md object-cover"
              src={image || myImage}
              height={200}
              width={200}
              priority
            />
          )}
          <div className="grid">
            <Form {...form}>
              <form action={onSubmit} className="flex">
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="file"
                          className="w-full"
                          placeholder="Choose Avatar"
                          accept="image/*"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="col-span-1"
                  type="submit"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload Avatar"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileImageUploadCard;
