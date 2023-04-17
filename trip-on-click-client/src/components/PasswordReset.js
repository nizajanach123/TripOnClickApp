import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Input from "./DesignedComponents/Input";
import Button from "./DesignedComponents/Button";
import "../css/reset.css";
import view from '../Images/view.png'
import hide from '../Images/hide.png'

const PasswordReset = () => {

    const { id, token } = useParams();
    const history = useNavigate();

    const [data2, setData] = useState(false);

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePeephole = () => {
        setShowPassword(!showPassword);
    };

    const setval = (e) => {
        setPassword(e.target.value)
    }
   
    const tokenExpireCheck = async () => {
        try {
            const res = await axios.post(`http://localhost:8080/users/${id}/${token}`);
            if (res.status == 201) {
                console.log("the link is valid")
                return true;
            } else {
                return;
            }
        }
        catch (error) {

            toast.error("הקישור פג תוקף.נא לשלוח מייל בשנית"
                ,
                {
                    position: toast.POSITION.TOP_LEFT, 
                    className: 'toast-message'                })
            console.log("catch")
            return false;
        }
    }




    const sendpassword = async (result) => {
        result.preventDefault();

         result = await tokenExpireCheck();
        console.log(result)
        if (result) {

                if (password === "") {
                    toast.error("נא להזין סיסמה", {
                        position: toast.POSITION.TOP_LEFT,
                        className: 'toast-message'
                    });
                } else if (password.length < 8) {
                    toast.error("הסיסמה חייבת להכיל לפחות 8 תווים", {
                        position: toast.POSITION.TOP_LEFT,
                        className: 'toast-message'
                    });
                } else try {
                    const res = await axios.post(`http://localhost:8080/users/change/${id}/${token}`, { password });
                    if (res.status == 201) {

                        setPassword("")
                        toast("סיסמתך הוחלפה בהצלחה", {
                            position: toast.POSITION.TOP_LEFT,
                            className: 'toast-message'
                        })
                    } else {
                        toast.error("קיימת שגיאה, נא נסה שוב מאוחר יותר", {
                            position: toast.POSITION.TOP_LEFT,
                            className: 'toast-message'
                        })
                    }


                }
                catch (error) {
                    return;
                }

            
        }
        else{
              return
        }
   

    }


    useEffect(() => {
        tokenExpireCheck()

        setTimeout(() => {
 
        }, 3000)
    }, [])

    return (
        <div className="logandreg4">
            <Form >
                <MainContainer >
                    <WelcomeText>איפוס סיסמה</WelcomeText>
                    <br></br>

                



                            <>
                                <section>
                                    <div className="form_data">
                                        <div className="form_heading">
                                        </div>

                                        <form>
                                        <div>
                                            <Input
                                                  className="password"

                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={setval}
                                                placeholder="הקלד סיסמה חדשה"
                                            />
                                            <div
                                                className="peephole-button"
                                                type="button"
                                                onClick={handleTogglePeephole}
                                            >
                                                {showPassword ? (
                                                    <img src={hide} class="eye1" />
                                                ) : (
                                                    <img src={view} class="eye1" />
                                                )}
                                            </div>   
                                             </div>

                                            <ButtonContainer>

                                                <Button className='btn' content="שלח" onClick={sendpassword}></Button>
                                            </ButtonContainer>
                                            <br></br>
                                            <Link class="notExpired2" to="/Login">התחברות</Link><br></br><br></br>
                                            <Link class="notExpired" to="/forgot">?המייל לא הגיע/קישור פג תוקף</Link>

                                        </form>
                                      
                                    </div>
                                </section>
                            </>
                
                        

                </MainContainer>

            </Form>
            <ToastContainer rtl={true} />
        </div>

    )
}
const MainContainer = styled.div`

margin-top:10vh;
width:30vw;
padding-top:2vh;
background: rgba(255, 255, 255, 0.15);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
backdrop-filter: blur(8.5px);
-webkit-backdrop-filter: blur(8.5px);
border-radius: 10px;
color: #ffffff;
text-transform: uppercase;
letter-spacing: 0.4rem;
@media only screen and (max-width: 320px) {
width: 90vw;




`;
const WelcomeText = styled.h2`
margin: 3rem 0 3rem 0;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

`;
const InputContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
margin-top:-20vh;
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


export default PasswordReset