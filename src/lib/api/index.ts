import BaseApi from "./base-api"
import { TokenInterface } from "lib/jwt"
import { default as BaseApiInterface } from "types/api/base"

import { ItemService as ItemServiceInterface } from "types/api/item"
import { PackService as PackServiceInterface } from "types/api/pack"

import { default as Item } from "./item"
import { default as Pack } from "./pack"

export default class Api {
  ItemService: ItemServiceInterface
  PackService: PackServiceInterface

  private api: BaseApiInterface

  constructor(jwt: TokenInterface) {
    this.api = new BaseApi(jwt)

    this.ItemService = new Item(this.api)
    this.PackService = new Pack(this.api)
  }
}
