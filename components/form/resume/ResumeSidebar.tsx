import Image from "next/image";
import React from "react";
import myImage from "@/public/undraw_male_avatar_g98d.svg";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideTimer } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ResumeSidebarProps = {
  avatar?: string;
  name?: string;
  skills?: string[];
  education?: {
    id: string;
    degree: string;
    school: string;
    description: string;
    startYear: string;
    endYear: string;
    present: boolean;
    cgpa: string;
  }[];
};

const ResumeSidebar = ({ data }: { data?: ResumeSidebarProps }) => {
  return (
    <div className="w-full lg:w-1/4 lg:border-r-2 lg:border-orange-600">
      <div className="flex items-center justify-center mb-4">
        <Image
          src={data?.avatar || myImage}
          alt={data?.name || "User Profile Image"}
          width={200}
          height={200}
          className="rounded-full aspect-square object-cover"
          priority
        />
      </div>
      <div className="mb-4">
        <Separator className="mt-2 bg-orange-500" />
        <div className="text-start text-sm text-orange-600 m-2">
          Technical Skills:
        </div>
        <div className="flex flex-wrap m-1">
          {data?.skills &&
            data.skills.map((skill, index) => (
              <Badge key={index} className="flex m-[1px] capitalize mb-1">
                {skill}
              </Badge>
            ))}
        </div>
      </div>
      <div>
        <Separator className="mt-2 bg-orange-500" />
        <div className="text-start text-sm text-orange-600 m-2">
          Education :
        </div>
        <div>
          {data?.education &&
            data.education.map((edu, index) => (
              <Card key={index} className="flex m-2">
                <div className="flex">
                  <div className="flex flex-col capitalize">
                    <CardHeader>
                      <CardTitle>{edu.degree}</CardTitle>
                      <CardDescription>{edu.school}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="flex gap-1 text-sm">
                        <LucideTimer size={18} />
                        {`${edu.startYear} - ${
                          edu.present ? "Present" : edu.endYear
                        }`}
                      </p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};


export default ResumeSidebar;
