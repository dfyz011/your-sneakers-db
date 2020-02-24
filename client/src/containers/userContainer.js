import React, { Component } from "react";
import { connect } from "react-redux";
import { User } from "../components/userComponent";
import UserForm from "../components/userFormComponent";
import { login, signup, logout, removeErrors } from "../actions/userActions";
import Grid from "@material-ui/core/Grid";
class UserContainer extends Component {
	constructor(props) {
		super(props);
		this.handleOnLogin = this.handleOnLogin.bind(this);
		this.handleOnSignup = this.handleOnSignup.bind(this);
		this.handleOnLogout = this.handleOnLogout.bind(this);
		this.handleRemoveErrors = this.handleRemoveErrors.bind(this);
	}

	handleOnLogin(username, password) {
		this.props.login(username, password);
	}
	handleOnSignup(username, password) {
		this.props.signup(username, password);
	}
	handleOnLogout() {
		this.props.logout();
	}
	handleRemoveErrors() {
		this.props.removeErrors();
	}
	render() {
		return (
			<Grid container direction="row" justify="flex-end" alignItems="center">
				{this.props.currentUser.isAuthenticated && (
					<Grid item>
						<User username={this.props.currentUser.username} />
					</Grid>
				)}
				<Grid item>
					<UserForm
						currentUser={this.props.currentUser}
						onLogin={this.handleOnLogin}
						removeErrors={this.handleRemoveErrors}
						onSignup={this.handleOnSignup}
						onLogout={this.handleOnLogout}
					/>
				</Grid>
			</Grid>
		);
	}
}
const mapStateToProps = store => {
	return {
		currentUser: store.currentUser
	};
};
const mapDispatchToProps = dispatch => {
	return {
		login: (username, password) => dispatch(login(username, password)),
		signup: (username, password) => dispatch(signup(username, password)),
		logout: () => dispatch(logout()),
		removeErrors: () => dispatch(removeErrors())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
