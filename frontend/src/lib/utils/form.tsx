import { Category } from 'types/category';
import { DurationUnit, Gender, WeightUnit, getGenderName } from "enums";

export const categoryOptions = (categories: Category[]) => categories.map(cat => ({ value: cat.id, label: cat.name }));
export const weightUnitOptions = () => Object.values(WeightUnit).map(unit => ({ value: unit, label: unit }));
export const durationUnitOptions = () => Object.values(DurationUnit).map(unit => ({ value: unit, label: unit }));
export const genderOptions = () => Object.values(Gender).map(unit => ({ value: unit, label: getGenderName(unit) }));
