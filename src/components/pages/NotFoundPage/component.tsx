import './styles.scss';

import React, {FC} from 'react';
import {bem} from 'src/core/bem';

const root = bem(module.id, 'NotFoundPage');
const NotFoundPage: FC = () => {
  return (
    <main className={root()}>
      <section>
        <span>404</span>
        <p>The requested path could not be found</p>
      </section>
    </main>
  );
};

export default NotFoundPage;
