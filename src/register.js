import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api_path } from './constant';
// import axios from 'axios';



function Register() {

    const validationPassword = (user, passwordValidation) => {
        if(user.password != passwordValidation) {
            return false;
        }
        return true;
    }
    
    const validPassword = (user) => {
        var passw=  /^[A-Za-z0-9]\w{7,14}$/;
        if(!user.password.match(passw)) 
        { 
            return false;
        }
        return true;
    }

    const loginClicked = (e) => {
        // const navigate = useNavigate();
        // navigate('/');
    }

    const isEmpty = (user, passwordValidation) => {
        if (user.nickname == "" || passwordValidation =="" || user.nickname == "" || user.image == "" || user.password == "" || user.email == "") {
            return false;
        }
        return true;
    }

    const isOk = (user, passwordValidation) => {
        if (!isEmpty(user, passwordValidation)) {
            window.alert("error: must insert all the fields");
            return false;
        }
        if (!validPassword(user)) {
            window.alert("password must contain only letters and numbers and 7-14 digits.");
            return false;
        }
        if (!validationPassword(user, passwordValidation)) {
            window.alert("error: the validation password isn't correlative");
            return false;
        }
        return true;
    }
    
    let navigate = useNavigate();
    const RegisterUser = (e) => {
        e.preventDefault();
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var nickname = document.getElementById("nickname").value;
        var passwordValidation = document.getElementById("validation").value;
        if (password != passwordValidation) {
            alert("passsword validation failed")
            return
        }
        let json = {email: email, nickname: nickname, password: password}
        axios.post(api_path+"/api/register",json)
        .then(response => {
            if (response.status === 200) {
                var id = response.data['user_id'];
                localStorage.setItem('user_id', id);
                navigate('/SelectLesson');
            } else {
                throw new Error("Wrong password");
            }
        })
        .catch(error => {
            // Handle the error here
            alert("Error occurred: " + error.response.data['message']);
        });

        return;
    };

    return (
        <div className='register-className'>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-brand" href="#" style={{ color: "white" }}>
                        Chat!
                    </div>
                </div>
            </nav>
            <form>

                <div className="mb-3">
                    <label   className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"></input>
                    <div id="emailHelp"  className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label   className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password validation</label>
                    <input type="password" className="form-control" id="validation"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Nickname</label>
                    <input type="Name" className="form-control" id="nickname"></input>
                </div>
                <div className="mb-3">
                    <div className="col">
                        <button type="submit" id="register" className="btn btn-primary mb-3" onClick={RegisterUser}>Register</button>
                    </div>

                    <label  className="form-label">already registered?</label>
                    <button className="login-button"><a href="\" className="link-primary">click here</a></button>
                </div>
            </form>
        </div>
    )
}
export default Register;