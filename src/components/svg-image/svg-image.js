import React from 'react'
// export const SvgImage = ( { src, ...props } ) => <img src={`data:image/svg+xml;base64,${ btoa( src ) }`} {...props} />;
export const SvgImage = ( { src, ...props } ) => <img src={src} {...props} />;
// export const SvgSpan = ( { src, ...props } ) => <span {...props} dangerouslySetInnerHTML={{ __html: src }} />;
export const SvgSpan = ( { src, ...props } ) => <span {...props}><img src={src} /></span>;
export default SvgImage;
