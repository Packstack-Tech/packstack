import { FC } from "react"
import DocumentTitle from "react-document-title"

import PackList from "app/components/PackList"
import { usePacksQuery } from "queries/packs"
import { useUserData } from "hooks/useUserData"

import { PageTitle, PageWrapper } from "styles/common"

export const Packs: FC = () => {
  const user = useUserData()
  const packs = usePacksQuery(user.id)

  return (
    <PageWrapper>
      <DocumentTitle title={`Packstack | My Packs`}>
        <>
          <PageTitle>
            <h1>Packs</h1>
          </PageTitle>
          <PackList loading={packs.isLoading} packs={packs.data || []} />
        </>
      </DocumentTitle>
    </PageWrapper>
  )
}
