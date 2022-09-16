import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import Card from "react-bootstrap/Card";

import * as UserService from "../../redux/service/UserService";

const mapStateToProps = (state) => {
  return state;
};

class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.currentUser,
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.adminSwitch = this.adminSwitch.bind(this);
  }

  showEdit(e) {
    e.preventDefault();
    this.setState({ showEditDialog: true });
  }

  closeEdit() {
    this.setState({ showEditDialog: false });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleEdit(e) {
    e.preventDefault();
    const password = this.state.password;
    const userName = this.state.userName;
    const IsAdministrator = this.state.IsAdministrator;

    const { editUserAction } = this.props;
    editUserAction(
      this.props.accessToken,
      this.state.user.userID,
      userName,
      password,
      IsAdministrator
    );
    this.setState({ showEditDialog: false });
    const { getUsersAction } = this.props;
    getUsersAction(this.props.accessToken);

  }

  adminSwitch(e) {
    const { name } = e.target;
    const value = e.target.checked;
    this.setState({ [name]: value });
  }

  openDeleteModal(e) {
    e.preventDefault();
    this.setState({ showDeleteDialog: true });
  }

  closeDeleteModal() {
    this.setState({ showDeleteDialog: false });
  }

  handleDelete() {
    const userID = this.state.user.userID;
    const { DeleteUserAction } = this.props;
    DeleteUserAction(this.props.accessToken, userID);
    this.setState({ showDeleteDialog: false });
    const { getUsersAction } = this.props;
 getUsersAction(this.props.accessToken);
  }

  render() {
    let EditButtonId = "EditButton" + this.state.user.userID;
    let DeleteButtonId = "DeleteButton" + this.state.user.userID;

    let showEditDialog = this.state.showEditDialog;

    if (showEditDialog === undefined) {
      showEditDialog = false;
    }

    let editUserModal = (
      <Modal show={showEditDialog} onHide={this.closeEdit}>
        <Modal.Header closeButton>
          <Modal.Title>User bearbeiten</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                id="UserIDInput"
                type="text"
                readOnly="readonly"
                value={this.state.user.userID}
                name="userID"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                id="UserNameInput"
                type="text"
                placeholder={this.state.user.userName}
                name="userName"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="PasswordInput"
                type="password"
                placeholder="*******"
                name="password"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Check className="mb-3 adminSwitch"
              type="switch"
              id="IsAdministratorInput"
              label="Admin Status"
              name="IsAdministrator"
              defaultChecked={this.props.currentUser.isAdministrator}
              onChange={this.adminSwitch}
            />

            <Button
              id="SaveUserButton"
              variant="primary"
              type="submit"
              onClick={this.handleEdit}
            >
              User bearbeiten
            </Button>

            <Button
              id="CancelEditUserButton"
              variant="outline-danger"
              className="Button"
              onClick={this.closeEdit}
            >
              abbrechen
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );

    var showDeleteDialog = this.state.showDeleteDialog;

    if (showDeleteDialog === undefined) {
      showDeleteDialog = false;
    }

    let deleteDialog = (
      <Modal show={showDeleteDialog} onHide={this.closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>User löschen</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Willst du den User wirklich löschen?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            id="DeleteUserCancel"
            variant="secondary"
            onClick={this.closeDeleteModal}
          >
            abbrechen
          </Button>
          <Button
            id="DeleteUserConfirm"
            variant="primary"
            onClick={this.handleDelete}
          >
            bestätigen
          </Button>
        </Modal.Footer>
      </Modal>
    );

    return (
      <div className="cardParent">
        {editUserModal}
        {deleteDialog}
        <Card className="Usercard-cardItem">
          <Card.Body >
             <img src="https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1658003420~hmac=e45d5e4a2ea6003a20ad3dc5b5d71bdc" className="ProfileImage" />
            <Card.Title>{this.props.currentUser.userID}</Card.Title>
            <Card.Text>{this.props.key}</Card.Text>
            <Card.Text></Card.Text>
            <Button
              variant="outline-secondary"
              className="Button"
              id={EditButtonId}
              onClick={this.showEdit}
            >
              Bearbeiten
            </Button>
            <Button
              variant="outline-danger"
              className="Button"
              id={DeleteButtonId}
              onClick={this.openDeleteModal}
            >
              Löschen
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      showEditAction: UserService.getShowEditDialogAction,
      closEditAction: UserService.getHideEditDialogAction,
      editUserAction: UserService.editUserAction,
      DeleteUserAction: UserService.delteUserAction,
      getUsersAction: UserService.getAllUsers

    },
    dispatch
  );

const ConnectedUserComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserComponent);

export default ConnectedUserComponent;
