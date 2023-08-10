import { useSelector } from 'react-redux'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
const aboardPath = '/aboard'

export default function Wrap ({ children }) {
  const authUser = useSelector(state => state.user.authUser)
  const location = useLocation()
  const navigate = useNavigate()
  console.log({ authUser })
  // if (!authUser && location.pathname !== aboardPath) {
  //   const target = location.pathname + location.search
  //   return (
  //     <Navigate to={`${aboardPath}?redirect=${encodeURIComponent(target)}`} />
  //   )
  // }

  useEffect(() => {
    if (!authUser) {
      navigate('/aboard')
    }
  }, [authUser])

  return children
}
