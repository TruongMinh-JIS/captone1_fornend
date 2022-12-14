import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

// import { KeyCodeUtils, LanguageUtils } from "../utils";

// import userIcon from '../../src/assets/images/user.svg';
// import passIcon from '../../src/assets/images/pass.svg';
import './Login.scss';
import { FormattedMessage } from 'react-intl';
// import { divide } from 'lodash';
import { handleLoginApi } from '../../services/userService';
// import adminService from '../services/adminService';

class Login extends Component {
    constructor(props) {
        super(props);
        // this.btnLogin = React.createRef();
        this.state={
            username:'',
            password:'',
            isshowPw: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername=(event)=>{
        this.setState({
            username: event.target.value
        })
        // console.log(event.target.value);
        

    }
    handleOnChangePassword=(event)=>{
        this.setState({
            password: event.target.value
        })
        // console.log(event.target.value)

    }

    handleLogin = async () => {
        
        // console.log(this.state.username)
        // console.log(this.state.password)
        this.setState({
            errMessage:''
        })
        try {

            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log('login success');
            }

        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
            console.log('error message', e.response);
        }

        // console.log('username: ', this.state.username, 'password: ', this.state.password);
        // console.log('all state' , this.state);
        // try {
        //     await handleLoginApi(this.state.username, this.state.password)
        // } catch (e) {
        //     console.log(e);
        // }
        
    }

    handleShowHidePw=()=>{
        this.setState({
            isshowPw: !this.state.isshowPw
        })
        
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 from-group login-input'>
                            <label>Username:</label>
                            <input type='text' className='form-control' placeholder='Enter your username' 
                                value={this.state.username} 
                                onChange={(event)=> this.handleOnChangeUsername(event)}
                            />
                        </div>
                        <div className='col-12  from-group login-input' >
                            <label>Password:</label>
                            <div className='custom-input-pw'> 
                                <input type={this.state.isshowPw ? 'text' : 'password'} className='form-control' placeholder='Enter your passwrod'
                                    value={this.state.password} 
                                    onChange={(event)=> this.handleOnChangePassword(event)}
                                    
                                />
                                <span onClick={()=>{this.handleShowHidePw()}}>
                                    <i className={this.state.isshowPw ? "fas fa-eye" :"fas fa-eye-slash" }></i>
                                    
                                </span>
                                
                            </div>
                            
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={()=>{this.handleLogin()}}>Login</button>
                        </div> 
                        
                        <div className='col-12'>
                            <span className='forgot-pw'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className='text-other-login'>Or Login With:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess:(userInfo)=> dispatch(actions.userLoginSuccess(userInfo))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
