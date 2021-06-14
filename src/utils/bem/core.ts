import {compact} from 'lodash-es';

type Preset = {
  n?: string;
  e?: string;
  m?: string;
  v?: string;
};

type BemModifiers = Record<string, boolean | string | string[]>;
type BemFormatterBlock = (modifiers?: BemModifiers) => string;
type BemFormatterElem = (elem: string, modifiers?: BemModifiers) => string;
export type BemFormatter = BemFormatterBlock & BemFormatterElem;

export const genBemFormatter = (preset: Preset) => (blockName: string): BemFormatter => (
  elemOrMods?: string | BemModifiers,
  argMods?: BemModifiers
) => {
  const blockOrElemName =
    preset.n + blockName + (typeof elemOrMods === 'string' ? preset.e + elemOrMods : '');
  const modifiers = typeof elemOrMods === 'string' ? argMods : elemOrMods;

  const modClassNames =
    modifiers &&
    Object.keys(modifiers)
      .map(mod => {
        const classNameWithModifier = blockOrElemName + preset.m + mod;
        const value = modifiers[mod];
        if (value === false) return [];
        if (value === true) {
          return [classNameWithModifier];
        }
        const vals = Array.isArray(value) ? value : [value];

        return compact(vals.map(v => v && classNameWithModifier + preset.v + v));
      })
      .flat();

  const classNames: string[] = [blockOrElemName, ...(modClassNames || [])];

  return classNames.join(' ');
};
