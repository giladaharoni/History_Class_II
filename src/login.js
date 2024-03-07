import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {api_path} from './constant.js'

export default function Login() {
    let navigate = useNavigate();
    const [token, setToken] = useState(-1);
    const loginClicked = function(e) {
        e.preventDefault();
        var password = document.getElementById("password").value;
        var nickname = document.getElementById("nickname").value;
        var usernum = -1;
        axios.get(api_path+"/api/login/"+nickname+"/"+password)
        .then(response => {
            if (response.status === 200) {
                var id = response.data;
                localStorage.setItem('user_id', id);
                navigate('/SelectLesson');
            } else {
                throw new Error("Wrong password");
            }
        })
        .catch(error => {
            if (error.status=400) {
                alert(error.response.data['message'])
            } else {
                alert("Error occurred: " + error.message);

            }
            // Handle the error here
            
        });
        

        
    }

    const RegisterClicked = (e) => {
        const navigate = useNavigate();
        navigate('/Register');
    }
    
    return (
        
        <div className='login-class'>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-brand" href="#"  style={{ color: "white" }} >
                        Chat!
                    </div>
                </div>
            </nav>
            <form>

                <div className="mb-3">
                    <label  className="form-label">Nickname</label>
                    <input type="Name" className="form-control" id="nickname"></input>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"></input>
                    <div className="col">
                        <button type="submit"  id="login" className="btn btn-primary" onClick={loginClicked}>login</button>
                    </div>
                    <label  className="form-label">not registered?</label>
                    <button   className="register-button"><a href= "\Register" className="link-primary">click here</a></button>
                </div>
            </form>
        </div>
    )
}