import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Input from "./DesignedComponents/Input";
import Button from "./DesignedComponents/Button";
import "../css/forgot.css"

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const setVal = (e) => {
        setEmail(e.target.value)
    }

    const sendLink = async (e) => {
        e.preventDefault();
        console.log("enter sendLink")

        if (email === "") {
            toast.error("נא להזין כתובת מייל", {
                position: toast.POSITION.TOP_LEFT,
                className: 'toast-message'

            });
        } else if (!email.includes("@")) {
            toast.warning(" כתובת המייל חייבת להכיל :@", {
                position: toast.POSITION.TOP_LEFT,
                className: 'toast-message'
            });
        } else {
            const { data } = await axios.post("http://localhost:8080/users/sendpasswordlink", { email });

            if (data.status == 201) {
                setEmail("");
                setMessage(true)
                toast("קישור נשלח לכתובת האימייל שהזנת", {
                    position: "top-left",
                    className: 'toast-message'
                })
            } else {
                toast.error("משתמש לא קיים", {
                    position: toast.POSITION.TOP_LEFT,
                    className: 'toast-message'
                })
            }
        }
    }
    return (
        <div className="logandreg3">

            <Form >
                <MainContainer >
                    <WelcomeText>?שכחת סיסמה</WelcomeText>
                        <br></br><br></br>
                        <br></br>

                        <section>
                            <div>
                                <div>
                                </div>

                                <form>
                                    <div>
                                        <Input type="email" value={email} onChange={setVal} name="email" id="email" placeholder='הכנס כתובת מייל' />
                                    </div>
                                    <br></br>
                                    <ButtonContainer>

                                        <Button className='btn' content="שלח" onClick={sendLink}></Button>
                                    </ButtonContainer>

                                </form>
                               
                            </div>
                        </section>

                </MainContainer>

            </Form>
            <ToastContainer rtl={true} />
        </div>

    )
}
const MainContainer = styled.div`
// align-items: center;
// direction: rtl;
 margin-top:20vh;
 padding-right:10vh;
  padding-left:10vh;
 padding-bottom:10vh;
 padding-top:10vh;
height: fit-content;
width: fit-content;
background: rgba(255, 255, 255, 0.15);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
backdrop-filter: blur(8.5px);
-webkit-backdrop-filter: blur(8.5px);
border-radius: 10px;
color: #ffffff;
text-transform: uppercase;
letter-spacing: 0.4rem;
@media only screen and (max-width: 320px) {




`;
const WelcomeText = styled.h2`
// margin: 3rem 0 3rem 0;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

  margin-bottom:-9vh

`;

const ButtonContainer = styled.div`
// margin: 3rem 0 1rem 0;
// width: 100%;
// display: flex;
// align-items: center;
// justify-content: center;

`;

export default ForgotPassword