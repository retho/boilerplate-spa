import './styles.scss';

import React, {FC} from 'react';
import {bem} from 'src/core/bem';
import {routes} from 'src/router';

const root = bem(module.id, 'DevPage');
const DevPage: FC = () => {
  const demoPattern = routes.demo.pattern;

  return (
    <div className={root()}>
      <ul>
        {Object.values(routes)
          .filter(x => x.pattern.startsWith(demoPattern) && x.pattern !== demoPattern)
          .map(r => (
            <li key={r.pattern}>
              <a href={r.pattern.replaceAll(':', '_')}>{r.pattern}</a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DevPage;
