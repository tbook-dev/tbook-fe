import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import IncentiveLayout from "./Layout";
import { Button, Space, Form, Input, Select, InputNumber, Modal } from "antd";
import { useSelector } from "react-redux";
import { getGrantInfo, getGrantSignInfo, postGrantSignInfo } from '../../api/incentive'
import { loadWeb3 } from "../../utils/web3";
import { debounce } from 'lodash'

function GrantSign() {
    const userStore = useSelector((state) => state.user)
    const {grantId} = useParams()
    const projectId = userStore?.projects?.[0]?.projectId
    const userId = userStore?.user?.userId
    const [signList, setSignList] = useState([])
    const [grantInfo, setGrantInfo] = useState()
    const navigate = useNavigate()
    const web3Ref = useRef();
    useEffect(() => {
      async function asyncloadWeb3() {
        const web3 = await loadWeb3();
        web3Ref.current = web3;
      }
      asyncloadWeb3();
    }, []);
  
    useEffect(() => {
        getGrantSignInfo(projectId, grantId)
            .then((res) => {
                setSignList(res)
            })
    }, [grantId]);

    useEffect(() => {
        getGrantInfo(grantId)
            .then((res) => {
                console.log({res})
            })
    }, [grantId]);

    function handleSign(sign) {
        web3Ref?.current.eth.personal.sign(
            web3Ref.current.utils.fromUtf8(sign.signInfo),
            web3Ref?.current.currentProvider.selectedAddress
          )
          .then(s => {
            return postGrantSignInfo(projectId, grantId, sign.grantSignId, s)
          })
          .then(r => {
            alert(r.message)
            navigate(0)
          })
    }

    return (<div>
        {
            signList.map(sg => {
                return (<div key={sg.grantSign.signId}>
                    <img width="50" src={sg.signer.avatar}></img>
                    <div>
                        <span>{sg.signer.name}</span>
                    </div>
                    <div>
                    <span>Sign Status: {sg.grantSign.signStatus == 2 ? "SIGNED" : "PENDING"}</span>
                    </div>
                    <div>
                        {(sg.grantSign.signStatus == 1 && sg.signer.userId == userId) ? <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => handleSign(sg.grantSign)}>Sign</button> : null}
                    </div>
                </div>)
            })
        }
    </div>)
}

export default GrantSign;