"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import myImage from "@/public/undraw_male_avatar_g98d.svg";
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
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { CrudServices } from "../crud/crudServices";
import { toast } from "sonner";

type UserFormValue = z.infer<typeof userUpdateImageValidationSchema>;

const ProfileImageUploadCard = () => {
  const crudServices = new CrudServices();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<String>();

  const form = useForm<UserFormValue>({
    resolver: zodResolver(userUpdateImageValidationSchema),
    defaultValues: {
      avatar: "",
    },
  });

  useEffect(() => {
    fetchUserProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchUserProfile() {
    setLoading(true);
    try {
      const res = await crudServices.getUserProfile();
      if (!res) {
        toast.error("Try Refreshing Again");
      }
      setImage(res.UserDetail[0].avatar);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Error fetching user profile");
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      const response = await crudServices.updateUserAvatar(formData);
      if (response?.error) {
        console.error(response.error);
        toast.error("Error updating image");
      } else {
        // console.log(response);
        toast.success("Image Uploaded Successfully");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent>
        <div className="grid gap-2 mt-2">
          <Image
            alt={session?.user?.name || "User Profile Image"}
            className="aspect-square w-full rounded-md object-cover"
            src={image || myImage}
            height={200}
            width={200}
            priority
          />
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
                {loading ? (
                  <Button className="w-full" disabled>
                    Loading...
                  </Button>
                ) : (
                  <Button className="w-full" type="submit">
                    Upload Avatar
                  </Button>
                )}
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileImageUploadCard;
