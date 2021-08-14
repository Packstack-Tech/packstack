export enum WeightUnit {
    OUNCES = 'oz',
    POUNDS = 'lbs',
    GRAMS = 'g',
    KILOGRAMS = 'kg'
}

export enum DurationUnit {
    DAYS = 'Days',
    WEEKS = 'Weeks',
    MONTHS = 'Months'
}

export enum Gender {
    UNSPECIFIED = 'u',
    MALE = 'm',
    FEMALE = 'f'
}

export enum CatLevel {
    USER = 'USER',
    SYSTEM = 'SYSTEM'
}

export const getGenderName = (gender?: Gender): string => {
    switch (gender) {
        case Gender.MALE:
            return 'Male';
        case Gender.FEMALE:
            return 'Female';
        case Gender.UNSPECIFIED:
            return 'Unspecified';
        default:
            return '';
    }
};