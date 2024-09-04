'use client'
import { CardSum } from './components/CardSum'
import { BookOpenCheck, Trees, Waypoints } from 'lucide-react'
import { LatestEdits } from './components/LatestEdits'
import { Editors } from './components/Editors'
import { useOccurrences } from '../context/OccurrencesContext'
import { useEffect } from 'react'
import { getAllOccurrences } from '../api/ocurrences'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const dataCardsSum = [
  {
    icon: Trees,
    total: '10',
    average: 13,
    title: 'Árvores criadas',
    tooltipText: 'Ver todas as árvores criadas',
  },
  {
    icon: Waypoints,
    total: '7',
    average: 9,
    title: 'PI criados',
    tooltipText: 'Ver todos os pontos de interesse criados',
  },
  {
    icon: BookOpenCheck,
    total: '231',
    average: 92,
    title: 'Edições',
    tooltipText: 'Ver todas as edições',
  },
]

export default function Home() {
  const { allOccurrences, setAllOccurrences } = useOccurrences()

  return (
    <div>
      <h2 className="mb-4 text-2xl">Dashboard</h2>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20">
        {dataCardsSum.map(({icon, total, average, title, tooltipText}) => (
          <CardSum
            key={title}
            icon={icon}
            total={total}
            average={average}
            title={title}
            tooltipText={tooltipText}
          />
        ))}
      </div> */}
      <div className="mt-12 grid grid-cols-1 md:gap-x-10 xl:grid-cols-2">
        <LatestEdits />
        <Editors />
        <ToastContainer />
      </div>
    </div>
  )
}
