import BaseApi from './base-api';
import { TokenInterface } from 'lib/jwt';
import { default as BaseApiInterface } from 'types/api/base';

import { UserService as UserServiceInterface } from 'types/api/user';
import { ItemService as ItemServiceInterface } from 'types/api/item';
import { PackService as PackServiceInterface } from 'types/api/pack';

import { default as User } from './user';
import { default as Item } from './item';
import { default as Pack } from './pack';


export default class Api {
    UserService: UserServiceInterface;
    ItemService: ItemServiceInterface;
    PackService: PackServiceInterface;

    private api: BaseApiInterface;

    constructor(jwt: TokenInterface) {
        this.api = new BaseApi(jwt);

        this.UserService = new User(this.api);
        this.ItemService = new Item(this.api);
        this.PackService = new Pack(this.api);
    }
}
