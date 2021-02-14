// eslint-disable-next-line no-restricted-imports
import {withNaming, ClassNameFormatter} from '@bem-react/classname';

export const cn = (...args: (boolean | null | undefined | string)[]): string =>
  args.filter(x => x).join(' ');

type Initializer = (moduleId: string, blockName: string) => ClassNameFormatter;

const existingBlocks: Record<string, string> = {};
const rawInitializer = withNaming({n: '', e: '__', m: '--', v: '_'});
export const bem: Initializer =
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
