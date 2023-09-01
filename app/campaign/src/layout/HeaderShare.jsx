import React from 'react'
import { Web3Button } from '@web3modal/react'
import { useParams } from 'react-router-dom'
import useProjectQuery from '@/hooks/useProjectQuery'
import useCampaignQuery from '@/hooks/useCampaignQuery'
import MobleMenu from './MobleMenu'

function Header () {
  const { campaignId } = useParams()
  const { data: page } = useCampaignQuery(campaignId)
  const { data: project } = useProjectQuery(page?.campaign?.projectId)

  return (
    <header className='bg-white dark:bg-black shadow-d2'>
      <div className='px-4 py-2 lg:px-20 lg:py-2.5'>
        <div className='flex items-center justify-between h-14 lg:h-16'>
          <div className='flex items-center'>
            <img src={project?.avatarUrl} className='h-10 object-contain rounded-full' />
          </div>

          <div className='hidden lg:flex items-center space-x-3'>
            <Web3Button icon='show' balance='hide' avatar='hide' />
          </div>
          <MobleMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
