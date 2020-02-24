import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

export class User extends Component {
	render() {
		return (
            <Typography>Привет, {this.props.username}!</Typography>
		);
	}
}
