import React from "react";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";

class Menu extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            Tieto<sup>2</sup>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {this.props.doctor && (
              <IndexLinkContainer to="/doctor">
                <NavItem eventKey={4} href="/doctor">
                  Oma työjono
                </NavItem>
              </IndexLinkContainer>
            )}
            {(this.props.admin || this.props.secretary) && (
              <IndexLinkContainer to="/enter">
                <NavItem eventKey={4} href="/enter">
                  Työjono
                </NavItem>
              </IndexLinkContainer>
            )}
            {(this.props.admin || this.props.secretary) && (
              <IndexLinkContainer to="/billing">
                <NavItem eventKey={4} href="/billing">
                  Laskutus
                </NavItem>
              </IndexLinkContainer>
            )}
            {this.props.admin && (
              <IndexLinkContainer to="/admin/rights">
                <NavItem eventKey={4} href="/admin/rights">
                  Käyttöoikeudet
                </NavItem>
              </IndexLinkContainer>
            )}
            {this.props.admin && (
              <IndexLinkContainer to="/admin/examinations">
                <NavItem eventKey={4} href="/admin/examinations">
                  Tutkimukset
                </NavItem>
              </IndexLinkContainer>
            )}
          </Nav>
          <Nav id="loggedUsr">
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
