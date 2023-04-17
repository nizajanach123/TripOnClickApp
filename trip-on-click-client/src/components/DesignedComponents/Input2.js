import styled from "styled-components";
export default function Input({ type, placeholder, value, onChange, name }) {
    return <StyledInput type={type} placeholder={placeholder} value={value} onChange={onChange} name={name} />;
}



const StyledInput = styled.input`
background: rgba(255, 255, 255, 0.15);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
border-radius: 2rem;
width: 50%;
height: 3rem;
 padding: 1rem;
 margin-top: 10px;

margin-bottom: 15px;
border: none;
outline: none;
 color: #3c354e;
font-size: 5rem;
 font-weight: bold;
color: #3c354e;
font-size: 15px;

font-weight: bold;
font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
direction:RTL;
&:focus {
display: inline-block;
box-shadow: 0 0 0 0.2rem #b9abe0;
backdrop-filter: blur(12rem);
border-radius: 2rem;
font-family: Arial, Helvetica, sans-serif;
letter-spacing: initial;
}
&::placeholder {
    color: #3c354e;

font-weight: 100;
font-size: 1rem;
}
`;