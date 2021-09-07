import { useQuery, useMutation, useQueryClient } from "react-query"
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  uploadCsv,
} from "api/api"
import { CreateItem, UpdateItem } from "types/item"

const ITEMS_QUERY = "items-query"
export const useItemsQuery = () => {
  return useQuery(
    ITEMS_QUERY,
    async () => {
      const resp = await fetchItems()
      return resp.data
    },
    {
      refetchOnMount: true,
    }
  )
}

export const useCreateItem = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: CreateItem) => {
      const resp = await createItem(params)
      return resp.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(ITEMS_QUERY)
      },
    }
  )
}

export const useUpdateItem = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: UpdateItem) => {
      const resp = await updateItem(params)
      return resp.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(ITEMS_QUERY)
      },
    }
  )
}

export const useDeleteItem = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: { id: number }) => {
      const resp = await deleteItem(params.id)
      return resp.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(ITEMS_QUERY)
      },
    }
  )
}

export const useUploadCsv = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: { file: FormData }) => {
      const resp = await uploadCsv(params.file)
      return resp.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(ITEMS_QUERY)
      },
    }
  )
}
