import axios from "../axios";



const handleLoginApi = (userName,userPassword) => {
    return axios.post('/api/login',{username:userName,password:userPassword} );
    // return axios.post('/api/login',{userName,userPassword});
}

export{handleLoginApi};