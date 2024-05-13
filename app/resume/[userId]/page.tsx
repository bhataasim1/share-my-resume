"use client";

import { CrudServices } from "@/components/form/crud/crudServices";
import Resume from "@/components/form/resume/Resme";
import ResumeSidebar from "@/components/form/resume/ResumeSidebar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";

export type UserTypes = {
  id: string;
  name: string;
  username: string;
  email: string;
  UserDetail: {
    id: string;
    userId: string;
    avatar: string;
    bio: string;
    skills: string[];
    education: {
      id: string;
      degree: string;
      school: string;
      description: string;
      startYear: string;
      endYear: string;
      present: boolean;
      cgpa: string;
      work: {
        id: string;
        company: string;
        position: string;
        description: string;
        startYear: string;
        endYear: string | null;
        present: boolean;
        skills: string[];
      }[];
    }[];
  }[];
};

const Page = ({ params }: { params: { userId: string } }) => {
  const [user, setUser] = useState<UserTypes | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const crudServices = new CrudServices();

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await crudServices.getUserProfileById(params.userId);
      console.log("res", res.data);
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

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <HashLoader color="#2563EB" />
      </div>
    );
  }

  return (
    <>
      <div className="md:flex h-screen">
        {user && user.UserDetail && user.UserDetail.length > 0 && (
          <>
            <ResumeSidebar data={user.UserDetail[0]} />
            <div className="flex-1 p-2 px-4">
              <Resume data={user} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
