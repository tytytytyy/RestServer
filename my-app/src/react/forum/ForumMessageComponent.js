import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import likeImg from "../../layout/img/like.png";
import likedImg from "../../layout/img/liked.png";

import * as ForumMessageService from "../../redux/service/ForumMessageService";

const mapStateToProps = (state) => {
  return state;
};

class ForumMessageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.currentMessage,
      currentThread: this.props.currentMessageThread,
      likeCount: 0,
      liked: false,
    };
    this.handleShowDeleteMessageDialog =
      this.handleShowDeleteMessageDialog.bind(this);
    this.handleCloseDeleteMessageDialog =
      this.handleCloseDeleteMessageDialog.bind(this);
    this.handleDeleteMessage = this.handleDeleteMessage.bind(this);

    this.handleShowEditMessage = this.handleShowEditMessage.bind(this);
    this.handleCloseEditMessage = this.handleCloseEditMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMessageEdit = this.handleMessageEdit.bind(this);

    this.likeMessage = this.likeMessage.bind(this);
  }

  handleShowDeleteMessageDialog(e) {
    e.preventDefault();
    this.setState({ showMessageDeleteDialog: true });
  }

  handleCloseDeleteMessageDialog() {
    this.setState({ showMessageDeleteDialog: false });
  }

  handleDeleteMessage() {
    const messageID = this.props.currentMessage._id;
    const threadID = this.props.currentMessage.threadID;
    const { deleteMessageAction } = this.props;
    var data = deleteMessageAction(this.props.accessToken, messageID, threadID);
    this.setState({ showMessageDeleteDialog: false });
    const currentThreadID = this.props.currentMessageThread._id;
    const { getForumMessagesAction } = this.props;
    getForumMessagesAction(this.props.accessToken, currentThreadID);
  }

  handleShowEditMessage(e) {
    e.preventDefault();
    this.setState({ showEditMessageDialog: true });
  }

  handleCloseEditMessage() {
    this.setState({ showEditMessageDialog: false });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleMessageEdit(e) {
    e.preventDefault();
    const title = this.state.title;
    const text = this.state.text;
    const threadID = this.state.currentThread._id;
    const { editMessageAction } = this.props;
    editMessageAction(this.props.accessToken, title, text, threadID);
  }

  likeMessage() {
    let newLikeCount;
    let localLiked = this.state.liked;
    localLiked = !localLiked;
    this.setState({ liked: localLiked });

    if (this.state.liked == false) {
      newLikeCount = this.state.likeCount + 1;
      this.setState({
        likeCount: newLikeCount,
      });
    } else {
      newLikeCount = this.state.likeCount - 1;
      this.setState({
        likeCount: newLikeCount,
      });
    }
  }

  render() {
    let threadEditButtonId = "EditButton" + this.props.currentMessageThread._id;
    let threadDeleteButtonId =
      "DeleteButton" + this.props.currentMessageThread._id;
    let ViewForumThreadButton =
      "ViewForumThreadButton" + this.props.currentMessageThread._id;
    let ForumThreadRoute = "/ForumThread" + this.props.currentMessageThread._id;

    let showEditThreadDialog = this.state.showEditThreadDialog;

    if (showEditThreadDialog === undefined) {
      showEditThreadDialog = false;
    }

    var showMessageDeleteDialog = this.state.showMessageDeleteDialog;

    if (showMessageDeleteDialog == undefined) {
      showMessageDeleteDialog = false;
    }

    let deleteDialog = (
      <Modal
        show={showMessageDeleteDialog}
        onHide={this.handleCloseDeleteMessageDialog}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thread löschen</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Willst du die Nachricht wirklich löschen?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            id="DeleteForumMessageCancel"
            variant="secondary"
            onClick={this.handleCloseDeleteMessageDialog}
          >
            abbrechen
          </Button>
          <Button
            id="DeleteForumMessageConfirm"
            variant="primary"
            onClick={this.handleDeleteMessage}
          >
            bestätigen
          </Button>
        </Modal.Footer>
      </Modal>
    );

    let showEditMessageDialog = this.state.showEditMessageDialog;

    if (showEditMessageDialog === undefined) {
      showEditMessageDialog = false;
    }

    let editMessageModal = (
      <Modal show={showEditMessageDialog} onHide={this.handleCloseEditMessage}>
        <Modal.Header closeButton>
          <Modal.Title>Message bearbeiten</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Titel</Form.Label>
              <Form.Control
                id="ForumThreadNameInput"
                type="text"
                placeholder={this.props.currentMessage.title}
                name="title"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Text</Form.Label>
              <Form.Control
                id="ForumThreadDescriptionInput"
                type="text"
                placeholder={this.props.currentMessage.text}
                name="description"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Button
              id="SaveForumThreadButton"
              variant="primary"
              onClick={this.handleCloseEditMessage}
              className="Button"
            >
              Nachricht bearbeiten
            </Button>

            <Button
              id="CancelEditForumThreadButton"
              variant="secondary"
              onClick={this.handleCloseEditMessage}
              className="Button"
            >
              abbrechen
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );

    let likeButton = (
      <Button
        id="LikeButton"
        className="Button"
        variant="primary"
        onClick={this.likeMessage}
      >
        <img src={likeImg} className="likeButtonImg" />
        {this.state.likeCount}
      </Button>
    );

    if (this.state.liked) {
      likeButton = (
        <Button
          id="LikeButton"
          className="Button"
          variant="primary"
          onClick={this.likeMessage}
        >
          <img src={likedImg} className=" likeButtonImg" />
          {this.state.likeCount}
        </Button>
      );
    }

    return (
      <div>
        {deleteDialog}
        {editMessageModal}
        <Card className="cardItem">
          <Card.Body>
            <Card.Title>{this.props.currentMessage.title}</Card.Title>
            <Card.Text>{this.props.currentMessage.text}</Card.Text>
            <Card.Text>{this.props.currentMessage.authorID}</Card.Text>

            <Button
              variant="outline-secondary"
              id={threadEditButtonId}
              onClick={this.handleShowEditMessage}
              className="Button"
            >
              Bearbeiten
            </Button>

            <Button
              variant="outline-danger"
              id={threadDeleteButtonId}
              onClick={this.handleShowDeleteMessageDialog}
              className="Button delete"
            >
              Löschen
            </Button>

            {likeButton}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      deleteMessageAction: ForumMessageService.deleteMessageAction,
      getForumMessagesAction: ForumMessageService.getAllForumMessages,
      //editMessageAction: ForumMessageService.editMessageAction,
      getForumMessagesAction: ForumMessageService.getAllForumMessages,
    },
    dispatch
  );

const ConnectedForumMessageComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForumMessageComponent);

export default ConnectedForumMessageComponent;
