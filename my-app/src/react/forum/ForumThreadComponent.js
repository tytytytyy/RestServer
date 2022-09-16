import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Link } from "react-router-dom";

import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import * as ForumThreadService from "../../redux/service/ForumThreadService";

const mapStateToProps = (state) => {
  return state;
};

class ForumThreadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thread: this.props.currentThread,
    };

    this.showThreadEdit = this.showThreadEdit.bind(this);
    this.closeThreadEdit = this.closeThreadEdit.bind(this);
    this.handleThreadEdit = this.handleThreadEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleThreadDelete = this.handleThreadDelete.bind(this);
    this.showDeleteThreadDialog = this.showDeleteThreadDialog.bind(this);
    this.closeDeleteThreadDialog = this.closeDeleteThreadDialog.bind(this);
    this.openMessages = this.openMessages.bind(this);
  }

  showThreadEdit(e) {
    e.preventDefault();
    this.setState({ showEditThreadDialog: true });
  }

  closeThreadEdit() {
    this.setState({ showEditThreadDialog: false });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleThreadEdit(e) {
    e.preventDefault();
    const name = this.state.name;
    const description = this.state.description;
    const threadID = this.state.thread._id;
    const { editThreadAction } = this.props;
    editThreadAction(this.props.accessToken, name, description, threadID);
    this.setState({ showEditThreadDialog: false });
    const { getForumThreadAction } = this.props;
    getForumThreadAction(this.props.accessToken);
  }

  showDeleteThreadDialog(e) {
    e.preventDefault();
    this.setState({ showThreadDeleteDialog: true });
  }

  closeDeleteThreadDialog() {
    this.setState({ showThreadDeleteDialog: false });
  }

  handleThreadDelete() {
    const threadID = this.state.thread._id;
    const { deleteThreadAction } = this.props;
    deleteThreadAction(this.props.accessToken, threadID);
    this.setState({ showThreadDeleteDialog: false });
    const { getForumThreadAction } = this.props;
    getForumThreadAction(this.props.accessToken);
  }

  openMessages() {
    console.log("Thread", this.state.thread);
    const thread = this.state.thread;
    const { saveCurrentThread } = this.props;
    saveCurrentThread(thread);
  }

  render() {
    let threadEditButtonId =
      "EditForumThreadButton" + this.props.currentThread._id;
    let threadDeleteButtonId =
      "DeleteForumThreadButton" + this.props.currentThread._id;
    let ViewForumThreadButton =
      "ViewForumThreadButton" + this.props.currentThread._id;

    let showEditThreadDialog = this.state.showEditThreadDialog;

    if (showEditThreadDialog === undefined) {
      showEditThreadDialog = false;
    }

    let editThreadModal = (
      <Modal show={showEditThreadDialog} onHide={this.closeThreadEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Thread bearbeiten</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                id="ForumThreadNameInput"
                type="text"
                placeholder={this.props.currentThread.name}
                name="name"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                id="ForumThreadDescriptionInput"
                type="text"
                placeholder={this.props.currentThread.description}
                name="description"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Button
              id="SaveForumThreadButton"
              variant="primary"
              type="submit"
              onClick={this.handleThreadEdit}
            >
              Thread bearbeiten
            </Button>

            <Button
              id="CancelEditForumThreadButton"
              variant="secondary"
              onClick={this.closeThreadEdit}
              className="Button"
            >
              abbrechen
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );

    var showThreadDeleteDialog = this.state.showThreadDeleteDialog;

    if (showThreadDeleteDialog == undefined) {
      showThreadDeleteDialog = false;
    }

    let deleteDialog = (
      <Modal show={showThreadDeleteDialog} onHide={this.closeThreadDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thread löschen</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Willst du den Thread wirklich löschen?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            id="DeleteForumThreadCancel"
            variant="secondary"
            onClick={this.closeThreadDeleteModal}
          >
            abbrechen
          </Button>
          <Button
            id="DeleteForumThreadConfirm"
            variant="primary"
            onClick={this.handleThreadDelete}
          >
            bestätigen
          </Button>
        </Modal.Footer>
      </Modal>
    );

    return (
      <div>
        {editThreadModal}
        {deleteDialog}

        <Card className="cardItem">
          <Card.Body>
            <Card.Title>{this.props.currentThread.name}</Card.Title>
            <Card.Text>{this.props.key}</Card.Text>
            <Card.Text>
              {this.props.currentThread.description} <br />
              {this.props.currentThread.ownerID}
              <br />
              {this.props.currentThread._id}
            </Card.Text>

            <Button
              id={ViewForumThreadButton}
              variant="primary"
              className="Button"
              onClick={this.openMessages}
            >
              <Link to="/forumMessages" className="Link">
                Nachrichten anzeigen
              </Link>
            </Button>
            <Button
              variant="outline-secondary"
              id={threadEditButtonId}
              onClick={this.showThreadEdit}
              className="Button"
            >
              Bearbeiten
            </Button>
            <Button
              variant="outline-danger"
              id={threadDeleteButtonId}
              onClick={this.showDeleteThreadDialog}
              className="Button delete"
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
      editThreadAction: ForumThreadService.editThreadAction,
      deleteThreadAction: ForumThreadService.deleteThreadAction,
      saveCurrentThread: ForumThreadService.saveCurrentThread,
      getForumThreadAction: ForumThreadService.getAllForumThreads,
    },
    dispatch
  );

const ConnectedForumThreadComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForumThreadComponent);

export default ConnectedForumThreadComponent;
