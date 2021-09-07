import {
  fetchPack,
  fetchPacks,
  createPack,
  updatePack,
  deletePack,
  addPackItem,
  removePackItem,
  copyPack,
} from "api/api"
import { useMutation, useQuery, useQueryClient } from "react-query"

import { NewPackItem } from "types/item"
import { CreatePack, UpdatePack } from "types/pack"

const PACK_QUERY = "pack-query"
export const usePackQuery = (id?: number) => {
  return useQuery(
    [PACK_QUERY, id],
    async () => {
      const resp = await fetchPack(id || 0)
      return resp.data
    },
    {
      enabled: !!id,
    }
  )
}

const PACKS_QUERY = "packs-query"
export const usePacksQuery = (userId: number) => {
  return useQuery(
    PACKS_QUERY,
    async () => {
      const resp = await fetchPacks(userId)
      return resp.data
    },
    {
      refetchOnMount: true,
    }
  )
}

export const useCreatePack = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: CreatePack) => {
      const resp = await createPack(params)
      return resp.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PACKS_QUERY)
      },
    }
  )
}

export const useUpdatePack = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: UpdatePack) => {
      const resp = await updatePack(params)
      return resp.data
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([PACK_QUERY, data.id])
      },
    }
  )
}

export const useDeletePack = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: { id: number }) => {
      const resp = await deletePack(params.id)
      return resp.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PACKS_QUERY)
      },
    }
  )
}

export const useCopyPack = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: { id: number }) => {
      const resp = await copyPack(params.id)
      return resp.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PACKS_QUERY)
      },
    }
  )
}

export const useAddPackItem = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: NewPackItem) => {
      const resp = await addPackItem(params)
      return resp.data
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([PACK_QUERY, data.packId])
      },
    }
  )
}

export const useRemovePackItem = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: { packId: number; itemId: number }) => {
      const resp = await removePackItem(params.packId, params.itemId)
      return resp.data
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([PACK_QUERY, data])
      },
    }
  )
}
