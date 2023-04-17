import styled from "styled-components";
export default function Buttonf({ content, type, onClick }) {
    return <StyledButton type={type} onClick={onClick} >{content}</StyledButton>;
}
const StyledButton = styled.button`
background: linear-gradient(to right, #14163c 0%, #03217b 79%);
text-transform: uppercase;
letter-spacing: 0.2rem;
width: 65%;
height: 3rem;
font-size:18px;
magin-right:70vw;
margin-bottom:20vh;
border: none;
color: white;
border-radius: 2rem;
cursor: pointer;
`;