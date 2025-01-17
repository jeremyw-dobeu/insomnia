import classnames from 'classnames';
import React, { FC, ReactNode, useCallback } from 'react';

import { clickLink } from '../../../common/electron-helpers';

interface Props {
  href: string;
  title?: string;
  button?: boolean;
  onClick?: (...args: any[]) => any;
  className?: string;
  children?: ReactNode;
  noTheme?: boolean;
}

export const Link: FC<Props> = ({
  onClick,
  button,
  href,
  children,
  className,
  noTheme,
  ...other
}) => {
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e?.preventDefault();
    onClick?.(e); // Also call onClick that was passed to us if there was one
    clickLink(href);
  }, [onClick, href]);

  if (button) {
    return (
      <button onClick={handleClick} className={className} {...other}>
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={classnames(className, {
        'theme--link': !noTheme,
      })}
      {...other}
    >
      {children}
    </a>
  );
};
