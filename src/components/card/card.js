import React from 'react'
import clsx from 'clsx';
import { useStyles } from '../../theme';

export function CardGroup( { columns = 1, children } ) {
  const classes = useStyles()
  const groupClass = clsx( 'o-card-group', columns > 1 && `o-card-group__column-${ columns }` );

  return (
    <div className={groupClass}>
      <div className={classes["o-card-group_cards"]}>{children}</div>
    </div>
  );
}

export const Card = ( { href = '#', title, icon, children, footer } ) => <article className='m-card'>
  <div className='m-card_heading m-card_background'>
    <a href={href}>
      <div className='header-alignment'>
        <div className='m-card_icon general' dangerouslySetInnerHTML={{ __html: icon }} />
        <div className='m-card_title'>{title}</div>
      </div>
    </a>
  </div>

  {children}

  {footer && <p className='m-card_footer'>{footer}</p>}
</article>;

