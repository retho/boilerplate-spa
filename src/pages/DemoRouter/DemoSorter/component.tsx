import './styles.scss';

import React, {ReactElement} from 'react';
import {bem} from 'src/core/bem';
import {Queryable} from 'src/core/router';

import {ReactComponent as IconSort} from './assets/iconSort.svg';
import {ReactComponent as IconSortDown} from './assets/iconSortDown.svg';
import {ReactComponent as IconSortUp} from './assets/iconSortUp.svg';

export type DemoSort<F extends string> = {
  field: F;
  desc: boolean;
};
export const iqDemoSort = <F extends string>(): Queryable<null | DemoSort<F>> => ({
  fromQuery: query => {
    const [field] = query.sortBy || [];
    const [sortDir] = query.sortDir || [];
    const desc = sortDir === 'desc';
    return (field && sortDir && {field: field as F, desc}) || null;
  },
  toQuery: val => {
    if (!val) return {};
    const {field, desc} = val;

    return {
      sortBy: [field],
      sortDir: [desc ? 'desc' : 'asc'],
    };
  },
});

const bemRoot = bem(module.id, 'DemoSorter');
type Props<F extends string> = {
  title: string;
  field: F;
  value: null | DemoSort<F>;
  onChange: (val: null | DemoSort<F>) => void;
  defaultDesc?: boolean;
};
const DemoSorter = <F extends string>({
  title,
  field,
  value,
  onChange,
  defaultDesc = true,
}: Props<F>): ReactElement => {
  const renderIcon = () => {
    if (value?.field !== field) return <IconSort className={bemRoot('icon')} />;
    if (value.desc) return <IconSortDown className={bemRoot('icon')} />;
    return <IconSortUp className={bemRoot('icon')} />;
  };

  const handleClick = () => {
    if (field !== value?.field) return onChange({field: field, desc: defaultDesc});
    if (value.desc === defaultDesc) return onChange({field: field, desc: !value.desc});
    return onChange(null);
  };

  return (
    <div className={bemRoot()} onClick={handleClick}>
      <div className={bemRoot('icon-wrapper')}>{renderIcon()}</div>
      <div className={bemRoot('title')}>{title}</div>
    </div>
  );
};

export default DemoSorter;
