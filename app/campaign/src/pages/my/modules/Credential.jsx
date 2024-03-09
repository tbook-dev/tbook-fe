import { Spin, Popover } from 'antd';
import Empty from './Empty';
import useAssetQuery from '@/hooks/useAssetQuery';
import clsx from 'clsx';
import { useLoaderData } from 'react-router-dom';
import { groupBy } from 'lodash';
import { Display } from '@tbook/credential';

export default function Credentials () {
  const { projectId } = useLoaderData();
  const { data: assets, isLoading } = useAssetQuery(projectId);
  const data = assets?.credentials || [];
  const credentialListWithUnikey = data.map(v => {
    return {
      ...v,
      uniKey: v.options + '-' + v.labelType,
    };
  });
  const fdata = groupBy(credentialListWithUnikey, 'uniKey');
  // console.log({ fdata, credentialList: data, credentialListWithUnikey });

  return (
    <div
      className={clsx(
        'flex flex-col lg:flex-row gap-y-4 lg:flex-wrap gap-x-2 items-center px-2 lg:px-0 font-medium',
        isLoading && 'pt-10 justify-center'
      )}
    >
      {isLoading ? (
        <Spin spinning />
      ) : data.length > 0 ? (
        Object.entries(fdata).map(([k, v]) => {
          const item = v[0];
          let options = {};
          try {
            options = JSON.parse(item.options);
          } catch (error) {
            console.log(
              'options not a json string, origin options is',
              v.options
            );
          }
          return v.length > 1 ? (
            <Popover
              key={k}
              content={
                <div className='space-y-6'>
                  {v.map(item => {
                    let options = {};
                    try {
                      options = JSON.parse(item.options);
                    } catch (error) {
                      console.log(
                        'options not a json string, origin options is',
                        v.options
                      );
                    }
                    return (
                      <div
                        className='flex items-center gap-x-1  bg-white text-black py-1 px-3 w-max rounded-[18px] border-b-2 border-l-2 lg:border-b-4 lg:border-l-4 border-[#904BF6]'
                        key={k}
                      >
                        {/* <img
                          src={item.picUrl}
                          className='w-5 h-5 object-contain object-center'
                        />
                        <div className='flex'>
                          <div
                            className={'max-w-[calc(100vw_-_80px)] truncate'}
                            key={item.credentialId}
                            dangerouslySetInnerHTML={{
                              __html: item.displayExp,
                            }}
                          />
                          _{`${item.credentialId}`.slice(-4)}
                        </div> */}
                        <Display
                          labelType={item.labelType}
                          pc
                          options={options}
                        />
                        _{`${item.credentialId}`.slice(-4)}
                      </div>
                    );
                  })}
                </div>
              }
            >
              <div className='flex items-center gap-x-1  bg-white text-black py-1 px-3 w-max rounded-[18px] border-b-2 border-l-2 lg:border-b-4 lg:border-l-4 border-[#904BF6]'>
                <Display labelType={item.labelType} pc options={options} />

                {/* <img
                  src={item.picUrl}
                  className='w-5 h-5 object-contain object-center'
                />
                <div
                  className={'max-w-[calc(100vw_-_80px)] truncate'}
                  key={item.credentialId}
                  dangerouslySetInnerHTML={{ __html: item.displayExp }}
                /> */}

                <span className='text-[rgb(143,117,205)] ml-3 px-2.5 py-0.5 rounded-[10px] cursor-pointer bg-[#EDE9FE]'>
                  {v.length}
                </span>
              </div>
            </Popover>
          ) : (
            <div
              key={k}
              className='flex items-center gap-x-1  bg-white text-black py-1 px-3 w-max rounded-[18px] border-b-2 border-l-2 lg:border-b-4 lg:border-l-4 border-[#904BF6]'
            >
              {/* <img
                src={item.picUrl}
                className='w-5 h-5 object-contain object-center'
              />
              <div
                className={'max-w-[calc(100vw_-_80px)] truncate'}
                key={item.credentialId}
                dangerouslySetInnerHTML={{ __html: item.displayExp }}
              /> */}
              <Display
                key={item.credentialId}
                labelType={item.labelType}
                pc
                options={options}
              />
            </div>
          );
        })
      ) : (
        <div
          key={k}
          className='lg:w-full lg:h-[330px] lg:bg-[#0F081A] lg:rounded-xl flex justify-center items-center'
        >
          <Empty text="There's no credential yet." />
        </div>
      )}
    </div>
  );
}
