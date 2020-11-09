import React from 'react'
import clsx from 'clsx';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { arrowLeft, arrowRight } from '../../lib/icons';

const ButtonIcon = ( { side = 'left', icon } ) => <span className={`a-btn_icon a-btn_icon__on-${ side }`} dangerouslySetInnerHTML={{ __html: icon }}></span>;
export const ButtonGroup = ( { children } ) => <div className='m-btn-group'>{children}</div>;

export function Button( {
  as = 'button',
  fullWidth = false,
  className = '',
  variant = 'primary',
  disabled = false,
  link = false,
  icon = null,
  iconSide = 'left',
  children,
  ...btnProps
} ) {
  const TagName = as;
  const classes = clsx( className, 'a-btn', {
    'a-btn__strategy': variant === 'strategy',
    'a-btn__secondary': variant === 'secondary',
    'a-btn__warning': variant === 'warning',
    'a-btn__disabled': disabled,
    'a-btn__super': variant === 'super',
    'a-btn__full-on-xs': fullWidth,
    'a-btn__link': link
  } );

  const btnIcon = icon ? <ButtonIcon icon={icon} side={iconSide} /> : null;

  return (
    <TagName {...btnProps} className={classes} disabled={disabled}>
      {icon && iconSide === 'left' && btnIcon}
      {children}
      {icon && iconSide === 'right' && btnIcon}
    </TagName>
  );
}

export function ButtonLink( { to, ...props } ) {
  const history = useHistory();
  const onClick = useCallback(
    evt => {
      evt.preventDefault();
      history.push( to );
    },
    [ history, to ]
  );

  return <Button {...props} onClick={onClick} />;
}

export const BackButton = ( { children, ...props } ) => <Button {...props} icon={arrowLeft} iconSide='left'>
  {children}
</Button>;
export const NextButton = ( { children, ...props } ) => <Button {...props} icon={arrowRight} iconSide='right'>
  {children}
</Button>;
export default Button;
