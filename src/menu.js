import React from "react";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";

class Menu extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Rapsa</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <IndexLinkContainer to="/day">
              <NavItem eventKey={2} href="/">
                Day
              </NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to="/week">
              <NavItem eventKey={3} href="/">
                Week
              </NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to="/month">
              <NavItem eventKey={4} href="/month">
                Month
              </NavItem>
            </IndexLinkContainer>
            {this.props.privileged && (
              <NavDropdown eventKey={5} title="Admin" id="admin-dropdown">
                <IndexLinkContainer to="/admin/customers">
                  <MenuItem eventKey={5.2}>Customers</MenuItem>
                </IndexLinkContainer>
                <IndexLinkContainer to="/admin/reports">
                  <MenuItem eventKey={5.4}>Reporting</MenuItem>
                </IndexLinkContainer>
                <MenuItem divider />
                <IndexLinkContainer to="/admin/other">
                  <MenuItem disabled eventKey={5.4}>
                    Other
                  </MenuItem>
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
                <MenuItem eventKey={6.1}>Change Password</MenuItem>
              </IndexLinkContainer>
              <IndexLinkContainer to="/pref">
                <MenuItem eventKey={6.2}>Preferences</MenuItem>
              </IndexLinkContainer>
              {this.props.privileged && (
                <IndexLinkContainer to="/pref/projects">
                  <MenuItem eventKey={6.3}>Project Preferences</MenuItem>
                </IndexLinkContainer>
              )}
              <MenuItem divider />
              <IndexLinkContainer to="/logout">
                <MenuItem eventKey={6.4}>Logout</MenuItem>
              </IndexLinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Menu;
