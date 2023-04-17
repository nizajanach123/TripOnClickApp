
import styled from "styled-components";
export default function Button2({ content, type, onClick }) {
    return <StyledButton2 type={type} onClick={onClick} >{content}</StyledButton2>;
}

const StyledButton2 = styled.button`
  /* Adapt the colors based on primary prop */
   background: linear-gradient(to right, lightblue 1%,lightgreen 90%);;
  color: ${props => props.primary ? "white" : "black"};
  font-size: 22px;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px ;
  border-radius: 24px;
  position: relative;
  // bottom: 20rem;
  // left: 22rem;
  top: -24rem;
  left: 27rem;
    font-size:18px;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: initial;
`;