import React, {FC, Fragment} from 'react';
import {routes} from 'router';
import {bem} from 'utils/bem';
import {nbsp} from 'utils/common';
import {stringifyRoute, useHistory} from 'utils/router';
import {QueryPayload} from './query';
import './styles.scss';

export enum DevDemoRouterTab {
  tab1 = 'tab1',
  tab2 = 'tab2',
  tab3 = 'tab3',
}

const bemRoot = bem(module.id, 'DevDemoRouter');
type Props = {
  tab: DevDemoRouterTab;
  query: QueryPayload;
};
const DevDemoRouter: FC<Props> = props => {
  const history = useHistory();

  const handleTabChange = (tab: DevDemoRouterTab) =>
    history.push(
      stringifyRoute(
        routes.devDemoRouter,
        {tab},
        {
          ...props.query,
        }
      )
    );
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    history.replace(
      stringifyRoute(
        routes.devDemoRouter,
        {tab: props.tab},
        {
          ...props.query,
          filters: {
            ...props.query.filters,
            search: e.target.value,
          },
        }
      )
    );
  };

  return (
    <div className={bemRoot()}>
      <div>
        <div>
          {Object.values(DevDemoRouterTab).map(t => (
            <button key={t} onClick={() => handleTabChange(t)} disabled={t === props.tab}>
              {t}
            </button>
          ))}
        </div>
        <label>search</label>
        <input value={props.query.filters.search} onChange={handleSearchChange} />
        <br />
        <a>#tag1</a>
        <a>#tag2</a>
        <a>#tag3</a>
        <br />
        <a>sort by &quot;a&quot;</a>
        <a>sort by &quot;b&quot;</a>
      </div>
      <div>
        activeTab={props.tab}
        <br />
        {JSON.stringify(props.query, null, 4)
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
