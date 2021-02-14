import React from 'react';
import {Empty, createRouteRender, emptyQueryableInstance} from 'utils/router/core';
import DevDemoQuery from 'components/pages/DevDemoQuery';
import DevPage from 'components/pages/DevPage';
import {devDemoPageQueryableInstance} from 'components/pages/DevDemoQuery/query';

export const devRender = createRouteRender(emptyQueryableInstance)<Empty>(() => <DevPage />);

export const devDemoQueryRender = createRouteRender(devDemoPageQueryableInstance)<Empty>(
  (_, query) => <DevDemoQuery query={query} />
);
