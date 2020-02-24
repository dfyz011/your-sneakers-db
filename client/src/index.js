import React from "react";
import ReactDOM from "react-dom";
import { store } from "./store/storeConfig";
import { Provider } from "react-redux";
import App from "./containers/app";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		type:"dark"
	}
});

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<Provider store={store}>
			<App />
		</Provider>
    </ThemeProvider>,
	document.getElementById("root")
);
