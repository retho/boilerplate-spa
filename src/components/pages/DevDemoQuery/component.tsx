import React, {FC} from 'react';
import {routes} from 'router';
import {bem} from 'utils/bem';
import {stringifyRoute, useHistory} from 'utils/router';
import {QueryPayload} from './query';
import './styles.scss';

const bemRoot = bem(module.id, 'DevDemoQuery');
type DevDemoQueryProps = {
  query: QueryPayload;
};
const DevDemoQuery: FC<DevDemoQueryProps> = props => {
  const history = useHistory();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    history.replace(
      stringifyRoute(
        routes.devDemoQuery,
        {},
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

  const {filters} = props.query;
  return (
    <div className={bemRoot()}>
      <div>
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
      <div>{JSON.stringify(props.query)}</div>
    </div>
  );
};

export default DevDemoQuery;
