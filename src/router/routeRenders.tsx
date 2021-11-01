import React from 'react';
import DevPage from 'src/components/pages/DemoPage';
import DevDemoRouter, {DevDemoRouterTab} from 'src/components/pages/DemoRouter';
import {devDemoPageQueryableInstance} from 'src/components/pages/DemoRouter/query';
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
