import React from "react";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";

class Menu extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">SOVELLUS</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <IndexLinkContainer to="/">
              <NavItem eventKey={2} href="/">
                Sihteeri
              </NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to="/doctor">
              <NavItem eventKey={3} href="/doctor">
                Lääkäri
              </NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to="/billing">
              <NavItem eventKey={4} href="/billing">
                Laskutus
              </NavItem>
            </IndexLinkContainer>
            {this.props.privileged && (
              <NavDropdown eventKey={5} title="Admin" id="admin-dropdown">
                <IndexLinkContainer to="/admin/rights">
                  <MenuItem eventKey={5.2}>Käyttöoikeudet</MenuItem>
                </IndexLinkContainer>
                <IndexLinkContainer to="/admin/reports">
                  <MenuItem eventKey={5.4}>Raportit</MenuItem>
                </IndexLinkContainer>
              </NavDropdown>
            )}
          </Nav>
          <Nav pullRight>
            <NavDropdown
              eventKey={6}
              title={this.props.personName}
              id="user-dropdown"
            >
              <IndexLinkContainer to="/password">
                <MenuItem eventKey={6.1}>Vaihda salasana</MenuItem>
              </IndexLinkContainer>
              <MenuItem divider />
              <IndexLinkContainer to="/logout">
                <MenuItem eventKey={6.4}>Kirjaudu ulos</MenuItem>
              </IndexLinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Menu;
