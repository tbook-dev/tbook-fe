import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import RedirectSocial from '@/components/redirectSocial'
import { redirectLocalStorageOnce } from '@/pages/social/conf'
import { delay } from '@/utils/common'
import { setShowMergeAccountModal } from '@/store/global'
import { useDispatch } from 'react-redux'

const displayName = {
  twitter: 'X',
  discord: 'Discord',
  telegram: 'Telegram',
  google: 'Google'
}
const emailTypeList = ['google']
const isEmailType = type => emailTypeList.includes(type)

export default function ({ authCallback, type }) {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [status, setStatus] = useState('loading')
  const [data, setData] = useState({})
  const dispath = useDispatch()

  const openMergeAccountModal = useCallback(() => {
    dispath(setShowMergeAccountModal(true))
  }, [])
  useEffect(() => {
    authCallback()
      .then(async d => {
        setData(d)
        console.log(d, 'd')
        if (d.code === 4004) {
          //           {
          //     "message": "Twitter account already connected",
          //     "socialName": "Timberlake Hu",
          //     "code": 4004,
          //     "address": "0x7Bd6...c6CE"
          // }
          setStatus('occupied')
          setErrorMessage(
            `${displayName[type]} account ${isEmailType(type) ? '' : '@'}${
              d.socialName
            }  has been connected to another address ${d.address}`
          )
        } else if (d.code === 400) {
          // 检查到可以merge
          setStatus('occupied-merge')
          setErrorMessage(
            `${displayName[type]} account ${isEmailType(type) ? '' : '@'}${
              d.socialName
            } has been occupied.`
          )
        } else if (d.code === 500) {
          // 失败
          setStatus('failed')
          setErrorMessage(d.msg)
        } else {
          // 成功停留2s，然后跳转
          setStatus('sucess')
          setErrorMessage(
            `${displayName[type]} account ${isEmailType(type) ? '' : '@'}${
              d.socialName
            } has been authorized. `
          )
          await delay(2000)
          redirectLocalStorageOnce(navigate)
        }
      })
      .catch(async e => {
        console.log(e, 'error')
        setStatus('failed')
      })
  }, [])

  return (
    <div className='w-page-content px-2 lg:px-0 mx-auto'>
      <RedirectSocial
        status={status}
        desc={errorMessage}
        data={data}
        type={type}
      />
    </div>
  )
}
