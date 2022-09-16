import React, { Component } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as authenticationActions from "../../redux/actions/AuthenticationActions";

const mapStateToProps = (state) => {
  return state;
};

class UserSessionWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleShow(e) {
    e.preventDefault();
    const { showLoginDialogAction } = this.props;
    showLoginDialogAction();
  }

  handleClose() {
    const { hideLoginDialogAction } = this.props;
    hideLoginDialogAction();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(JSON.stringify(this.state));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { userID, password } = this.state;
    const { authenticateUserAction } = this.props;
    authenticateUserAction(userID, password);
  }

  handleLogout(e) {
    e.preventDefault();
    const { logOutAction } = this.props;
    logOutAction();
  }

  render() {
    var showDialog = this.props.showLoginDialog;

    if (showDialog === undefined) {
      showDialog = false;
    }

    const user = this.props.user;

    let LogButton;

    if (user) {
      LogButton = (
        <Button
          id="LogoutButton"
          className="LogButton"
          variant="outline-primary"
          onClick={this.handleLogout}
        >
          LogOut
        </Button>
      );
    } else {
      LogButton = (
        <Button
          id="OpenLoginDialogButton"
          variant="primary"
          className="LogButton"
          onClick={this.handleShow}
        >
          Login
        </Button>
      );
    }

    return (
      <div>
        {LogButton}

        <Modal show={showDialog} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  id="LoginUserIDInput"
                  type="text"
                  placeholder="User ID"
                  name="userID"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  id="LoginPasswordInput"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                id="LoginButton"
                variant="primary"
                type="submit"
                className="Button"
                onClick={this.handleSubmit}
              >
                Anmelden
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
      hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
      authenticateUserAction: authenticationActions.authenticateUser,
      logOutAction: authenticationActions.getLogOutAction,
    },
    dispatch
  );

const ConnectedUserSessionWidget = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSessionWidget);

export default ConnectedUserSessionWidget;
