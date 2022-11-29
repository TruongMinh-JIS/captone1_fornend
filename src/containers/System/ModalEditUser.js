
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import {emitter} from "../../utils/emitter";
import _, { isEmpty } from 'lodash';

// import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state={
            id:'',
            username:'',
            password:'',
            email:'',
            firstName:'',
            lastName:'',
            address:'',
            phonenumber:'',
            // gender:'',
            // roleid:''

        }

    }

    

    componentDidMount() {
        // console.log('Mouting modal')
        let user =this.props.currentUser;
        if(user && ! _.isEmpty(user)){
            this.setState({
                id:user.id,
                username: user.username,
                password:'harcode',
                email:user.email,
                firstName:user.firstName,
                lastName:user.lastName,
                address:user.address,
                phonenumber:user.phonenumber,
            })
        }
        console.log("didmout edit modal:",this.props.currentUser)
    }

    toggle = () =>{
        this.props.toggleFromParent();
    }

    handleOnChageInput=(event,id)=>{
        // console.log(event.target.value
        let copyState = {...this.state};
        copyState[id]=event.target.value;
        this.setState({
            ...copyState
        })
        
    }

    checkValidateInput=()=>{
        let isValid=true;
        let arrInput = ['username','password','email','firstName','lastName','address','phonenumber'];
        for (let i=0;i<arrInput.length;i++){
            // check cái phần tử trong arr có trống ko
            if(!this.state[arrInput[i]]){
                isValid=false;
                alert('Missing prameter: '+arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    

    handleSaveUser =()=>{
        let isValid=this.checkValidateInput();
        if(isValid===true){
            //gọi API edit modal
            this.props.editUser(this.state);

        }
    }


    render() {

        // console.log("this check:",this.props)
        
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={()=>{this.toggle()}} 
                className="modal-user-container"
                size='lg'
                
            >
                <ModalHeader toggle={()=>{this.toggle()}}>Edit a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>User name</label>
                            <input type="text" onChange={(event)=>{this.handleOnChageInput(event,'username')}} value={this.state.username} disabled/>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type="password" onChange={(event)=>{this.handleOnChageInput(event,'password')}} value={this.state.password} disabled/>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Email</label>
                            <input type="email" onChange={(event)=>{this.handleOnChageInput(event,'email')}} value={this.state.email}/>
                        </div>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input type="text" onChange={(event)=>{this.handleOnChageInput(event,'firstName')}} value={this.state.firstName}/>
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type="text" onChange={(event)=>{this.handleOnChageInput(event,'lastName')}} value={this.state.lastName}/>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type="text" onChange={(event)=>{this.handleOnChageInput(event,'address')}} value={this.state.address}/>
                        </div>
                        <div className='input-container'>
                            <label>Phone Number</label>
                            <input type="text" onChange={(event)=>{this.handleOnChageInput(event,'phonenumber')}} value={this.state.phonenumber}/>
                        </div>

                    </div>
                    
                            
                </ModalBody>
                <ModalFooter>
                <Button className='px-3' color="primary" onClick={()=>{this.handleSaveUser()}}>Save change</Button>{' '}
                <Button className='px-3' color="secondary" onClick={()=>{this.toggle()}}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



