import React, {FC} from 'react';
import {routes} from 'router';
import {bem} from 'utils/bem';
import {stringifyRoute, useHistory} from 'utils/router';
import {QueryPayload} from './query';
import './styles.scss';

export enum DevDemoRouterTab {
  tab1 = 'tab1',
  tab2 = 'tab2',
  tab3 = 'tab3',
}

const bemRoot = bem(module.id, 'DevDemoRouter');
type DevDemoRouterProps = {
  tab: DevDemoRouterTab;
  query: QueryPayload;
};
const DevDemoRouter: FC<DevDemoRouterProps> = props => {
  const history = useHistory();

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

  const {filters} = props.query;
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
        <input value={filters.search} onChange={handleSearchChange} />
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
        {JSON.stringify(props.query)}
      </div>
    </div>
  );
};

export default DevDemoRouter;
