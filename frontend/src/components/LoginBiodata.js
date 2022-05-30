import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function LoginBiodata() {
  
    const [onChangeUsername, setOnChangeUsername] = useState("");
    const [onChangePassword, setOnChangePassword] = useState("");

    const navigate = useNavigate();

    const handleChangeUsername = (event) => {
        setOnChangeUsername(event);
    }   

    const handleChangePassword = (event) => {
        setOnChangePassword(event);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(onChangeUsername)
        // console.log(onChangePassword);

        const loginData = {
            username : onChangeUsername,
            password : onChangePassword
        }

        axios({
            method:'POST',
            url: 'http://localhost:901/biodata/login',
            data:loginData
        })
            .then((response) => {
                if(response.status === 200){
                    if(response.data.code === 1){
                        // navigate("/");
                        localStorage.setItem('refresh_token',response.data.refreshToken);
                        localStorage.setItem('access_token',response.data.accessToken);
                        localStorage.setItem('username',response.data.username);

                        navigate("/");
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    return (
    <div>
        <div className="container-fluid my-5">
            <div className="row">
                <div className="col-md-12">
                    {/* form */}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control"
                                id="username" onChange={(e)=>handleChangeUsername(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="text" className="form-control"
                                id="password" onChange={(e)=>handleChangePassword(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary">Login</button>
                        </form>
                    {/* form */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginBiodata