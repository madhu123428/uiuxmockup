import React from 'react'
import ProjectHeader from './_shared/ProjectHeader'
import SettingsSection from './_shared/SettingsSection'

function ProjectCanvasPlayground() {
  return (
    <div>
      <ProjectHeader />
      <div>
        {/* settings */}
        <SettingsSection />
      </div>
    </div>
  )
}

export default ProjectCanvasPlayground
