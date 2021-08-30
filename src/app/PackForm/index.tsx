import { useMemo, FC } from "react"
import { useParams } from "react-router-dom"

import { NEW } from "routes"
import { usePackQuery } from "queries/packs"
import Loading from "app/components/Loading"

import { PackForm } from "./PackForm"
import { PageWrapper } from "styles/common"

const PackFormContainer: FC = () => {
  const params = useParams<{ id: string }>()

  const packId = useMemo(() => {
    const routeId = params.id
    return routeId === NEW ? undefined : parseInt(routeId, 10)
  }, [params])

  const pack = usePackQuery(packId)

  return (
    <PageWrapper>
      {pack.isLoading ? (
        <Loading size="large" />
      ) : (
        <PackForm pack={pack.data} />
      )}
    </PageWrapper>
  )
}

export default PackFormContainer
