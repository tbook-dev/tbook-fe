import React from 'react'
import {Table} from 'antd'
import {grantStatusList, grantType} from '../../utils/const'


export default function ({list = [], title = () => null}) {
    const columns = [
        {
            title: 'GRANT ID',
            render: (_, v) => <p className="text-[#38BDF8]">{v?.grant?.grantId}</p>
        }, {
            title: 'GRANTEE',
            dataIndex: 'granteeId',
            render(_, record) {
                return (<div className="flex">
                    <img src={record?.grantee?.avatar} className="w-[50px] h-[50px] mr-2.5"/>
                    <div className="flex-none w-[145px] text-center">
                        <h3 className="text-ellipsis	truncate  w-full font-bold text-[#1E293B] text-base	">{record?.grantee?.name}</h3>
                        <p className="text-ellipsis	truncate  w-full text-[#94A3B8] text-xs">{record?.grantee?.mainWallet}</p>
                    </div>
                </div>)

            }
        },
        {
            title: 'STATUS',
            render(_, record) {
                return grantStatusList.find(item => record?.grant?.grantStatus === item.value)?.render();
            }
        },
        {
            title: 'TOTAL TOKEN',
            render(_, record) {
                return record?.grant?.grantNum
            }
        },
        {
            title: 'GRANT DATE',
            render(_, record) {
                return record?.grant?.grantDate
            }
        },
        {
            title: 'VESTED',
            render(_, record) {
                return record?.grant?.vestingInitialNum
            }
        },
        {
            title: 'VESTING SCHEDULE',
            render(_, record) {
                return grantType.find(item => item.value === record?.grant?.grantType)?.name
            }
        }
    ]

    return (
        <Table
            columns={columns}
            rowKey={record => record?.grant?.grantId}
            title={title}
            dataSource={list}/>
    )
}