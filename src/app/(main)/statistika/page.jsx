import CircleStatistik from '@/app/components/statistika/circle-statistik'
import TradStatistika from '@/app/components/statistika/trad-statistik'

const data = [1];

export default function Page(){
  return (
    <section className='md:p-[30px] flex flex-col 2xl:flex-row w-[100%] gap-[30px]'>
      <CircleStatistik />

      {data.map((item, index) => (
        <div
          key={index}
          className="card"
          style={{ '--delay': `${index * 0.1}s` }}
        >
          <TradStatistika />
        </div>
      ))}
    </section>
  )
}
