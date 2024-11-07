import { createTheme } from "@mui/material";
import { blue, green } from "@mui/material/colors";

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: green[700], 
            dark: green[900], 
            light: green[500], 
            contrastText: '#ffffff'
        }, 
        secondary: {
            main: blue[700], 
            dark: blue[900], 
            light: blue[500], 
            contrastText: '#ffffff'
        }, 
        background: {
            paper: '#ffffff', 
            default: '#f7f6f3'
        }
    }
});