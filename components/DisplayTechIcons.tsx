import { getTechLogos } from "@/lib/utils";
import React from "react";
import Image from "next/image";

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const icons = await getTechLogos(techStack);
  return (
    <div className="flex flex-row gap-2">
      {icons.map(({ tech, url }) => (
        <Image
          key={tech}
          src={url}
          alt={tech}
          width={20}
          height={20}
          className="rounded-full"
        />
      ))}
    </div>
  );
};

export default DisplayTechIcons;
