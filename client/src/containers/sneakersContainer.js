import React, { Component } from "react";
import { connect } from "react-redux";
import SneakerForm from "../components/sneakerFormComponent";
import SneakersList from "../components/sneakersList";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import {
	addSneaker,
	getSneakers,
	updateSneaker,
	deleteSneaker,
	removeErrors
} from "../actions/sneakerAction";
class SneakersContainer extends Component {
	constructor(props) {
		super(props);
		this.handleOnAdd = this.handleOnAdd.bind(this);
		this.handleOnDelete = this.handleOnDelete.bind(this);
		this.handleOnUpdate = this.handleOnUpdate.bind(this);
		this.handleRemoveErrors = this.handleRemoveErrors.bind(this);
		// this.state=this.props.currentUser.isAuthenticated?{...this.props,sneakers:this.props.getSneakers()}:{...this.props};
	}
	handleOnAdd(sneaker) {
		this.props.addSneaker(sneaker);
	}
	handleOnDelete(id) {
		this.props.deleteSneaker(id);
	}
	handleOnUpdate(id, sneaker) {
		this.props.updateSneaker(id, sneaker);
	}
	handleRemoveErrors() {
		this.props.removeErrors();
	}
	render() {
		const isAuthenticated = this.props.currentUser.isAuthenticated;
		return (
			<Container align="center" style={{ marginTop: 10 }}>
				{isAuthenticated ? (
					<Box>
						<SneakerForm
							brand=""
							model=""
							errors={this.props.currentSneakers.errors}
							onAdd={this.handleOnAdd}
							removeErrors={this.handleRemoveErrors}
						/>
						<SneakersList
							sneakers={this.props.currentSneakers.sneakers}
							onDelete={this.handleOnDelete}
							onUpdate={this.handleOnUpdate}
						/>
					</Box>
				) : (
					<Typography>
						Чтобы создать список своих кроссовок вам нужно войти в свою учетную
						запись или зарегистрироваться
					</Typography>
				)}
			</Container>
		);
	}
}
const mapStateToProps = store => {
	return {
		currentUser: store.currentUser,
		currentSneakers: store.sneakers
	};
};
const mapDispatchToProps = dispatch => {
	return {
		addSneaker: (brand, model) => dispatch(addSneaker(brand, model)),
		getSneakers: () => dispatch(getSneakers()),
		deleteSneaker: id => dispatch(deleteSneaker(id)),
		updateSneaker: (id, sneaker) => dispatch(updateSneaker(id, sneaker)),
		removeErrors: (id, sneaker) => dispatch(removeErrors(id, sneaker))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(SneakersContainer);
