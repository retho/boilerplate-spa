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
  const classNames: string[] = [blockOrElemName];

  for (const mod in modifiers) {
    const classNameWithModifier = blockOrElemName + preset.m + mod;
    const value = modifiers[mod];
    if (value === false) continue;
    if (value === true) {
      classNames.push(classNameWithModifier);
      continue;
    }
    const vals = Array.isArray(value) ? value : [value];

    vals.forEach(v => v && classNames.push(classNameWithModifier + preset.v + v));
  }

  return classNames.join(' ');
};
