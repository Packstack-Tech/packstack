import { useMemo } from "react"
import { useParams } from "react-router-dom"

import { NEW } from "routes"

import PackForm from "./PackForm"
import { PageWrapper } from "styles/common"

const PackFormContainer: React.FC<RouteComponentProps<{ id: string }>> = (
  routeProps
) => {
  const params = useParams<{ id: string }>()

  const packId = useMemo(() => {
    const routeId = params.id
    return routeId === NEW ? null : parseInt(routeId, 10)
  }, [params])

  return (
    <PageWrapper>
      <PackForm
        packId={packId}
        getPack={app.api.PackService.get}
        getItems={app.api.ItemService.get}
        exportItems={app.api.PackService.exportItems}
        createPack={app.api.PackService.create}
        updatePack={app.api.PackService.update}
        user={app.userInfo}
        {...routeProps}
      />
    </PageWrapper>
  )
}

export default PackFormContainer
