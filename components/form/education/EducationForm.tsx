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
import { userCreateEducationValidationSchema } from "@/components/form/zodValidation";
import { CrudServices } from "../crud/crudServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

type OnCloseFunction = () => void;

type EducationFormProps = {
  onClose: OnCloseFunction;
  initialData?: any;
  editMode: boolean;
  onCreateOrUpdate?: () => void;
};

type EducationFormValues = z.infer<typeof userCreateEducationValidationSchema>;

const EducationForm = ({
  onClose,
  initialData,
  editMode,
  onCreateOrUpdate,
}: EducationFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const crudServices = new CrudServices();

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(userCreateEducationValidationSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: EducationFormValues) => {
    try {
      setLoading(true);
      const response = editMode
        ? await crudServices.updateUserEducation(initialData.id, values)
        : await crudServices.createUserEducation(values);
      // console.log("Response:", response);
      toast.success(
        editMode
          ? "Education updated successfully"
          : "Education added successfully"
      );
      onCreateOrUpdate && onCreateOrUpdate();
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(`Failed to ${editMode ? "update" : "add"} education.`);
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
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College</FormLabel>
                      <FormControl>
                        <FormCombinedInput
                          {...field}
                          type="text"
                          placeholder="College Name"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <FormCombinedInput
                          {...field}
                          type="text"
                          placeholder="Degree"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cgpa"
                  render={({ field }) => (
                    <div className="flex-1">
                      <FormItem>
                        <FormLabel>CGPA</FormLabel>
                        <FormControl>
                          <FormCombinedInput
                            {...field}
                            type="text"
                            placeholder="Your CGPA"
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
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
                          placeholder="Description"
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
                    ? "Update Education"
                    : "Add Education"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;
