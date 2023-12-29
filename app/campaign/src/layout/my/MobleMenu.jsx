import menuIcon from '@/images/icon/menu.svg'
import { Drawer } from 'antd'
import { useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import Links from './Links'
import { useCallback } from 'react'
import { useLoaderData, Link } from 'react-router-dom'

export default function MobleMenu ({ hideLink = false }) {
  const { project, projectName, isUsingSubdomain } = useLoaderData()
  const [open, setOpen] = useState(false)
  const handleCancel = useCallback(() => {
    setOpen(false)
  }, [])

  const Content = () => (
    <div className='h-full flex flex-col bg-black'>
      <div>
        <div className='flex items-center justify-between h-10 mb-10'>
          <div className='flex items-center'>
            <Link
              to={`${isUsingSubdomain ? '' : `/${projectName}`}`}
              className='mr-1 lg:mr-16'
            >
              <img src={project?.avatarUrl} className='h-6 object-contain' />
            </Link>
          </div>

          <div className='flex items-center gap-x-4'>
            <CloseOutlined
              className='text-2xl'
              style={{ color: 'white' }}
              onClick={handleCancel}
            />
          </div>
        </div>

        <Links
          inDrawer
          hidden={hideLink}
          onClose={() => {
            setOpen(false)
          }}
        />
      </div>
    </div>
  )
  return (
    <div className='lg:hidden'>
      <img
        src={menuIcon}
        className='w-9 h-9 object-center object-contain'
        onClick={() => setOpen(true)}
      />
      <Drawer
        title={null}
        onClose={() => setOpen(false)}
        open={open}
        closable={false}
        placement='right'
        height='100vh'
        width='100vw'
        style={{
          background: '#000'
        }}
      >
        <Content />
      </Drawer>
    </div>
  )
}
