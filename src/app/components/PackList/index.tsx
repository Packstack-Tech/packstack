import * as React from "react"
import { PackOverview } from "types/pack"

import Loading from "app/components/Loading"

import { PackItem } from "./PackItem"

interface Props {
  packs: PackOverview[]
  loading: boolean
}

const PackList: React.FC<Props> = ({ packs, loading }) => {
  if (loading) {
    return <Loading size="large" />
  }

  if (!packs.length) {
    return <p>No packs created yet!</p>
  }

  return (
    <div>
      {packs.map((pack) => (
        <PackItem key={pack.id} pack={pack} />
      ))}
    </div>
  )
}

export default PackList
