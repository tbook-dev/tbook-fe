import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useCompanyProjects from '@/hooks/useCompanyProjects';
// import TMAShare from '@/components/TMAShare';
import ProjectCard from './ProjectCard'
import ProjectCardSkeleton from './ProjectCardSkeleton'

import LazyImage from '@/components/lazyImage';


import { Dropdown, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

export default function CompanyHome () {
  const { companyId } = useParams();
  let [ searchParams, setSearchParams ] = useSearchParams();

  const initialType = searchParams.get('type')

  const [ selected, setSelected ] = useState(initialType);

  useEffect(() => {
    setSearchParams({ type: selected });
  }, [ selected, setSearchParams ]);

  const { data, isLoading } = useCompanyProjects(companyId, selected?.toLowerCase());

  const companyInfo = data?.data?.company ?? null;
  const layerOneList = data?.data?.layerOneList?.filter(item => item.status !== 0) ?? [];
  const projects = data?.data?.projects ?? [];

  const handleMenuClick = (e) => {
    setSelected(e.key);
  };

  // TODO: layerOneList 不存在、initialType 不存在
  const mappedItems = layerOneList.map((item, index) => {
    return {
      key: item.name,
      default: index === 0,
      label: (
        <span className='text-lg'>
          { item.name }
        </span>
      ),
      icon: <img src={ item.icon } className="w-6 h-6 rounded-full" />,
    };
  });

  const menuProps = {
    items: mappedItems,
    onClick: handleMenuClick,
  };

  return (
    <div className='px-6 pb-32 bg-gradient-to-b from-[#FCFAFD] to-[#EDE1F5] min-h-screen'>
      <div className='flex items-center'>
        <h1 className='pr-4 text-xl font-bold border-r-[1px] border-[#DBBEE8]'>
          Trending Games
        </h1>
        <Dropdown
            className='mx-4'
            placement="bottomLeft"
            menu={ menuProps }
            trigger={ [ 'click' ] }
          >
            <div onClick={ (e) => e.preventDefault() }>
              <Space>
              <img className='w-6 h-6 rounded-full'
                src={ layerOneList.find(item => item.name === selected).icon} alt="" />
                <span className="text-lg font-bold">{ selected }</span>
                <DownOutlined />
              </Space>
            </div>
          </Dropdown>
      </div>
      { isLoading ? (
        new Array(5).fill(0).map(() => (
          <ProjectCardSkeleton />
        ))
      ) : (
        projects.map((item) => (
          <ProjectCard
            isLoading={ isLoading }
            key={ item.projectId }
            info={ item }
          />
        ))
      ) }
    </div>
  )
}
