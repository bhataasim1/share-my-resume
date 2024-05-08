"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { FormCombinedInput } from "@/components/common/FormCombinedInput";
import { FormSelectInput } from "@/components/common/FormSelectInput";
import { Button } from "@/components/ui/button";
import { CrudServices } from "../crud/crudServices";
import { userUpdateValidationSchema } from "../zodValidation";
import { skills } from "@/constant/skills";
import ProfileImageUploadCard from "./ProfileImageUploadCard";
import * as z from "zod";
// import { UserResponseType } from "@/types/types";
import { UserResposneType } from "@/types/types";

type UserFormValue = z.infer<typeof userUpdateValidationSchema>;

const ProfileUpdateForm = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserResposneType | null>(null);
  const form = useForm<UserFormValue>({
    resolver: zodResolver(userUpdateValidationSchema),
  });
  const crudServices = new CrudServices();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const res = await crudServices.getUserProfile();
      // console.log("res", res.data);
      if (!res || res.error) {
        toast.error("Error fetching user profile");
      } else {
        setUser(res.data);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Error fetching user profile");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: UserFormValue) => {
    setLoading(true);
    try {
      const response = await crudServices.updateUserDetails(values);
      if (response.error) {
        console.error(response.error);
        toast.error("Error updating profile");
      } else {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
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
              name="bio"
              render={({ field }) => (
                <div>
                  <FormLabel>Bio</FormLabel>
                  <FormCombinedInput
                    {...field}
                    type="text"
                    rows={4}
                    placeholder="Tell us about yourself"
                    disabled={loading}
                    //@ts-ignore
                    defaultValue={user?.UserDetail[0].bio || ""}
                  />
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              name="skills"
              render={({ field }) => (
                <div>
                  <FormLabel>Skills</FormLabel>
                  <FormSelectInput
                    {...field}
                    options={skills}
                    placeholder="Select your skills"
                    multiple
                    searchable
                    //@ts-ignore
                    value={user?.UserDetail[0].skills || []}
                  />
                  <FormMessage />
                </div>
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
};

export default ProfileUpdateForm;
