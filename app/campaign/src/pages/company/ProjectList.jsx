import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import useCompanyProjects from '@/hooks/useCompanyProjects';
// import TMAShare from '@/components/TMAShare';
import ProjectCard from './ProjectCard'
import ProjectCardSkeleton from './ProjectCardSkeleton'

import LazyImage from '@/components/lazyImage';

import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export default function CompanyHome () {
  const { companyId } = useParams();
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ layerOneList, setLayerOneList ] = useState([]);

  // 使用 useMemo 来计算有效的初始类型
  const validInitialType = useMemo(() => {
    const urlType = searchParams.get('type');
    return layerOneList.find(item => item.name.toLowerCase() === urlType?.toLowerCase())?.name
      || layerOneList[ 0 ]?.name
      || '';
  }, [ searchParams, layerOneList ]);

  const [ selected, setSelected ] = useState('');

  useEffect(() => {
    if (validInitialType) {
      setSelected(validInitialType);
    }
  }, [ validInitialType ]);

  const { data, isLoading } = useCompanyProjects(companyId, selected.toLowerCase());

  useEffect(() => {
    if (data?.data?.layerOneList) {
      setLayerOneList(data.data.layerOneList.filter(item => item.status !== 0));
    }
  }, [ data ]);

  // 当 selected 变化时更新 URL
  useEffect(() => {
    if (selected) {
      setSearchParams({ type: selected });
    }
  }, [ selected, setSearchParams ]);

  const projects = data?.data?.projects ?? [];
  
  const handleMenuClick = (e) => {
    setSelected(e.key);
  };

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
        { layerOneList?.length > 0 && (
          <Dropdown
            className='mx-4'
            placement="bottomLeft"
            menu={ menuProps }
            trigger={ [ 'click' ] }
          >
            <div onClick={ (e) => e.preventDefault() }>
              <Space>
                <img className='w-6 h-6 rounded-full'
                  src={ layerOneList.find(item => item.name === selected)?.icon } alt="" />
                <span className="text-lg font-bold">{ selected }</span>
                <DownOutlined />
              </Space>
            </div>
          </Dropdown>
        )}
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
