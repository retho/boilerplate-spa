import React from 'react';
import DevDemoRouter, {DevDemoRouterTab} from 'src/components/pages/DevDemoRouter';
import {devDemoPageQueryableInstance} from 'src/components/pages/DevDemoRouter/query';
import DevPage from 'src/components/pages/DevPage';
import {Redirect, stringifyRoute} from 'src/core/router';
import {createRouteRender, emptyQueryableInstance} from 'src/core/router/core';
import {routes} from 'src/router';

export const rootRender = createRouteRender(emptyQueryableInstance)(() => (
  <Redirect to={stringifyRoute(routes.dev, {}, null)} />
));

export const devRender = createRouteRender(emptyQueryableInstance)(() => <DevPage />);

export const devDemoRouterRender = createRouteRender(devDemoPageQueryableInstance)<{
  tab: DevDemoRouterTab;
}>(({tab}, query) => <DevDemoRouter tab={tab} query={query} />);
