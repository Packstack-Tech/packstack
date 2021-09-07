import { useMemo, useEffect, useState, FC } from "react"
import { useParams } from "react-router-dom"

import { NEW } from "routes"
import { usePackQuery } from "queries/packs"
import Loading from "app/components/Loading"

import { PackForm } from "./PackForm"
import { PageWrapper } from "styles/common"

const PackFormContainer: FC = () => {
  const [transition, setTransition] = useState(false)
  const params = useParams<{ id: string }>()

  const packId = useMemo(() => {
    const routeId = params.id
    return routeId === NEW ? undefined : parseInt(routeId, 10)
  }, [params])

  // stupid hack to reset form
  useEffect(() => {
    setTransition(true)
  }, [packId])

  useEffect(() => {
    setTransition(false)
  }, [transition])

  const pack = usePackQuery(packId)

  return (
    <PageWrapper>
      {pack.isLoading || transition ? (
        <Loading size="large" />
      ) : (
        <PackForm pack={packId ? pack.data : undefined} />
      )}
    </PageWrapper>
  )
}

export default PackFormContainer
