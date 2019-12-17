export function unitConversion(unit) {
    const u = unit.toLowerCase();
    const grams = ['grams', 'gram', 'g'];
    const pounds = ['pounds', 'pound', 'lbs', 'lb'];
    const ounces = ['ounces', 'ounce', 'oz', 'o'];
    const kilograms = ['kilograms', 'kilogram', 'kg'];

    if (grams.includes(u)) {
        return 'g';
    }

    if (pounds.includes(u)) {
        return 'lbs';
    }

    if (ounces.includes(u)) {
        return 'oz';
    }

    if (kilograms.includes(u)) {
        return 'kg';
    }

    return null;
}