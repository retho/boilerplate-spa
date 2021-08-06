import React, {FC} from 'react';
import {routes} from 'src/router';
import {bem} from 'src/utils/bem';
import './styles.scss';

const root = bem(module.id, 'DevPage');
const DevPage: FC = () => {
  return (
    <div className={root()}>
      <ul>
        {Object.values(routes)
          .filter(x => x.pattern.startsWith('/dev') && x.pattern !== routes.dev.pattern)
          .map(r => (
            <li key={r.pattern}>
              <a href={r.pattern}>{r.pattern}</a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DevPage;
