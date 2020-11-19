import React from 'react'
export const ButtonIcon = ( { side = 'left', icon } ) => <span className={`a-btn_icon a-btn_icon__on-${ side }`} dangerouslySetInnerHTML={{ __html: icon }}></span>;

