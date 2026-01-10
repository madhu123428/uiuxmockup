import { ProjectType } from '@/type/types'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
type Props={
    project:ProjectType
}
function ProjectCard({project}:Props) {
  return (
    <Link href={'/project/'+project?.projectId}>
    <div className= 'rounded-2xl p-4 '>
      <Image src={project?.screenshot as string} alt={project?.projectName as string}
       width={300} 
       height={200}
       className='rounded-xl object-contain h-[200px] w-full bg-black'/>
      <div>
        <h2 className='text-sm text-gray-500'>{project?.projectName}</h2>
      </div>
    </div>
    </Link>
  )
}

export default ProjectCard
