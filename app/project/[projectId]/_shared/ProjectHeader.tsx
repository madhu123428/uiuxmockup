import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
function ProjectHeader() {
  return (
    <div className="flex items-center justify-between p-3 shadow">
      <div className="flex items-center gap-4 p-4">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <h2 className="text-2xl font-bold">
          <span className="text-primary">UI/UX </span> MOCKUP
        </h2>
      </div>
      <Button><Save/>Save</Button>
    </div>
  );
}

export default ProjectHeader;
