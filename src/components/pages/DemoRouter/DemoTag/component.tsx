import './styles.scss';

import React, {FC} from 'react';
import {bem} from 'src/core/bem';

const bemRoot = bem(module.id, 'DemoTag');
type Props = {
  name: string;
  active: boolean;
  onChange: (active: boolean) => void;
};
const DemoTag: FC<Props> = ({name, active, onChange}) => {
  const handleClick = () => onChange(!active);
  return (
    <a className={bemRoot({active})} onClick={handleClick}>
      #{name}
    </a>
  );
};

export default DemoTag;
