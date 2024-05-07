"use client";

import { FormCombinedInput } from "@/components/common/FormCombinedInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormSelectInput } from "@/components/common/FormSelectInput";
import { Button } from "@/components/ui/button";
import { CrudServices } from "../crud/crudServices";
import { toast } from "sonner";
import { userUpdateValidationSchema } from "../zodValidation";
import { skills } from "@/constant/skills";
import ProfileImageUploadCard from "./ProfileImageUploadCard";
import * as z from "zod";
import { UserResposneType } from "@/types/types";

type UserFormValue = z.infer<typeof userUpdateValidationSchema>;

export default function ProfileUpdateForm() {
  const [loading, setLoading] = useState(false);
  const crudServices = new CrudServices();
  const [user, setUser] = useState<UserResposneType | null>(null);

  // console.log("user resposnse", user?.UserDetail[0].bio);

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
      setUser(res);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Error fetching user profile");
    } finally {
      setLoading(false);
    }
  }

  // const defaultValues: UserFormValue = {
  //   bio: user?.UserDetail[0]?.bio ?? "",
  //   skills: user?.UserDetail[0]?.skills ?? [],
  // };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(userUpdateValidationSchema),
    // defaultValues,
  });

  const onSubmit = async (values: UserFormValue) => {
    setLoading(true);
    try {
      const response = await crudServices.updateUserDetails(values);
      if (response.error) {
        console.error(response.error);
      } else {
        toast.success("Details Updated successfully");
        // console.log(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center p-6">
      <ProfileImageUploadCard />
      <div className="max-w-lg w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <FormCombinedInput
                      {...field}
                      type="text"
                      rows={4}
                      placeholder="tell us about yourself"
                      disabled={loading}
                      //@ts-ignore
                      defaultValue={user?.UserDetail[0].bio || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <FormSelectInput
                      {...field}
                      options={skills}
                      placeholder="Select your skills"
                      multiple={true}
                      searchable={true}
                      //@ts-ignore
                      value={user?.UserDetail[0].skills || []}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} className="w-full" type="submit">
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
