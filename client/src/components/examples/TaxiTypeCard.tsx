import TaxiTypeCard from '../TaxiTypeCard'
import { useState } from 'react'

export default function TaxiTypeCardExample() {
  const [selected, setSelected] = useState<'shared' | 'normal' | null>('shared')

  return (
    <div className="grid md:grid-cols-2 gap-6 p-6 max-w-4xl">
      <TaxiTypeCard
        type="shared"
        selected={selected === 'shared'}
        onClick={() => setSelected('shared')}
        price="12-15"
        eta="8 min"
        capacity={4}
      />
      <TaxiTypeCard
        type="normal"
        selected={selected === 'normal'}
        onClick={() => setSelected('normal')}
        price="20-25"
        eta="5 min"
        capacity={4}
      />
    </div>
  )
}
