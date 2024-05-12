"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormCombinedInput } from "@/components/common/FormCombinedInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LucideSquareArrowLeft } from "lucide-react";
import * as z from "zod";
import { userExperienceValidationSchema } from "@/components/form/zodValidation";
import { CrudServices } from "../crud/crudServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormSelectInput } from "@/components/common/FormSelectInput";
import { skills } from "@/constant/skills";

type OnCloseFunction = () => void;

type ExperienceFormProps = {
  onClose: OnCloseFunction;
  initialData?: any;
  editMode: boolean;
  onCreateOrUpdate?: () => void;
};

type ExperienceFormValues = z.infer<typeof userExperienceValidationSchema>;

const ExperienceForm = ({
  onClose,
  initialData,
  editMode,
  onCreateOrUpdate,
}: ExperienceFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  //   const ExperienceDefaultValues = {
  //     company: "Share Your Resume",
  //     position: "Software Engineer",
  //     startYear: "2020",
  //     endYear: "2021",
  //     description: "Software Engineer at Share Your Resume",
  //     present: false,
  //   };

  const crudServices = new CrudServices();

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(userExperienceValidationSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: ExperienceFormValues) => {
    try {
      setLoading(true);
      const response = editMode
        ? await crudServices.updateUserExperience(initialData.id, values)
        : await crudServices.createUserExperience(values);
      console.log("Response:", response);
      toast.success(
        editMode
          ? "Experience updated successfully"
          : "Experience added successfully"
      );
      onCreateOrUpdate && onCreateOrUpdate();
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(`Failed to ${editMode ? "update" : "add"} Experience.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editMode && initialData) {
      form.reset(initialData);
    }
  }, [editMode, initialData, form]);

  return (
    <div className="flex flex-col w-full">
      <div className="p-4">
        <Button onClick={onClose} variant="outline">
          <LucideSquareArrowLeft size={24} className="mr-2" /> Back
        </Button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto w-full">
        <div className="flex flex-col justify-center items-center">
          <div className="max-w-screen-2xl w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 flex flex-col w-full"
              >
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <FormCombinedInput
                          {...field}
                          type="text"
                          placeholder="Company Name"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <FormCombinedInput
                          {...field}
                          type="text"
                          placeholder="Eg. Software Engineer"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="startYear"
                    render={({ field }) => (
                      <div className="flex-1">
                        <FormItem>
                          <FormLabel>Starting Year</FormLabel>
                          <FormControl>
                            <FormCombinedInput
                              {...field}
                              type="text"
                              placeholder="Starting Year"
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endYear"
                    render={({ field }) => (
                      <div className="flex-1">
                        <FormItem>
                          <FormLabel>Ending Year</FormLabel>
                          <FormControl>
                            <FormCombinedInput
                              {...field}
                              type="text"
                              placeholder="Ending Year"
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                </div>

                <div className="flex justify-start ml-[52%]">
                  <FormField
                    name="present"
                    render={({ field }) => (
                      <div className="flex items-center gap-2">
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              {...field}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Present</FormLabel>
                        </FormItem>
                      </div>
                    )}
                  />
                </div>

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
                        animated={true}
                      />
                      <FormMessage />
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <FormCombinedInput
                          {...field}
                          type="text"
                          rows={4}
                          placeholder="Some description about your experience."
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={loading} className="w-full" type="submit">
                  {loading
                    ? editMode
                      ? "Updating..."
                      : "Adding..."
                    : editMode
                    ? "Update Experience"
                    : "Add Experience"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;
