"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideBookOpenCheck, LucideEdit, LucideTrash2 } from "lucide-react";
import EducationForm from "./EducationForm";
import { CrudServices } from "../crud/crudServices";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const EducationList = () => {
  const [showEducation, setShowEducation] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [education, setEducation] = useState<any[]>([]);
  const crudServices = new CrudServices();

  const handleEducation = () => {
    setShowEducation(true);
  };

  const handleCloseEducation = () => {
    setShowEducation(false);
  };

  const fetchEducation = async () => {
    setLoading(true);
    try {
      const res = await crudServices.getUserProfile();
      console.log("res", res.data.UserDetail[0].education);
      if (!res || res.error) {
        toast.error("Error fetching user profile");
      } else {
        setEducation(res.data.UserDetail[0].education);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Error fetching user profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = () => {
    console.log("delete");
  };
  return (
    <>
      {showEducation ? (
        <EducationForm onClose={handleCloseEducation} />
      ) : (
        <div className="flex w-full">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">Education List</h2>
              <Button onClick={handleEducation} variant="secondary">
                Add Education
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="max-w-screen-2xl w-full">
                {loading ? (
                  <div className="flex flex-col justify-center items-center h-30">
                    <Skeleton className="w-full h-44 mb-2" />
                    <Skeleton className="w-full h-44" />
                  </div>
                ) : (
                  education.map((edu, index) => (
                    <Card key={index} className="flex flex-col w-full mb-3">
                      <div className="flex items-center p-3">
                        <LucideBookOpenCheck
                          size={48}
                          className="w-16 h-16 m-3"
                        />
                        <div className="flex flex-col">
                          <CardHeader>
                            <CardTitle>{edu.degree}</CardTitle>
                            <CardDescription>{edu.school}</CardDescription>
                          </CardHeader>
                        </div>
                      </div>
                      <CardContent className="flex justify-end">
                        <Button
                          variant="secondary"
                          className="flex items-center px-3 py-1 rounded mr-2"
                        >
                          <LucideEdit className="mr-1" size={20} />
                          Edit
                        </Button>
                        <Button
                          onClick={handleDelete}
                          variant="destructive"
                          className="flex items-center px-3 py-1 rounded"
                        >
                          <LucideTrash2 className="mr-1" size={20} />
                          Delete
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EducationList;
