import { getTechLogos } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const icons = await getTechLogos(techStack);

  return (
    <div className="flex flex-row gap-2">
      {icons.map(({ tech, url }) => (
        <Tooltip  key={tech}>
          <TooltipTrigger  className="!bg-transparent">
            <Image
              src={url}
              alt={tech}
              width={30}
              height={30}
              className="rounded-full border-gray-200 border-2"
            />
          </TooltipTrigger>
          <TooltipContent className="bg-white [&_svg]:!hidden mb-2">
            <p >{tech}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
