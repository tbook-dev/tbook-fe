import { useResponsive } from 'ahooks'
import useExporeCampainQuery from '@/hooks/useExporeCampainQuery'

export default function Campaigns () {
  const { pc } = useResponsive()
  const { data } = useExporeCampainQuery()
  console.log(data)
  return <div></div>
}
