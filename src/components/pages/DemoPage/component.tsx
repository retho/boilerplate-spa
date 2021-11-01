import './styles.scss';

import React, {FC} from 'react';
import {bem} from 'src/core/bem';
import {routes} from 'src/router';

const root = bem(module.id, 'DevPage');
const DevPage: FC = () => {
  return (
    <div className={root()}>
      <ul>
        {Object.values(routes)
          .filter(x => x.pattern.startsWith('/demo') && x.pattern !== routes.demo.pattern)
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
