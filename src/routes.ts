import slugify from "slugify"

export const NEW = "new"

export const REGISTER = "/register"
export const LOGIN = "/"
export const REQUEST_RESET = "/request-reset"
export const RESET_PASSWORD = "/reset/:callbackId"

export const INVENTORY = "/inventory"
export const PACKS = "/packs"
export const SETTINGS = "/settings"
export const NEW_PACK = "/pack/new"
export const PACK_FORM = "/pack/:id"

export const getPackPath = (id: number, title: string): string => {
  const slug = slugify(title, { replacement: "-", lower: true })
  return `https://packstack.io/pack/${id}/${slug}`
}
