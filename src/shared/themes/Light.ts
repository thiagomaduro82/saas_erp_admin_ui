import { createTheme } from "@mui/material";
import { cyan, green } from "@mui/material/colors";

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: green[700], 
            dark: green[900], 
            light: green[500], 
            contrastText: '#ffffff'
        }, 
        secondary: {
            main: cyan[700], 
            dark: cyan[900], 
            light: cyan[500], 
            contrastText: '#ffffff'
        }, 
        background: {
            paper: '#ffffff', 
            default: '#f7f6f3'
        }
    }
});