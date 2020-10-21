import { createMuiTheme, createStyles, makeStyles } from "@material-ui/core";

// Variables
const primaryColor = '#20aa3f'
const secondaryColor = '#005e5d'
const warnColor = '#FF0000'

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
        }
    },
    typography: {
        fontFamily: '"Avenir Next",Arial,sans-serif',
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
}

const stylesObject = {

}

export const useStyles = makeStyles(() =>
    createStyles(stylesObject),
);

export const theme = createMuiTheme(customTheme)

