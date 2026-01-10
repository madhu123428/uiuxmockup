"use client"
import React, { useContext, useEffect,useState } from 'react'
import ProjectHeader from './_shared/ProjectHeader'
import SettingsSection from './_shared/SettingsSection'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { ProjectType, ScreenConfig } from '@/type/types'
import { Loader2Icon } from 'lucide-react'
import Canvas from './_shared/Canvas'
import { SettingContext } from '@/context/SettingContext'
import { RefreshDataContext } from '@/context/RefreshDataContext'

function ProjectCanvasPlayground() {
    const {projectId}=useParams();
    const [projectDetail,setProjectDetail]=useState<ProjectType>();
    const [screenConfig,setScreenConfig]=useState<ScreenConfig[]>([]);
    const [screenConfigOriginal,setScreenConfigOriginal]=useState<ScreenConfig[]>([]);
    const {settingsDetail,setSettingDetail}=useContext(SettingContext);
    const [loading,setLoading]=useState(false);
    const [loadingMsg,setLoadingMsg]=useState('Loading')
    const {refreshData,setRefreshData}=useContext (RefreshDataContext)

    useEffect(()=>{
        projectId&&GetProjectDetail();
    },[projectId])
    useEffect(()=>{
      if(refreshData?.method=='screenConfig'){
        GetProjectDetail();
      }
    },[refreshData])
    const GetProjectDetail=async()=>{
        setLoading(true);
        setLoadingMsg('Loading...')
       const result=await axios.get('/api/project?projectId='+projectId)
       console.log(result.data)
       setProjectDetail(result?.data?.projectDetail);
        setScreenConfigOriginal(result?.data?.screenConfig);
       setScreenConfig(result?.data?.screenConfig);
    //    if(result.data?.screenConfig?.length==0){
    //       generateScreenConfig();
    //    }
       setSettingDetail(result?.data?.projectDetail)
       setLoading(false);
    }
    useEffect(()=>{
       if(projectDetail&&screenConfigOriginal&&screenConfigOriginal.length===0){
        generateScreenConfig();
       }
       else if(projectDetail&&screenConfigOriginal){
           GenerateScreenUIUX();
       }
    },[projectDetail,screenConfigOriginal])
    const generateScreenConfig=async()=>{
        setLoading(true);
        setLoadingMsg('Generating screen config...');
        const result=await axios.post('/api/generate-config',{
            projectId:projectId,
            deviceType:projectDetail?.device,
            userInput:projectDetail?.userInput
        })
        console.log(result.data);
        GetProjectDetail();
        setLoading(false);
    }
    const GenerateScreenUIUX=async()=>{
        setLoading(true);
        
        for(let index=0;index<screenConfig?.length;index++){
            const screen=screenConfig[index];
            if(screen?.code)continue;
            setLoadingMsg('Generating Screen'+ index + 1)
            const result=await axios.post('/api/generate-screen-ui',{
                projectId,
                screenId:screen?.screenId,
                screenName:screen?.screenName,
                purpose:screen?.purpose,
                screenDescription:screen?.screenDescription
            });
            console.log(result.data)
            setScreenConfig(prev=>prev.map((item,i)=>(i===index?result.data:item)))
        }
  
        setLoading(false);
    }
  return (
    <div>
      <ProjectHeader />
      <div className='flex '>
        {loading&&<div className='p-3 absolute bg-blue-300/20 left-1/2
         mt-20  border-blue-400 border rounded-2xl'>
            <h2 className='flex gap-2 items-center'><Loader2Icon className='animate-spin'/>{loadingMsg}</h2>
        </div>}

        {/* settings */}
        <SettingsSection projectDetail={projectDetail}
        screenDescription={screenConfig[0]?.screenDescription}/>

        {/* canvas */}
        <Canvas projectDetail={projectDetail} screenConfig={screenConfig} />
      </div>
    </div>
  )
}

export default ProjectCanvasPlayground
