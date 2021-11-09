import { Collapse,   Nav, Navbar, NavbarBrand,  NavbarToggler, NavItem, NavLink } from "reactstrap"

export const Menu=()=>{


    return(

        <div>
 
  <Navbar
    color="info"
    expand="md"
    dark
  >
     
    <NavbarBrand href="/">
      Services TI Academy
    </NavbarBrand>
    <NavbarToggler onClick={function noRefCheck(){}} />
    <Collapse navbar>
      <Nav
        className="me-auto"
        navbar
      >
        <NavItem>
          <NavLink href="/">
            Home
          </NavLink>
        </NavItem>
        
      </Nav>
      
    </Collapse>
    
  </Navbar>

</div>
    )
}