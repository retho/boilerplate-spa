import React from 'react';
import {createRouteRender, emptyQueryableInstance} from 'utils/router/core';
import DevDemoRouter, {DevDemoRouterTab} from 'components/pages/DevDemoRouter';
import DevPage from 'components/pages/DevPage';
import {devDemoPageQueryableInstance} from 'components/pages/DevDemoRouter/query';

export const devRender = createRouteRender(emptyQueryableInstance)(() => <DevPage />);

export const devDemoRouterRender = createRouteRender(devDemoPageQueryableInstance)<{
  tab: DevDemoRouterTab;
}>(({tab}, query) => <DevDemoRouter tab={tab} query={query} />);
