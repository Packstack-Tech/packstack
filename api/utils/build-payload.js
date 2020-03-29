import models from '../models';

const sanitizeRequest = (request, attributes) => {
    const { id, ...payload } = request;
    Object.keys(payload).forEach(key => {
        if (!attributes.includes(key)) {
            delete payload[key]
        }
    });

    return { id, payload };
};

export const itemPayload = (request) => {
    const itemAttrs = Object.keys(models.Item.rawAttributes);
    return sanitizeRequest(request, itemAttrs)
};

export const packPayload = (request) => {
    const packAttrs = Object.keys(models.Pack.rawAttributes);
    let { id, payload } = sanitizeRequest(request, packAttrs);

    payload = { ...payload, gender: payload.gender && payload.gender === 'u' ? null : payload.gender };

    const items = Object.assign([], request.items);
    const payloadWithItems = Object.assign(payload, { items });

    return { id, payload: payloadWithItems }
};

export const packItemPayload = (request) => {
    const packItemAttrs = Object.keys(models.PackItem.rawAttributes);
    return sanitizeRequest(request, packItemAttrs);
};

export function csvItems(items) {
    return items.map(item => {
        const { name, product_name, weight, weight_unit, price, Category: { name: category } } = item;
        return { name, product_name, category, weight, weight_unit, price };
    })
}