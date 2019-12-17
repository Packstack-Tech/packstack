import slugify from 'slugify';

export const HOME = '/';
export const NEW = 'new';

export const REGISTER = '/register';
export const LOGIN = '/login';
export const REQUEST_RESET = '/request-reset';
export const RESET_PASSWORD = '/reset/:callbackId';

export const INVENTORY = '/inventory';
export const NEW_PACK = `/pack/${NEW}`;
export const PROFILE = '/profile';
export const PACK_FORM = '/pack/:id';
export const PACK = '/:id/:slug?';

export const getPackPath = (id: number, title: string): string => {
    const slug = slugify(title, { replacement: '-', lower: true });
    return `/${id}/${slug}`;
};