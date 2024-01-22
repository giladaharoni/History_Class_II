import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
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
        var image = document.getElementById("image").value;
        // axios.post('https://localhost:7125/register?username='+email+'&nickname='+nickname+'&password='+password)
        // .then(response => {
        //     if (response.data != null) {
        //         localStorage.setItem('jwtToken', response.data);
        //         navigate('/talk')
        //         //this.setState({ redirect: true });
        //     } else {
        //         alert("incorect nickname or password");
        //         return;

        //     }
        // })
        var user = {
            email: email,
            password: password,
            image: image,
            nickname: nickname
        };
        if (!isOk(user, passwordValidation)) {
            return;
        }
        //fetch new contact
        
        //navigate('/');
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
                    <label  className="form-label">Add image</label>
                    <input type="file" accept="image/*" id="image"></input>
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