import React from 'react'
import {useStyles} from '../../theme'
const Hero = ( { title, subtitle, isSVG = false, image, alt = '' } ) => {
  const classes = useStyles()
  let imageTag;

  if ( isSVG && typeof image === 'string' ) {
    imageTag = <img src={`data:image/svg+xml;base64,${ btoa( image ) }`} className={'u-hide-on-print ' + classes['hero-image']} />;
  } else if ( typeof image === 'string' ) {
    imageTag = <img src={image} alt={alt} className={'u-hide-on-print ' + classes['hero-image']} />;
  } else {
    imageTag = image;
  }

  return (
    <section className={classes['m-hero']}>
      <div className={classes['m-hero_wrapper']}>
        <div className={classes['m-hero_text']}>
          <h1 className={classes["m-hero_heading"]}>{title}</h1>
          <div className={classes['m-hero_subhead']}>{subtitle}</div>
        </div>
        <div className='m-hero_image-wrapper'>
          <div className='m-hero_image' style={{ textAlign: 'center' }}>
            {imageTag}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
