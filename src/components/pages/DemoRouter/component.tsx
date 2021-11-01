import './styles.scss';

import React, {FC, Fragment} from 'react';
import {bem} from 'src/core/bem';
import {stringifyRoute, useHistory} from 'src/core/router';
import {nbsp} from 'src/core/utils';
import {routes} from 'src/router';

import DemoSorter, {DemoSort} from './DemoSorter';
import {QueryPayload} from './query';

export enum DemoRouterPageTab {
  tab1 = 'first-tab',
  tab2 = 'second-tab',
  tab3 = 'third-tab',
}

const bemRoot = bem(module.id, 'DevDemoRouter');
type Props = {
  tab: DemoRouterPageTab;
  query: QueryPayload;
};
const DevDemoRouter: FC<Props> = ({tab, query}) => {
  const history = useHistory();

  const handleTabChange = (newTab: DemoRouterPageTab) =>
    history.push(
      stringifyRoute(
        routes.devDemoRouter,
        {tab: newTab},
        {
          ...query,
        }
      )
    );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    history.replace(
      stringifyRoute(
        routes.devDemoRouter,
        {tab},
        {
          ...query,
          filters: {
            ...query.filters,
            search: e.target.value,
          },
        }
      )
    );
  };
  const handleSortChange = (sort: null | DemoSort<'a' | 'b'>) => {
    history.replace(
      stringifyRoute(
        routes.devDemoRouter,
        {tab},
        {
          ...query,
          sort,
        }
      )
    );
  };

  return (
    <div className={bemRoot()}>
      <div className={bemRoot('controls')}>
        <div>
          {Object.values(DemoRouterPageTab).map(t => (
            <button key={t} onClick={() => handleTabChange(t)} disabled={t === tab}>
              {t}
            </button>
          ))}
        </div>
        <label>search</label>
        <input value={query.filters.search} onChange={handleSearchChange} />
        <br />
        <a>#tag1</a>
        <a>#tag2</a>
        <a>#tag3</a>
        <br />
        <DemoSorter title="a" field="a" value={query.sort} onChange={handleSortChange} />
        <DemoSorter title="b" field="b" value={query.sort} onChange={handleSortChange} />
      </div>
      <div className={bemRoot('preview')}>
        activeTab={tab}
        <br />
        {JSON.stringify(query, null, 4)
          .replaceAll(' ', nbsp)
          .split('\n')
          .map((x, ix) => (
            <Fragment key={ix}>
              {x}
              <br />
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default DevDemoRouter;
