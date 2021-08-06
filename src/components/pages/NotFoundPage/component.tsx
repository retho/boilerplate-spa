import React, {FC} from 'react';
import {bem} from 'src/utils/bem';
import './styles.scss';

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
