/* eslint-disable */

type ModuleId = string & {__brand: 'ModuleId'};

interface NodeModule extends __WebpackModuleApi.Module {
  id: ModuleId;
}
declare var module: NodeModule;
