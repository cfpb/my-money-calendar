import { createMuiTheme, createStyles, makeStyles } from "@material-ui/core";

// Variables
const primaryColor = '#20aa3f'
const secondaryColor = '#0072ce'
const warnColor = '#d14124'

// Theme Objeect
const customTheme = {
    palette: {
        primary:{
            main: primaryColor
        },
        secondary:{
            main: secondaryColor
        },
        warning: {
            main: warnColor
        },
        error: {
            main: warnColor
        },
    },
    typography: {
        fontFamily: '"Avenir Next"',
        body1:{
            fontSize: '1rem',
        },
        h2: {
            fontSize: '4rem'
        },
        h5: {
            fontSize: '1.8rem'
        }
    },
    spacing: 6,
    overrides: {
    }
}

const stylesObject = {
      'app': {
        'margin-bottom': '3rem'
      },
      'content_wrapper': {
        'max-width': '1200px',
        'padding': '15px',
        'margin': '0 auto',
        'clear': 'both'
      },
      'm-hero': {
        'background-color': '#f7f8f9',
        'display': 'block',
        'max-width': '100%'
      },
      'm-hero_heading': {
        'margin-bottom': '.44117647em',
        'font-size': '2.125em',
        'font-weight': 'normal',
        'letter-spacing': 'inherit',
        'line-height': '1.25',
        'text-transform': 'inherit'
      },
      'm-hero_text': {
        'display': 'block',
        'margin': 'auto',
        'flex': '1'
      },
      'm-hero_wrapper': {
        'padding': '.9375em 2.8125em',
        'min-height': '195px',
        'display': 'flex'
      },
      'm-hero_subhead': {
        'font-size': '22px',
        'line-height': '1.25',
      },
      'o-footer': {
        'padding-bottom': '5.125rem !important'
      },
      'hero-image': {
        'max-height': '46vw',
        'max-height': '240px',
        // @media screen and (min-width: 600px) {
        //   max-height: 240px;
        // }
      },
      'm-hero_image-wrapper': {
        'flex': '1'
      },
      'no-underline': {
          'text-decoration': 'none'
      },
      'wizard-step-image': {
        'display': 'flex',
        'flex-flow': 'row nowrap',
        'justify-content': 'center',
        'align-items': 'center',
        'margin': '0 auto',
        'margin-bottom': '1.5rem',
        'max-width': '100%',
        'justify-content': 'flex-start'
      },
      'wizard-step-image-asset': {
        'max-width': '40%'
      },
      'wizard-field': {
        'padding-bottom': '1rem',
        'border-bottom': '1px solid #adb9c5'
      },
      'wizard-field-last': {
        'margin-top': '1rem;',
        'padding-bottom': '1rem',
      },
      'flex-end': {
        'justify-content': 'flex-end'
      },
}

export const useStyles = makeStyles(() =>
    createStyles(stylesObject),
);

export const theme = createMuiTheme(customTheme)

