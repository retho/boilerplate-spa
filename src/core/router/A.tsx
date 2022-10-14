import React, {MouseEvent, useCallback} from 'react';
import {useHistory} from 'src/core/router/react';

import {Href} from './core';

type OnClickType = (event: React.MouseEvent<HTMLAnchorElement>) => void;

const getClickHandler = (
  history: ReturnType<typeof useHistory>,
  href?: Href,
  onClick?: OnClickType
) => (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  if (href) {
    history.push(href);
  }
  if (onClick) onClick(e);
};

type Props = {href: Href} & React.AnchorHTMLAttributes<HTMLAnchorElement>;
const A: React.ForwardRefRenderFunction<HTMLAnchorElement, Props> = (
  {href, onClick, target, ...restProps},
  ref
) => {
  const history = useHistory();
  const handleClick = useCallback(getClickHandler(history, href, onClick), [href, onClick]);

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel="noopener noreferrer"
      onClick={target !== '_blank' ? handleClick : undefined}
      {...restProps}
    />
  );
};

export default React.forwardRef(A);
