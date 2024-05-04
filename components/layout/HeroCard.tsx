import HeroResumeSVG from "@/public/undraw_online_cv_re_gn0a.svg";
import Image from "next/image";

export const HeroCards = () => {
  return (
    <>
      <Image
        src={HeroResumeSVG}
        alt="Hero Resume"
        style={{
          width: "auto",
          height: "auto",
        }}
        priority
      />
    </>
  );
};
