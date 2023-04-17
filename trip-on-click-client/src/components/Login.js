import styled from "styled-components";
import Button from "./DesignedComponents/Button";
import Input from "./DesignedComponents/Input";
import Form from "react-bootstrap/Form";
import React, { useState} from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import view from '../Images/view.png'
import hide from '../Images/hide.png'
import "../css/Login.css";


function Login() {
    console.log("insert login")
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const handleTogglePeephole = () => {
        setShowPassword(!showPassword);
    };

    const generateError = (error) =>
    toast.error(error, {
        position: "top-left",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        
                const { data } = await axios.post(
                    "http://localhost:8080/users/login",
                    {
                        email,
                        password
                    },
                    { withCredentials: true }
                );
                    
                if (data) {
                    if (data.errors) {
                        console.log(data.errors);
                        const { email, password } = data.errors;
                        if (email) generateError(email);
                        if (password) generateError(password);
                    }
                    else {
                        if(data.status){
                            console.log("setItems")
                            localStorage.setItem('isAuthenticated', JSON.stringify("true"));
                            localStorage.setItem('UserInsert', JSON.stringify("null"));
                            navigate("/");
                        }
                        
                    }
                }
            
           

        } catch (ex) {
            console.log(ex);
        }
    }




    return (
        <div className="logandreg">

            <Form onSubmit={(e) => handleSubmit(e)}>
                <MainContainer>
                    <WelcomeText>התחברות</WelcomeText>
                    <InputContainer>

                        <Input
                         className='backgroundfix'
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="אימייל" />
                        
                             <Input
                                className="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="סיסמא "
                             />
                            <div className="peephole-button"
                             type="button"
                             onClick={handleTogglePeephole}
                            >
                                {showPassword ? (
                                <img src={hide} class="eye2" />
                                ) : (
                                    <img src={view} class="eye2" />
                                )}
                            </div>   
                    </InputContainer>
                    <ButtonContainer>
                        <Button content="התחבר" type="submit"
                            onClick={(e) => handleSubmit(e)} />
                    </ButtonContainer>

                    
                    <HorizontalRule />
                   
                    <HaveAccount id='haveaccount' onClick={ ()=>navigate("/register")}>אין לך חשבון?</HaveAccount>
                    <ForgotPassword  id="forgotp" onClick = {()=>navigate("/forgot")}>שכחת סיסמא?</ForgotPassword>
                </MainContainer>
            </Form>
            <ToastContainer rtl={true} />

        </div>
    );
}


const MainContainer = styled.div`
display: flex;
align-items: center;
direction: rtl;
flex-direction: column;
height: 80vh;
width: 30vw;
background: rgba(255, 255, 255, 0.15);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
backdrop-filter: blur(8.5px);
-webkit-backdrop-filter: blur(8.5px);
border-radius: 10px;
color: #ffffff;
text-transform: uppercase;
letter-spacing: 0.4rem;
@media only screen and (max-width: 320px) {
width: 80vw;
height: 90vh;
hr {
margin-bottom: 0.3rem;
}
h4 {
font-size: small;
}
}
@media only screen and (min-width: 360px) {
width: 80vw;
height: 90vh;
h4 {
font-size: small;
}
}
@media only screen and (min-width: 411px) {
width: 80vw;
height: 90vh;
}
@media only screen and (min-width: 768px) {
width: 80vw;
height: 80vh;
}
@media only screen and (min-width: 1024px) {
width: 70vw;
height: 50vh;
}
@media only screen and (min-width: 1280px) {
width: 30vw;
height: 80vh;
}
`;
const WelcomeText = styled.h2`
margin: 3rem 0 3rem 0;
`;
const InputContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
height: 20%;
width: 100%;
`;
const ButtonContainer = styled.div`
margin: 3rem 0 1rem 0;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`;
const LoginWith = styled.h5`
cursor: pointer;
`;
const HorizontalRule = styled.hr`
width: 90%;
height: 0.3rem;
border-radius: 0.8rem;
border: none;
background: linear-gradient(to right, #14163c 0%, #03217b 79%);
background-color: #ebd0d0;
margin: 1.5rem 0 1rem 0;
backdrop-filter: blur(25px);
`;
const IconsContainer = styled.div`
display: flex;
justify-content: space-evenly;
margin: 1rem 0 2rem 0;
width: 80%;
`;
const ForgotPassword = styled.h4`
cursor: pointer;
direction: rtl;
`;
const HaveAccount = styled.h4`
cursor: pointer;
direction:rtl;
`;
export default Login;