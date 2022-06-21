import { DefaultTheme } from "@react-navigation/native";
import colors from "./colors";

const navigationTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.primary
    }
}

export default navigationTheme;