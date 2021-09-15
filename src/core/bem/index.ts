import {BemFormatter, genBemFormatter} from './core';

type Initializer = (moduleId: ModuleId, blockName: string) => BemFormatter;

const getBem = (): Initializer => {
  const existingBlocks: Record<string, ModuleId> = {};
  const rawInitializer = genBemFormatter({n: '', e: '__', m: '--', v: '_'});

  const bem: Initializer =
    process.env.NODE_ENV === 'production'
      ? (_, blockName) => rawInitializer(blockName)
      : (moduleId, blockName) => {
          const otherModuleId = existingBlocks[blockName];
          if (otherModuleId && otherModuleId !== moduleId)
            throw new Error(
              `bem-block with name '${blockName}' already exists: ${moduleId} ${otherModuleId}`
            );
          existingBlocks[blockName] = moduleId;
          return rawInitializer(blockName);
        };
  return bem;
};

export const bem: Initializer = getBem();

export const cn = (...args: (boolean | null | undefined | string)[]): string =>
  args.filter(x => x).join(' ');
