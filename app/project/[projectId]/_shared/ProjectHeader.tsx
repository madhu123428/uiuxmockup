import React, { useContext, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { SettingContext } from "@/context/SettingContext";
import axios from "axios";
import { toast } from "sonner";
function ProjectHeader() {
  const { settingsDetail, setSettingDetail } = useContext(SettingContext);
  const [loading,setLoading]=useState(false);
  const OnSave=async()=>{
    try{
    setLoading(true);
     const result=await axios.put('/api/project',{
      theme: settingsDetail?.theme,
      projectId: settingsDetail?.projectId,
      projectName:settingsDetail?.projectName
     })
     setLoading(false);
     toast.success('Settings saved')
    }
    catch(e){
      setLoading(false);
      toast.success('internal server error')
    }
  }
  return (
    <div className="flex items-center justify-between p-3 shadow">
      <div className="flex items-center gap-4 p-4">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <h2 className="text-2xl font-bold">
          <span className="text-primary">UI/UX </span> MOCKUP
        </h2>
      </div>
      <Button onClick={OnSave}disabled={loading}>{loading?<Loader2 className="animate-spin" />:<Save/>}Save</Button>
    </div>
  );
}

export default ProjectHeader;
