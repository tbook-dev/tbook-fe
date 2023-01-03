import React, {useState} from 'react';
import {getProjectUsers} from '../../api/incentive'
import SearchForm from '../../partials/actions/SearchForm';
import {Table, Typography} from 'antd'
import {useAsyncEffect} from "ahooks";
import {useSelector} from "react-redux";

const {Paragraph} = Typography


function MemberPanel() {

    const [sync, setSync] = useState(false);
    const [users, setUsers] = useState([]);
    const projectId = useSelector(state => state?.user?.projects?.[0]?.projectId)
    useAsyncEffect(async () => {
        console.log(projectId)

        if (projectId) {
            setUsers(await getProjectUsers(projectId))
        }
    }, [projectId])
    const getColumns = () => {
        return [
            {
                title: 'NAME',
                dataIndex: 'name'
            }, {
                title: 'EMAIL',
                dataIndex: 'email'
            }, {
                title: 'Grant Address',
                dataIndex: 'mainWallet',
                render: (v) => {
                    return (<div className="w-[145px] text-ellipsis	truncate text-[#475569]">
                      <Paragraph copyable={{tooltips: ['copy','copy succeeded']}}>{v}</Paragraph>
                    </div>)
                }
            }, {

                title: 'Access Rights',
                dataIndex: ''
            }
        ]
    }
    return (
        <div className="grow">
            {/* Panel body */}
            <div className="p-6 space-y-6">
                <div className="pr-4 sm:pr-6 lg:pr-8 w-full max-w-9xl mx-auto">

                    {/* Page header */}
                    <div className="sm:flex sm:justify-between sm:items-center mb-5">

                        {/* Left: Title */}
                        <div className="mb-4 sm:mb-0">
                            <h1 className="text-xl md:text-3xl text-slate-800 font-bold">Invoices</h1>
                        </div>

                        {/* Right: Actions */}
                        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                            {/* Search form */}
                            <SearchForm placeholder="Search by name"/>
                            {/* Create invoice button */}
                            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                                <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                    <path
                                        d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"/>
                                </svg>
                                <span className="hidden xs:block ml-2">Add Members</span>
                            </button>
                        </div>


                    </div>
                    <div className="mb-4 sm:mb-0">
                        <ul className="flex flex-wrap -m-1">
                            <li className="m-1">
                                <button
                                    className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">All <span
                                    className="ml-1 text-indigo-200">67</span></button>
                            </li>
                            <li className="m-1">
                                <button
                                    className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">Admin <span
                                    className="ml-1 text-slate-400">14</span></button>
                            </li>
                            <li className="m-1">
                                <button
                                    className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">Grantee <span
                                    className="ml-1 text-slate-400">34</span></button>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Table */}

                <Table columns={getColumns()} rowKey="userId" dataSource={users}/>

            </div>
        </div>
    );
}

export default MemberPanel