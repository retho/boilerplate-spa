import React, {FC} from 'react';
import {routes} from 'router';
import {bem} from 'utils/bem';
import {stringifyRoute, useHistory} from 'utils/router';
import {QueryPayload} from './query';
import './styles.scss';

const root = bem(module.id, 'DevDemoQuery');
type DevDemoQueryProps = {
  query: QueryPayload;
};
const DevDemoQuery: FC<DevDemoQueryProps> = props => {
  const history = useHistory();
  const {filters} = props.query;

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

  return (
    <div className={root()}>
      <input value={filters.search} onChange={handleSearchChange} />
      {JSON.stringify(props.query)}
    </div>
  );
};

export default DevDemoQuery;
