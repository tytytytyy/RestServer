import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import UserSessionWidget from "../user/UserSessionWidget";
import { LinkContainer } from "react-router-bootstrap";

const mapStateToProps = (state) => {
  return state;
};

class TopMenu extends Component {
  render() {
    let userManagmentButton = <p>nicht Eingeloggt</p>;
    let privatePageButton;
    let forumThreadButton;

    const user = this.props.user;
    const userAdminStatus = this.props.isAdministrator;

    if (user) {
      privatePageButton = (
        <LinkContainer to="/" id="OpenPrivatePageButton">
                <Nav.Link >Private Page</Nav.Link>
        </LinkContainer>
      );

      forumThreadButton = (
        <LinkContainer to="/forumPage" id="OpenForumThreadOverviewButton">
                <Nav.Link>Forum Threads</Nav.Link>
        </LinkContainer>
      );

      if (userAdminStatus) {
        userManagmentButton = (
          <LinkContainer to="/userManagement" id="OpenUserManagementButton">
                <Nav.Link>User Managment</Nav.Link>
          </LinkContainer>
        );
      }
    } else {
      privatePageButton = <div></div>;
    }

    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link eventKey={1}>Home</Nav.Link>
              </LinkContainer>

              {privatePageButton}
            {forumThreadButton}
            {userManagmentButton}
           
            </Nav>
  
            <UserSessionWidget />
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopMenu);
