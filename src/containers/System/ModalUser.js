
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import {emitter} from "../../utils/emitter";

// import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state={
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

        this.listenToEmitter();
    }

    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA',() =>{
            //reset state
            this.setState({
                username:'',
                password:'',
                email:'',
                firstName:'',
                lastName:'',
                address:'',
                phonenumber:'',
            })
        })
    }

    componentDidMount() {
        // console.log('Mouting modal')
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

    

    handleAddNewUser =()=>{
        let isValid=this.checkValidateInput();
        if(isValid===true){
            //gọi API create modal
            this.props.createNewUser(this.state);

        }
    }


    render() {
        
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={()=>{this.toggle()}} 
                className="modal-user-container"
                size='lg'
                
            >
                <ModalHeader toggle={()=>{this.toggle()}}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>User name</label>
                            <input type="text" onChange={(event)=>{this.handleOnChageInput(event,'username')}} value={this.state.username}/>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type="password" onChange={(event)=>{this.handleOnChageInput(event,'password')}} value={this.state.password}/>
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
                <Button className='px-3' color="primary" onClick={()=>{this.handleAddNewUser()}}>Add new</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



