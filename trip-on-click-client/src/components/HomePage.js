import dayByday from '../Images/dayByDay.jpg';
import map from '../Images/map.jpeg';
import calender from '../Images/ calender.jpg';
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Button2 from "./DesignedComponents/Button2";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import facebook from '../Images/facebook.png'
import {  useNavigate } from "react-router-dom";
import "../css/HomePage.css";


function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState("false");
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [userName, setUserName] = useState(null);
    const [isUserConnect, setIsUserConnect] = useState(false);

        useEffect(() => {
            console.log("verify user 3")
            const verifyUser = async () => {
                const { data } = await axios.post(
                    "http://localhost:8080/",
                    {},
                    {
                        withCredentials: true,
                    }
                );
                if (data.status) {
                    console.log(data.user.username)
                    const userInsert = JSON.parse(localStorage.getItem('UserInsert'));
                    if (userInsert == "null") {
                        localStorage.setItem('UserInsert', JSON.stringify("true"));
                        setUserName(data.user.username);
                        setIsUserConnect(true);
                            
                    }
                    setIsLoggedIn(JSON.parse(localStorage.getItem('isAuthenticated')));
                }

                if(!data.status && (cookies.jwt)){
                    console.log("status false and jwt true")
                    localStorage.clear();
                    removeCookie("jwt");
                    navigate("/login")
                }

            };
            verifyUser();
        }, [cookies, navigate, removeCookie]);

        // useEffect(() => {
        //     console.log("verify user 2")
        //     const verifyUser = async () => {
        //         const { data } = await axios.post(
        //             "http://localhost:8080/",
        //             {},
        //             {
        //                 withCredentials: true,
        //             }
        //         );
        //         if (!data.status && cookies.jwt) {
        //             console.log("hello tokemmmmmmmmmmmmmm")

        //             localStorage.clear();
        //             removeCookie("jwt");
        //             navigate("/login");
        //         }
    
        //     };
        //     verifyUser();
        // })

        useEffect(() => {
            const userInsert = JSON.parse(localStorage.getItem('UserInsert'));
            if (userName === null || userInsert == "null") {
                return;
            }
            console.log("popUpName = " + userName);
            toast(`היי ${userName} `, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }, [userName])

        const handleClick = () => {
            window.location.href =' https://www.facebook.com/profile.php?id=100090891827794&mibextid=ZbWKwL';
        }

  return (
      <HomePageContainer>

          <Header>
              <div class='homepage' />
              <h1 className='web'>האתר המושלם לטיול שלך</h1>
              
              {
              (isLoggedIn == "true") ?
              <Button2  class='button ' id='buttonfix' content="התחל בתכנון" type="submit" onClick={() => navigate("/Trip")}>התחל בתכנון </Button2>
              :
              <Button2  class='button' content="התחל בתכנון" type="submit" onClick={() => navigate("/login")}>התחל בתכנון</Button2>
              }
    
          </Header>


          <AboutUs>
              <Title> <h2 > מי אנחנו</h2></Title>
              <p>פלטפורמה שתעזור לכם לארגן את טיול החלומות שלכם בקליק</p>
              <p>אנו נבנה לכם לו"ז מסודר של כל הפעילויות והאטרקציות המותאמות במיוחד בשבילכם</p>
              <p>מעתה, לא צריך לדאוג ולברר מתי כל אתר פתוח </p>
              <p>אנחנו נסדר לכם את הכל לפי השעות המתאימות והעדפות שתזינו</p>
              <p>תקבלו מאיתנו את התוכנית לטיול שלכם על גבי מפה, יומן או כמסלול ש יום אחר יום </p>
              <p> !אז קדימה ארזו את המזוודות</p>
          </AboutUs>

          <Pic className='pic'>
              <img src={dayByday} alt='dayByday' className="rounded-image"></img>
        <img src={calender} alt='calender' className="rounded-image"></img>
        <img src={map} alt='map' className="rounded-image"></img>
          </Pic>

          <div className='day'>
              <Tit className='tit'>day-by-day</Tit>
              <div className='fix'>
              <p>תרשים המתאר את כל </p>
              <p>הפעילויות לכל יום עם כל</p>
              <p>הפרטים</p>
              </div>
          </div>
          <div className='cal'>
              <Tit >calender</Tit>
              <p>יומן הטיול שלכם כאן</p>
              <p>תוכלו לראות את הלוז</p>
              <p>המלא ולערוך את הטיול</p>
              <p>כמו שתרצו</p>
          </div>
          <div className='map'>
              <Tit>on the map</Tit>
              <p>תצוגה נוחה על גבי מפה</p>
              <p>בה תוכלו לראות את כל </p>
              <p>יעדי הטיול המתוכננים</p>
          </div>


          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={true}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
          />

        <div>
             <p><a href="https://www.facebook.com/profile.php?id=100090891827794&mibextid=ZbWKwL" target="_blank"><img src={facebook} className='facebook'/></a>:בקרו אותנו גם ב </p>
        </div>
    </HomePageContainer>

  );
}




const Title = styled.h2`
margin: 1rem 0 1rem 0;
color:green ;
`;

const Pic = styled.image`

float: left;
margin: 2rem;

`;
const Exp = styled.div`
padding:0;


`;
const Tit = styled.div`
font-size:2rem;


`;

const HomePageContainer = styled.div`
background-image: url('C:\TripOnClick-App\trip-on-click-client\src\homePageImg.jpg');
background-size: cover;
display: flex;
margin: auto;
text-align: center;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
const CardsText = styled.div`
background-color: white;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
border-radius: 6px;
width: 300px;
margin: 20px;
padding: 20px;

&:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}
`;


const Header = styled.h1`
font-size: 2em;
text-align: center;
color: #333;

`;

const AboutUs = styled.div`
width: 60%;
height: 192px;
background-color: none;
// box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
border-radius: 5px;
margin: 20px 10px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
display: inline-block
top: -3rem;
  position: relative;
  font-size: 20px;
  color: #333;
  font-weight: bold;


`;

export default HomePage;