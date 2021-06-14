import React, {ReactElement} from 'react';
import './styles.scss';
import {ReactComponent as IconSort} from './assets/iconSort.svg';
import {ReactComponent as IconSortDown} from './assets/iconSortDown.svg';
import {ReactComponent as IconSortUp} from './assets/iconSortUp.svg';
import {bem} from 'utils/bem';

export type DemoSort<F extends string> = {
  field: F;
  desc: boolean;
};
const bemRoot = bem(module.id, 'DemoSorter');

type Props<F extends string> = {
  title: string;
  field: F;
  value: null | DemoSort<F>;
  onChange: (val: null | DemoSort<F>) => void;
  defaultDesc?: boolean;
};
const DemoSorter = <F extends string>(props: Props<F>): ReactElement => {
  const renderIcon = () => {
    if (props.value?.field !== props.field) return <IconSort className={bemRoot('icon')} />;
    if (props.value.desc) return <IconSortDown className={bemRoot('icon')} />;
    return <IconSortUp className={bemRoot('icon')} />;
  };

  const defaultDesc = props.defaultDesc || true;

  const handleClick = () => {
    if (props.field !== props.value?.field)
      return props.onChange({field: props.field, desc: defaultDesc});
    if (props.value.desc === defaultDesc)
      return props.onChange({field: props.field, desc: !props.value.desc});
    return props.onChange(null);
  };

  return (
    <div className={bemRoot()} onClick={handleClick}>
      <div className={bemRoot('icon-wrapper')}>{renderIcon()}</div>
      <div className={bemRoot('title')}>{props.title}</div>
    </div>
  );
};

export default DemoSorter;
