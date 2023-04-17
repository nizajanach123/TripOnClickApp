import styled from 'styled-components';
import Button2 from './Button2';
import { Link, useNavigate } from "react-router-dom";

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 0.5rem 1rem;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: initial;

  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      color: #ccc;
    }
  }
`;

const NavbarBrand = styled.div`
  font-size: 1.5rem;
`;

const NavbarMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavbarMenuItem = styled.li`
  margin: 0 0.5rem;
`;

function MyNavbar() {
  const navigate = useNavigate();
  return (
    <Navbar>
      <NavbarBrand>Logo</NavbarBrand>
      <NavbarMenu>
        <NavbarMenuItem><Button2 content="התחבר" type="submit" onClick={ ()=>navigate("/login")}/> </NavbarMenuItem>
        <NavbarMenuItem><Button2 content="הירשם" type="submit" onClick={ ()=>navigate("/register")}/> </NavbarMenuItem>
        <NavbarMenuItem><Button2 content="איזור אישי" type="submit" onClick={ ()=>navigate("/homepage")}/> </NavbarMenuItem>
        <NavbarMenuItem><Button2 content="צור טיול" type="submit" onClick={ ()=>navigate("/homepage")}/> </NavbarMenuItem>

      </NavbarMenu>
    </Navbar>
  );
}
export default MyNavbar;