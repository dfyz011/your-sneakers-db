import React, { Component } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
export default class UserForm extends Component {
	constructor(props) {
		super(props);
		this.state = { ...this.props };
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
	}
	onChangeUsername(e) {
        const usernameError=this.props.currentUser.errors.username;
        const passwordError=this.props.currentUser.errors.password;
		this.setState({
			currentUser: { ...this.state.currentUser, username: e.target.value }
        });
        if(usernameError||passwordError){
            this.props.removeErrors();
        }
	}
	onChangePassword(e) {
        const usernameError=this.props.currentUser.errors.username;
        const passwordError=this.props.currentUser.errors.password;
		this.setState({
			currentUser: { ...this.state.currentUser, password: e.target.value }
        });
        if(usernameError||passwordError){
            this.props.removeErrors();
        }
	}
	inputForm() {
        const usernameError=this.props.currentUser.errors.username;
        const passwordError=this.props.currentUser.errors.password;
		return (
			<Toolbar style={{alignItems:"baseline"}}>
				<TextField
                    id="username"
                    error={usernameError}
                    helperText={usernameError}
                    label="Логин"
                    color="secondary"
					value={this.state.username}
                    onChange={this.onChangeUsername}
				/>
				<TextField
                    id="password"
                    error={passwordError}
                    color="secondary"
					label="Пароль"
					value={this.state.password}
                    onChange={this.onChangePassword}
                    helperText={passwordError}
                    style={{marginLeft:15}}
				/>
                <ButtonGroup style={{marginLeft:15}}>

                <Button 
					color="inherit"
					onClick={e => {
						e.preventDefault();
						this.props.onLogin(
							this.state.currentUser.username,
							this.state.currentUser.password
						);
					}}
				>
					Войти
				</Button>
				<Button
					color="inherit"
					onClick={e => {
						e.preventDefault();
						this.props.onSignup(
							this.state.currentUser.username,
							this.state.currentUser.password
						);
					}}
				>
					Зарегистрироваться
				</Button>
                </ButtonGroup>
				<div>
					{/* {isLoggingIn && <p>Попытка входа...</p>}
					{isLoggingOut && <p>Попытка выхода...</p>} */}
					{/* {isSigningIn && <p>Регистрация...</p>} */}
					{/* {loginError && <p>Ошибка входа</p>} */}
					{/* {logoutError && <p>Ошибка выхода</p>} */}
					{/* {signError && <p>Ошибка регистрации</p>} */}
					{/* {signSuccess && <p>Пользователь успешно зарегистрирован</p>} */}
				</div>
			</Toolbar>
		);
	}
	render() {
		const { isAuthenticated } = this.props.currentUser;
		if (isAuthenticated) {
			return (
				<Toolbar>
					<Button
						color="inherit"
						onClick={e => {
							e.preventDefault();
							this.props.onLogout();
						}}
					>
						Выйти
					</Button>
				</Toolbar>
			);
		} else return this.inputForm();
	}
}
