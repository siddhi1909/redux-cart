// IMPORT EXTERNAL LIBRARIES/MODULES
import React, {Component} from 'react';
import {connect} from 'react-redux';
// IMPORT API & ROUTE ACTIONS
import logo from '../assets/images/logo512.png';
import '../styles/App.css';
import {loginUserSucess} from '../redux/actions/authActions';

export class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isFormValid: true,
            validationMessage: ''
        }
        let results = [
            {"username":"siddhi","password":"siddhi"},
            {"username":"john","password":"john"},
            {"username":"Darth Vader","password":"41.9BBY"},
            {"username":"Luke Skywalker","password":"19BBY"}
        ]
        localStorage.setItem('userList', JSON.stringify(results));
    }

    onSubmit = async e => {
        try {
            e.preventDefault();
            let userList = JSON.parse(localStorage.getItem('userList') || []);
            let index = userList.findIndex((element) => {
                return element.username === this.state.username && element.password === this.state.password;
            })

            if (index !== -1) {
                let chiperText = {'username':this.state.username,'cart':[]};
                localStorage.setItem('user', JSON.stringify(chiperText));
                this.props.dispatch(loginUserSucess(chiperText));
                this.props.history.push('/dashboard');
            } else {
                this.setState({
                    isFormValid: !this.state.isFormValid,
                    validationMessage: "Wrong Username & password combination!"
                })
            }
        } catch (error) {
            this.setState({
                isFormValid: !this.state.isFormValid,
                validationMessage: error.message
            })
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value, isFormValid: true, validationMessage: ''});
    }

    render() {
        let boxClass = ["form-box"];
        if (!this.state.isFormValid) {
            boxClass.push('was-validated');
        }
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="logo" alt="logo"/>
                </div>
                <div className="container">
                    <form onSubmit={this.onSubmit} className={boxClass.join(' ')} id="login">
                        {(this.state.validationMessage) ?
                            (<div className="alert alert-danger alert-dismissible fade show">
                                <strong>Error!</strong> {this.state.validationMessage}
                            </div>) : ''
                        }
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" className="form-control" id="username"
                                   placeholder="Username"
                                   required value={this.state.username} onChange={this.handleInputChange}/>
                            <div className="invalid-feedback">Please enter a valid username.</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" className="form-control" id="password"
                                   placeholder="Password"
                                   required value={this.state.password} onChange={this.handleInputChange}/>
                            <div className="invalid-feedback">Please enter your password to continue.</div>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.user,
});

export default connect(mapStateToProps, null)(LoginComponent);