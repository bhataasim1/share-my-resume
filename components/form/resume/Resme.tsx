import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideBriefcase, LucideTimer } from "lucide-react";
import React from "react";

/// TODO: Fix the type of data
const Resume = ({ data }: { data?: any }) => {
    return (
      <div>
        <div>
          <Card className="flex flex-col w-full mb-3">
            <div className="flex items-center p-3">
              <div className="flex flex-col text-justify">
                <CardHeader>
                  <CardTitle className="font-bold mb-3">{data?.name}</CardTitle>
                  <CardDescription>{data?.UserDetail[0].bio}</CardDescription>
                </CardHeader>
              </div>
            </div>
          </Card>
        </div>
        <div>
          {data?.UserDetail[0].work.map((exp: any, index: number) => (
            <Card key={index} className="flex flex-col w-full mb-3">
              <div className="flex items-center p-3">
                <LucideBriefcase size={48} className="w-16 h-16 m-3" />
                <div className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{exp.position}</CardTitle>
                    <CardDescription className="font-bold">{exp.company}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="flex gap-1 text-sm">
                      <LucideTimer size={18} />
                      {`${exp.startYear} - ${
                        exp.present ? "Present" : exp.endYear
                      }`}
                    </p>
                  </CardContent>
                </div>
              </div>
              <CardContent>
                <p>{exp.description}</p>
                {exp.skills.length > 0 && (
                  <p className="text-sm mt-2 capitalize">
                    Skills: {exp.skills.join(", ")}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  

export default Resume;
