import React from 'react'
import {Form} from 'antd'

export default function ({planForm, granteeForm}) {
    const granteeName = Form.useWatch('granteeName', granteeForm);

    return (<div>{
        <div className="w-[430px]">
            <div>
                <h2 className="text-base	font-semibold	text-[#1E293B]">Grantee</h2>
                <p className="text-xs text-[#475569]">Name</p>
                <h3 className="text-base	font-semibold	text-[#1E293B]">{granteeName}</h3>
            </div>
          <div>
            x
          </div>
        </div>

    }</div>)
}