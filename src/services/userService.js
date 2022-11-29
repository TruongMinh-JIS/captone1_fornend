import axios from "../axios";



const handleLoginApi = (userName,userPassword) => {
    return axios.post('/api/login',{username:userName,password:userPassword} );
    // return axios.post('/api/login',{userName,userPassword});
}


const getAllUsers=(inputId) =>{
    //template string ES6
    return axios.get(`/api/get-all-users?id=${inputId}`)
    
}

const createNewUserService = (data) =>{
    return axios.post('/api/create-new-user',data)
}

const deleteUserService = (userId) =>{
    // return axios.delete('/api/delete-user',{id:userId})
    return axios.delete('/api/delete-user', {
        data: {
          id: userId
        }
      });
}

const editUserService = (inputData)=>{
    return axios.put('/api/edit-user', inputData)
       
}
export{handleLoginApi , getAllUsers, createNewUserService, deleteUserService, editUserService};