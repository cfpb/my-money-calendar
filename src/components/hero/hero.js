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

  let top_image
  let side_image 
  if(window.screen.width < 600) {
    top_image = (
      <div className={classes['m-hero_image-wrapper'] = ' hero_image_top'}>
        <div className='m-hero_image'>
          {imageTag}
        </div>
      </div>
    )
  } else {
    side_image = (
      <div className={classes['m-hero_image-wrapper']}>
        <div className='m-hero_image'>
          {imageTag}
        </div>
      </div>
    )
  }

  return (
    <section className={classes['m-hero']}>
      {top_image}
      <div className={classes['m-hero_wrapper']}>
        <div className={classes['m-hero_text']}>
          <h1 className={classes["m-hero_heading"]}>{title}</h1>
          <div className={classes['m-hero_subhead']}>{subtitle}</div>
        </div>
        {side_image}
      </div>
    </section>
  );
};

export default Hero;
