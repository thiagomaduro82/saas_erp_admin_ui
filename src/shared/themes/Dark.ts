import { createTheme } from "@mui/material";
import { cyan, green } from "@mui/material/colors";

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: green[700], 
            dark: green[900], 
            light: green[500], 
            contrastText: '#ffffff'
        }, 
        secondary: {
            main: cyan[500], 
            dark: cyan[400], 
            light: cyan[300], 
            contrastText: '#ffffff'
        }, 
        background: {
            paper: '#303134', 
            default: '#202124'
        }
    }, 
    typography: {
        allVariants: {
            color: 'whitesmoke'
        }
    }
});