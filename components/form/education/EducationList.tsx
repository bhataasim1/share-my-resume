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
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedEducation, setSelectedEducation] = useState<any | null>(null);
  const crudServices = new CrudServices();

  const handleEducation = () => {
    localStorage.setItem("education", "true");
    setShowEducation(true);
  };

  const handleCloseEducation = () => {
    localStorage.removeItem("education");
    setShowEducation(false);
    setEditMode(false);
    setSelectedEducation(null);
  };

  const fetchEducation = async () => {
    setLoading(true);
    try {
      const res = await crudServices.getUserProfile();
      // console.log("res", res.data.UserDetail[0].education);
      if (!res || res.error) {
        toast.error("Error fetching user profile");
      } else {
        const sortedEducation = res.data.UserDetail[0].education.sort(
          (a: any, b: any) => parseInt(b.endYear) - parseInt(a.endYear)
        );
        setEducation(sortedEducation);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Error fetching user profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedShowEducation = localStorage.getItem("education");
    if (storedShowEducation === "true") {
      setShowEducation(true);
    }

    fetchEducation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id: string) => {
    // console.log("delete", id);
    setLoading(true);
    try {
      crudServices.deleteUserEducation(id).then((res) => {
        if (!res || res.error) {
          toast.error("Error deleting education");
        } else {
          toast.success("Education deleted successfully");
          fetchEducation();
        }
      });
    } catch (error) {
      console.error("Error deleting education:", error);
      toast.error("Error deleting education");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (id: string) => {
    const selected = education.find((edu) => edu.id === id);
    if (selected) {
      setEditMode(true);
      setSelectedEducation(selected);
      setShowEducation(true);
    }
  };

  // Refresh education list after creating or updating education
  const handleCreateOrUpdate = () => {
    fetchEducation();
    handleCloseEducation();
  };

  return (
    <>
      {showEducation ? (
        <EducationForm
          onClose={handleCloseEducation}
          initialData={selectedEducation}
          editMode={editMode}
          onCreateOrUpdate={handleCreateOrUpdate}
        />
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
                          onClick={() => handleUpdate(edu.id)}
                          variant="secondary"
                          className="flex items-center px-3 py-1 rounded mr-2"
                        >
                          <LucideEdit className="mr-1" size={20} />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(edu.id)}
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
