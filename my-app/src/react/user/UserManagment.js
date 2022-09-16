import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as UserService from "../../redux/service/UserService";

import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import UserComponent from "./UserComponent";

const mapStateToProps = (state) => {
  return state;
};

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      userName: "",
      password: "",
    };
    this.openCreateUserModal = this.openCreateUserModal.bind(this);
    this.closeCreateUserModal = this.closeCreateUserModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitNewUser = this.submitNewUser.bind(this);
    this.adminSwitch = this.adminSwitch.bind(this);
  }

  componentDidMount() {
    const { getUsersAction } = this.props;
    const data = getUsersAction(this.props.accessToken);
  }

  openCreateUserModal(e) {
    e.preventDefault();
    const { openCreateUserModalAction } = this.props;
    openCreateUserModalAction();
  }

  closeCreateUserModal() {
    const { closeCreateUserModalAction } = this.props;
    closeCreateUserModalAction();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  adminSwitch(e) {
    const { name } = e.target;
    const value = e.target.checked;
    this.setState({ [name]: value });
  }

  submitNewUser(e) {
    e.preventDefault();
    console.log(this.state);
    const { userID, userName, password } = this.state;

    const { submitNewUserAction } = this.props;
    submitNewUserAction(
      this.props.accessToken,
      userID,
      userName,
      password,
      this.state.isAdministrator
    );
    this.setState({ showDeleteDialog: false });
    const { getUsersAction } = this.props;
    getUsersAction(this.props.accessToken);

  }

  openDeleteModal(e) {
    e.preventDefault();
    this.setState({ showDeleteDialog: true });
  }

  closeDeleteModal() {
    this.setState({ showDeleteDialog: false });
  }

  render() {
    let users = this.props.users;
    let ListofUsers;
    let id = "";

    if (!users) {
      ListofUsers = <p>Keine User sind vorhanden.</p>;
    } else {
      ListofUsers = users.map(
        (currentUser) => (
          (id = "UserItem" + currentUser.userID),
          (
            <UserComponent
              id={id}
              key={id}
              currentUser={currentUser}
              className="card UserCard forumMessage"
            />
          )
        )
      );
    }

    /*Create User Modal*/

    var showCreateUserDialog = this.props.showCreateUserDialog;

    if (showCreateUserDialog === undefined) {
      showCreateUserDialog = false;
    }

    let creatUserModal = (
      <Modal show={showCreateUserDialog} onHide={this.closeCreateUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>User erstellen</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>User ID</Form.Label>
              <Form.Control
                id="UserIDInput"
                type="text"
                placeholder="User ID"
                name="userID"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                id="UserNameInput"
                type="text"
                placeholder="User Name"
                name="userName"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="PasswordInput"
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Check
              type="switch"
              id="IsAdministratorInput"
              label="Admin Status"
              name="isAdministrator"
              onChange={this.adminSwitch}
            />

            <Button
              id="CreateUserButton"
              variant="primary"
              type="submit"
              onClick={this.submitNewUser}
            >
              User anlegen
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );

    return (
      <div
        className="page-content"
        id="UserManagement"
        style={{ background: "white" }}
      >
        {creatUserModal}
        <section className="portfolio-block block-intro">
          <div className="container">
            <div className="about-me">
              <h1>UserManagement</h1>
              <p>Das ist dein UserManagement Bereich.</p>
            </div>
            <div id="UserList" className="UserCard-card-columns">
              {ListofUsers}
            </div>
          </div>

          <Button
            id="OpenCreateUserDialogButton"
            className="Button"
            variant="outline-secondary"
            onClick={this.openCreateUserModal}
          >
            neuen User anlegen
          </Button>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      openCreateUserModalAction: UserService.getShowCreateUserDialogAction,
      closeCreateUserModalAction: UserService.getHideCreateUserDialogAction,
      getUsersAction: UserService.getAllUsers,
      submitNewUserAction: UserService.submitNewUserAction,
    },
    dispatch
  );

const ConnectedUserManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement);

export default ConnectedUserManagement;
