import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default class SneakerForm extends Component {
	constructor(props) {
		super(props);
		let model = props.model;
		let brand = props.brand;
		this.state = {
			model: model,
			brand: brand
		};
		this.onChangeModel = this.onChangeModel.bind(this);
		this.onChangeBrand = this.onChangeBrand.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChangeModel(e) {
        const modelError=this.props.errors.model;
        const brandError=this.props.errors.brand;
        this.setState({ model: e.target.value});
        if(modelError||brandError){
            this.props.removeErrors();
        }
    }
    onChangeBrand(e) {
        const modelError=this.props.errors.model;
        const brandError=this.props.errors.brand;
        this.setState({ brand: e.target.value});
        if(modelError||brandError){
            this.props.removeErrors();
        }
	}
	onSubmit(e) {
		e.preventDefault();
		console.log(this.state.model);

		this.props.onAdd({ model: this.state.model, brand: this.state.brand });
	}

	render() {
        const modelError=this.props.errors.model;
        const brandError=this.props.errors.brand;
		return (
			<AppBar
				position="fixed"
				color="primary"
				style={{ top: "auto", bottom: "8px",width:"98.5%",right:"8px"}}
			>
				<Toolbar justify="center" >
					<form style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"center",alignItems: "baseline"}} onSubmit={this.onSubmit}>
						<TextField
                            color="secondary"
                            style={{marginRight:"5px",marginBottom:"10px"}}
                            error={modelError}
                            helperText={modelError}
							label="Модель"
							value={this.state.model}
							onChange={this.onChangeModel}
						/>
						<TextField
                            color="secondary"
                            style={{marginRight:"5px",marginBottom:"10px"}}
                            error={brandError}
                            helperText={brandError}
							label="Фирма"
							value={this.state.brand}
							onChange={this.onChangeBrand}
						/>
						<Button color="inherit" type="submit">Создать</Button>
					</form>
				</Toolbar>
			</AppBar>
		);
	}
}
