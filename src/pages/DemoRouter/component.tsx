import './styles.scss';

import React, {FC, Fragment} from 'react';
import {bem} from 'src/core/bem';
import {stringifyRoute, useHistory, useLocation} from 'src/core/router';
import {nbsp} from 'src/core/utils';
import {routes} from 'src/router';

import DemoSorter, {DemoSort} from './DemoSorter';
import DemoTag from './DemoTag';
import {QueryPayload} from './query';

export enum DemoRouterPageTab {
  tab1 = 'first-tab',
  tab2 = 'second-tab',
  tab3 = 'third-tab',
}

const tags = ['tag1', 'tag2', 'tag3'];

const bemRoot = bem(module.id, 'DemoRouter');
type Props = {
  tab: DemoRouterPageTab;
  query: QueryPayload;
};
const DevDemoRouter: FC<Props> = ({tab, query}) => {
  const location = useLocation();
  const history = useHistory();

  const handleTabChange = (newTab: DemoRouterPageTab) =>
    history.push(
      stringifyRoute(
        routes.demoRouter,
        {tab: newTab},
        {
          ...query,
        }
      )
    );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    history.replace(
      stringifyRoute(
        routes.demoRouter,
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
        routes.demoRouter,
        {tab},
        {
          ...query,
          sort,
        }
      )
    );
  };

  const handleToggleTag = (tag: string) => (active: boolean) => {
    history.replace(
      stringifyRoute(
        routes.demoRouter,
        {tab},
        {
          ...query,
          filters: {
            ...query.filters,
            tags: active ? [...query.filters.tags, tag] : query.filters.tags.filter(t => t !== tag),
          },
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
        <br />
        <label>search {nbsp}</label>
        <input value={query.filters.search} onChange={handleSearchChange} />
        <br />
        <br />
        <div className={bemRoot('tags')}>
          {tags.map(t => (
            <DemoTag
              key={t}
              name={t}
              active={query.filters.tags.includes(t)}
              onChange={handleToggleTag(t)}
            />
          ))}
        </div>
        <br />
        <DemoSorter title="a" field="a" value={query.sort} onChange={handleSortChange} />
        <DemoSorter title="b" field="b" value={query.sort} onChange={handleSortChange} />
      </div>
      <div className={bemRoot('preview')}>
        {decodeURIComponent(location.search)}
        <br />
        <br />
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
