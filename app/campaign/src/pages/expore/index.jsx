import useExporeCampainQuery from '@/hooks/useExporeCampainQuery'
import ListCampain from '@/components/campain/listCampain'
const pageConf = {
  title: 'Explore Campaigns'
}
export default function Expore () {
  const { data: list = [] } = useExporeCampainQuery()
  return (
    <main className='bg-[#FAFAFA]'>
      <div className='lg:w-bx mx-auto px-7 lg:px-0'>
        <h1 className='py-5 lg:py-10 text-black text-2xl font-bold lg:text-[32px] leading-tight lg:font-black'>
          {pageConf.title}
        </h1>

        <div>
          {list.map(campain => {
            return <ListCampain key={campain.campaignId} />
          })}
        </div>
      </div>
    </main>
  )
}
