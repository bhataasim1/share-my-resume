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
import {
  LucideBriefcase,
  LucideEdit,
  LucideTimer,
  LucideTrash2,
} from "lucide-react";
import { CrudServices } from "../crud/crudServices";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import ExperienceForm from "./ExperienceForm";

const ExperienceList = () => {
  const [showExperience, setShowExperience] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [experience, setExperience] = useState<any[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedExperience, setSelectedExperience] = useState<any | null>(
    null
  );
  const crudServices = new CrudServices();

  const handleExperience = () => {
    localStorage.setItem("experience", "true");
    setShowExperience(true);
  };

  const handleCloseExperience = () => {
    localStorage.removeItem("experience");
    setShowExperience(false);
    setEditMode(false);
    setSelectedExperience(null);
  };

  const fetchExperience = async () => {
    setLoading(true);
    try {
      const res = await crudServices.getUserProfile();
      //   console.log("res", res.data.UserDetail[0].work);
      if (!res || res.error) {
        toast.error("Error fetching user profile");
      } else {
        const sortedExperience = res.data.UserDetail[0].work.sort(
          (a: any, b: any) => parseInt(b.endYear) - parseInt(a.endYear)
        );
        setExperience(sortedExperience);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Error fetching user profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedShowExperience = localStorage.getItem("experience");
    if (storedShowExperience === "true") {
      setShowExperience(true);
    }

    fetchExperience();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id: string) => {
    // console.log("delete", id);
    setLoading(true);
    try {
      crudServices.deleteUserExperience(id).then((res) => {
        if (!res || res.error) {
          toast.error("Error deleting experience");
        } else {
          toast.success("Experience deleted successfully");
          fetchExperience();
        }
      });
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast.error("Error deleting experience");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (id: string) => {
    const selected = experience.find((exp) => exp.id === id);
    if (selected) {
      setEditMode(true);
      setSelectedExperience(selected);
      setShowExperience(true);
    }
  };

  // Refresh Experience list after creating or updating Experience
  const handleCreateOrUpdate = () => {
    fetchExperience();
    handleCloseExperience();
  };

  return (
    <>
      {showExperience ? (
        <ExperienceForm
          onClose={handleCloseExperience}
          initialData={selectedExperience}
          editMode={editMode}
          onCreateOrUpdate={handleCreateOrUpdate}
        />
      ) : (
        <div className="flex w-full">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">{`Experience's`}</h2>
              <Button onClick={handleExperience} variant="secondary">
                Add Experience
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="max-w-screen-2xl w-full">
                {loading ? (
                  <div className="flex flex-col justify-center items-center h-30">
                    <Skeleton className="w-full h-64 mb-2" />
                    <Skeleton className="w-full h-64" />
                  </div>
                ) : (
                  experience?.map((exp, index) => (
                    <Card key={index} className="flex flex-col w-full mb-3">
                      <div className="flex items-center p-3">
                        <LucideBriefcase size={48} className="w-16 h-16 m-3" />
                        <div className="flex flex-col">
                          <CardHeader>
                            <CardTitle>{exp.position}</CardTitle>
                            <CardDescription>{exp.company}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="flex gap-1 text-sm">
                              <LucideTimer size={18} />
                              {`${exp.startYear} - ${
                                exp.present
                                  ? "Present"
                                  : exp.endYear
                              }`}
                            </p>
                          </CardContent>
                        </div>
                      </div>
                      <CardContent className="flex justify-end">
                        <Button
                          onClick={() => handleUpdate(exp.id)}
                          variant="secondary"
                          className="flex items-center px-3 py-1 rounded mr-2"
                        >
                          <LucideEdit className="mr-1" size={20} />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(exp.id)}
                          variant="destructive"
                          className="flex items-center px-3 py-1 rounded"
                        >
                          <LucideTrash2 className="mr-1" size={20} />
                          Delete
                        </Button>
                      </CardContent>
                      <CardContent>
                        <p>{exp?.description}</p>
                        {exp?.skills.length > 0 && (
                          <p className="text-sm mt-2 capitalize">
                            Skills: {exp?.skills.join(", ")}
                          </p>
                        )}
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

export default ExperienceList;
