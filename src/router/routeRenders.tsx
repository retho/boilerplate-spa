import React from 'react';
import {Redirect, stringifyRoute} from 'src/utils/router';
import {createRouteRender, emptyQueryableInstance} from 'src/utils/router/core';
import DevDemoRouter, {DevDemoRouterTab} from 'src/components/pages/DevDemoRouter';
import DevPage from 'src/components/pages/DevPage';
import {devDemoPageQueryableInstance} from 'src/components/pages/DevDemoRouter/query';
import {routes} from 'src/router';

export const rootRender = createRouteRender(emptyQueryableInstance)(() => (
  <Redirect to={stringifyRoute(routes.dev, {}, null)} />
));

export const devRender = createRouteRender(emptyQueryableInstance)(() => <DevPage />);

export const devDemoRouterRender = createRouteRender(devDemoPageQueryableInstance)<{
  tab: DevDemoRouterTab;
}>(({tab}, query) => <DevDemoRouter tab={tab} query={query} />);
