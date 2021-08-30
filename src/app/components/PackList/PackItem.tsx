import { FC } from "react"
import { Link } from "react-router-dom"
import { Popconfirm } from "antd"

import { getPackPath } from "routes"
import { PackOverview } from "types/pack"
import { useDeletePack, useCopyPack } from "queries/packs"

import { PackWrapper, Metadata, UserOptions } from "./styles"

interface Props {
  pack: PackOverview
}

export const PackItem: FC<Props> = ({ pack }) => {
  const { id, title } = pack
  const deletePack = useDeletePack()
  const copyPack = useCopyPack()

  const { duration, duration_unit, season, itemCount } = pack
  const durationDisplay = !!duration && (
    <div>
      {duration} {duration_unit}
    </div>
  )
  const seasonDisplay = !!season && <div>{season}</div>

  const handleDelete = () => {
    deletePack.mutate({ id: pack.id })
  }

  const handleCopy = () => {
    copyPack.mutate({ id: pack.id })
  }

  return (
    <PackWrapper>
      <Link to={`/pack/${id}`} className="pack-link">
        {title}
      </Link>
      <Metadata>
        <div>{itemCount} Items</div>
        {durationDisplay}
        {seasonDisplay}
      </Metadata>
      <UserOptions>
        {pack.public && (
          <a href={getPackPath(id, title)} target="_blank" rel="noreferrer">
            view
          </a>
        )}
        <Link to={`/pack/${id}`}>edit</Link>
        <a href="#" onClick={handleCopy}>
          copy
        </a>
        <Popconfirm
          title="Are you sure you want to delete this pack?"
          okText="Delete"
          placement="bottom"
          onConfirm={handleDelete}
        >
          <a href="#" className="remove-link">
            delete
          </a>
        </Popconfirm>
      </UserOptions>
    </PackWrapper>
  )
}
