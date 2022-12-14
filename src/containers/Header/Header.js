import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import {LANGUAGES} from "../../utils"

class Header extends Component {

    handleChangeLanguage = (language) =>{
        this.props.changeLanguageAppRedux(language)
        
    }

    render() {
        const { processLogout,languages,userInfo } = this.props;
        console.log("check userInfo", userInfo)
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className='languages'>
                    <span className='welcome'>Welcome, {userInfo && userInfo.username ? userInfo.username : ''}</span>
                    <span 
                    className={languages === LANGUAGES.VI ? "language-vi active" : "language-vi"} 
                    onClick={()=> this.handleChangeLanguage(LANGUAGES.VI)}

                    >VN</span>
                    <span 
                    className={languages === LANGUAGES.EN ? "language-en active" : "language-en"}
                    onClick={()=> this.handleChangeLanguage(LANGUAGES.EN)}
                    >EN</span>

                     {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

                
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        languages: state.app.languages,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
