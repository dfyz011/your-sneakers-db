import React, { Component } from "react";
import SneakersContainer from "./sneakersContainer";
import UserContainer from "./userContainer";
import AlertContainer from "./alertContainer";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { getUserByToken } from "../actions/userActions";

class App extends Component {
	componentDidMount = () => {
		this.props.getUserByToken();
	};
	render() {
		return (
			<Box>
				<AppBar color="primary" position="static">
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center"
					>
						<Grid item>
							<Typography variant="h6" style={{ flexGrow: 1, marginLeft: 10 }}>
								Мои кроссовки
							</Typography>
						</Grid>
						<Grid item>
							<UserContainer />
						</Grid>
					</Grid>
				</AppBar>
				<SneakersContainer />
				<AlertContainer />
			</Box>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	getUserByToken: () => dispatch(getUserByToken())
});
export default connect(null, mapDispatchToProps)(App);
