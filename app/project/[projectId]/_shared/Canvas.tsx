import React, { useEffect, useRef, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import ScreenFrame from "./ScreenFrame";
import { ProjectType, ScreenConfig } from "@/type/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Minus, Plus, RefreshCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import axios from "axios";
type Props = {
  projectDetail: ProjectType | undefined;
  screenConfig: ScreenConfig[];
  loading?: boolean;
  takeScreenshot:any;
};
function Canvas({ projectDetail, screenConfig, loading,takeScreenshot }: Props) {
  const [panningEnabled, setPanningEnabled] = useState(true);

  const isMobile = projectDetail?.device === "mobile";

  const SCREEN_WIDTH = isMobile ? 400 : 1200;
  const SCREEN_HEIGHT = isMobile ? 800 : 800;
  const GAP = isMobile ? 10 : 20;

  const iframeRefs=useRef<(HTMLFormElement|null)[]>([])

  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();

    return (
      <div className="tools absolute p-3 px-3 bg-white shadow flex gap-3 rounded-4xl bottom-10 left-1/2 z-30 text-gray-500">
        <Button variant={'ghost'} size={'sm'} onClick={() => zoomIn()}><Plus/></Button>
        <Button variant={'ghost'} size={'sm'} onClick={() => zoomOut()}><Minus/></Button>
        <Button variant={'ghost'} size={'sm'} onClick={() => resetTransform()}><RefreshCcw/></Button>
      </div>
    );
  };
   
   useEffect(()=>{
      takeScreenshot&&onTakeScreenshot(takeScreenshot);
   },[takeScreenshot])

 

const waitForImages = async (doc: Document) => {
  const images = Array.from(doc.images || []);
  await Promise.all(
    images
      .filter(img => !img.complete)
      .map(
        img =>
          new Promise<void>(res => {
            img.onload = img.onerror = () => res();
          })
      )
  );
};

const captureOneIframe = async (iframe: HTMLIFrameElement) => {
  const doc = iframe.contentDocument;
  if (!doc) throw new Error("iframe document not accessible (cross-origin?)");

  // wait for fonts
  // @ts-ignore
  if (doc.fonts?.ready) await doc.fonts.ready;

  // wait for images
  await waitForImages(doc);

  const target = doc.documentElement;
  const width = target.scrollWidth;
  const height = target.scrollHeight;

  const canvas = await html2canvas(target, {
    backgroundColor: null,
    useCORS: true,
    allowTaint: false,
    width,
    height,
    windowWidth: width,
    windowHeight: height,
    scale: window.devicePixelRatio || 1,
  });

  return {
    canvas,
    width: canvas.width,
    height: canvas.height,
  };
};

const onTakeScreenshot = async (saveOnly=false) => {
  try {
    const iframes = iframeRefs.current.filter(Boolean) as any;
    if (!iframes.length) {
      toast.error("No iframes found to capture");
      return;
    }

    // 1) capture all iframes
    const shots: { canvas: HTMLCanvasElement; width: number; height: number }[] =
      [];

    for (let i = 0; i < iframes.length; i++) {
      const shot = await captureOneIframe(iframes[i]);
      shots.push(shot);
    }

    // 2) calculate final canvas size
    const GAP = 24;
    const HEADER_H = 40 * (window.devicePixelRatio || 1);

    const totalWidth =
      shots.reduce((sum, s) => sum + s.width, 0) +
      GAP * (shots.length - 1);

    const maxHeight = Math.max(...shots.map(s => s.height));

    const out = document.createElement("canvas");
    out.width = totalWidth;
    out.height = maxHeight + HEADER_H;

    const ctx = out.getContext("2d");
    if (!ctx) throw new Error("2D context not available");

    ctx.clearRect(0, 0, out.width, out.height);

    // 3) draw stitched result
    let offsetX = 0;
    for (const shot of shots) {
      ctx.drawImage(shot.canvas, offsetX, HEADER_H);
      offsetX += shot.width + GAP;
    }

    // 4) download
    const url = out.toDataURL("image/png");
    console.log(url)
    updateProjectWithScreenshot(url);
    if(!saveOnly){
    const a = document.createElement("a");
    a.href = url;
    a.download = "canvas.png";
    a.click();
  }
  } catch (err) {
    console.error(err);
    toast.error("Capture failed (iframe)");
  }
};

   const updateProjectWithScreenshot=async(base64Url:string)=>{
     const result=await axios.put('/api/project',{
       screenShot:base64Url,
       projectId:projectDetail?.projectId,
       theme:projectDetail?.theme,
       projectName:projectDetail?.projectName
     })
     console.log(result.data)
   }


  
  return (
    <div
      className="w-full h-screen bg-gray-200"
      style={{
        backgroundImage:
          "radial-gradient(rgba(0,0,0,0.15) 1px,transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <TransformWrapper
        initialScale={0.7}
        minScale={0.7}
        maxScale={3}
        initialPositionX={50}
        initialPositionY={50}
        limitToBounds={false}
        wheel={{ step: 0.8 }}
        doubleClick={{ disabled: false }}
        panning={{ disabled: !panningEnabled }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <Controls />
            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%" }}
            >
              {screenConfig?.map((screen, index) => (
                <div>
                  {screen?.code ? (
                    <ScreenFrame
                      x={index * (SCREEN_WIDTH + GAP)}
                      y={0}
                      width={SCREEN_WIDTH}
                      height={SCREEN_HEIGHT}
                      key={index}
                      setPanningEnabled={setPanningEnabled}
                      htmlCode={screen?.code}
                      projectDetail={projectDetail}
                      screen={screen}
                      iframeRef={(ifrm:any)=>(iframeRefs.current[index]=ifrm)}
                    />

                  ) : (
                    <div
                      className="bg-white rounded-2xl p-5 gap-4 flex flex-col"
                      style={{
                        width: SCREEN_WIDTH,
                        height: SCREEN_HEIGHT,
                      }}
                    >
                      <Skeleton className="w-full rounded-lg h-10 bg-gray-200" />
                      <Skeleton className="w-[50%] rounded-lg h-20 bg-gray-200" />
                      <Skeleton className="w-[70%] rounded-lg h-30 bg-gray-200" />
                      <Skeleton className="w-[30%] rounded-lg h-10 bg-gray-200" />
                      <Skeleton className="w-full rounded-lg h-10 bg-gray-200" />
                      <Skeleton className="w-[50%] rounded-lg h-20 bg-gray-200" />
                      <Skeleton className="w-[70%] rounded-lg h-30 bg-gray-200" />
                      <Skeleton className="w-[30%] rounded-lg h-10 bg-gray-200" />
                    </div>
                  )}
                </div>
              ))}
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}

export default Canvas;
