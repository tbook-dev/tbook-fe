import React, { useState } from 'react'
import { useCurrentProject, useProjects } from '@tbook/hooks'
import { useResponsive } from 'ahooks'
import ProjectDropDown from './ProjectDropDown'
import H5Drawer from './H5Drawer'
import WebDropDown from './WebDropDown'

export default function UserMenu ({ showProject = true }) {
  const currentProject = useCurrentProject()
  const { pc } = useResponsive()
  const [open, setOpen] = useState(false)
  const [projectOpen, setProjectOpen] = useState(false)

  const projects = useProjects()

  return (
    <div className='relative flex'>
      {Array.isArray(projects) &&
        showProject &&
        projects.length > 0 &&
        (pc ? (
          <ProjectDropDown open={projectOpen} setOpen={setProjectOpen} />
        ) : (
          <div className='flex items-center h-10 px-4 py-2 rounded-lg text-c1 dark:text-c-9 lg:dark:shadow-d3'>
            {currentProject?.projectName}
          </div>
        ))}

      {pc ? (
        <WebDropDown open={open} setOpen={setOpen} />
      ) : (
        <H5Drawer open={open} setOpen={setOpen} />
      )}
    </div>
  )
}

UserMenu.SettingPc = WebDropDown
UserMenu.SettingH5 = H5Drawer

UserMenu.SwitchProject = ProjectDropDown
