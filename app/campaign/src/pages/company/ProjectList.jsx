import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import useCompanyProjects from '@/hooks/useCompanyProjects';
// import TMAShare from '@/components/TMAShare';
import ProjectCard from './ProjectCard'
import ProjectCardSkeleton from './ProjectCardSkeleton'

import Layout from '@/layout/custom/Layout';
import LazyImage from '@/components/lazyImage';


import { Dropdown, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

export default function CompanyHome () {
  const { companyId } = useParams();
  const [ selected, setSelected ] = useState('TON');

  const { data, isLoading } = useCompanyProjects(companyId, selected?.toLowerCase());

  const companyInfo = data?.data?.company ?? null;
  const projects = data?.data?.projects ?? [];

  const list = [ 'TON', 'ETH', 'Solana', 'BSC', 'Polygon' ];

  const handleMenuClick = (e) => {
    setSelected(e.key);
  };

  // const mappedItems = list.map((name, index) => {
  //   const getIcon = () => {
  //     switch (name) {
  //       case 'TON':
  //         return <TonIcon />;
  //       case 'ETH':
  //         return <TonIcon />;
  //       case 'Solana':
  //         return <TonIcon />;
  //       default:
  //         return null;
  //     }
  //   };

  //   return {
  //     key: name,
  //     default: index === 0,
  //     label: (
  //       <span className='text-lg'>
  //         { name }
  //       </span>
  //     ),
  //     icon: <TonIcon className="w-6 h-6" />,
  //   };
  // });

  console.log(mappedItems);

  const menuProps = {
    items: mappedItems,
    onClick: handleMenuClick,
  };

  return (
    <Layout title={ companyInfo?.companyName || '' }>
      <div className='px-6 pb-32 bg-gradient-to-b from-[#FCFAFD] to-[#EDE1F5] min-h-screen'>
        <div className='flex items-center'>
          <h1 className='pr-4 text-xl font-bold border-r-[1px] border-[#DBBEE8]'>
            Trending Games
          </h1>
          {/* <Dropdown
            className='mx-4'
            placement="bottomLeft"
            menu={ menuProps }
            trigger={ [ 'click' ] }
          >
            <div onClick={ (e) => e.preventDefault() }>
              <Space>
                <span className="text-lg font-bold">{ selected }</span>
                <DownOutlined />
              </Space>
            </div>
          </Dropdown> */}
        </div>
        { isLoading ? (
          new Array(5).fill(0).map(() => (
            <ProjectCardSkeleton />
          ))
        ) : (
          projects.map((item) => (
            <ProjectCard
              key={ item.projectId }
              info={ item }
            />
          ))
        )}
      </div>
    </Layout>
  )
}
