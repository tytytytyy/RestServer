import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ForumMessageComponent from "./ForumMessageComponent";
import { LinkContainer } from "react-router-bootstrap";

import * as ForumMessageService from "../../redux/service/ForumMessageService";

const mapStateToProps = (state) => {
  return state;
};

class ForumMessagesManagment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentThread: this.props.currentMessageThread,
    };
    this.openCreateMessageModal = this.openCreateMessageModal.bind(this);
    this.closeCreateMessageModal = this.closeCreateMessageModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitNewMessage = this.submitNewMessage.bind(this);
  }

  componentDidMount() {
    if (this.props.currentMessageThread._id != undefined) {
      const currentThreadID = this.props.currentMessageThread._id;
      const { getForumMessagesAction } = this.props;
      const data = getForumMessagesAction(
        this.props.accessToken,
        currentThreadID
      );
    } else {
      console.log("No thread was found");
    }
  }

  openCreateMessageModal(e) {
    e.preventDefault();
    this.setState({ showNewMessageDialog: true });
  }

  closeCreateMessageModal() {
    this.setState({ showNewMessageDialog: false });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  submitNewMessage(e) {
    e.preventDefault();
    console.log(this.state);
    const { title, text } = this.state;
    const authorID = this.props.userID;
    const forumThreadID = this.props.currentMessageThread._id;
    const { submitNewMessageAction } = this.props;
    submitNewMessageAction(
      this.props.accessToken,
      title,
      text,
      authorID,
      forumThreadID
    );
    this.setState({ showNewMessageDialog: false });
    const { getForumMessagesAction } = this.props;
    getForumMessagesAction(this.props.accessToken, forumThreadID);
  }

  render() {
    let messages = this.props.messages;
    let ListofForumMessages;
    let id;

    if (!messages) {
      ListofForumMessages = <p>Keine Foreneinträge sind vorhanden.</p>;
    } else {
      ListofForumMessages = messages.map(
        (currentMessage) => (
          (id = "ForumMessage" + currentMessage._id),
          (
            <ForumMessageComponent
              id={id}
              key={currentMessage._id}
              currentMessage={currentMessage}
              className="card MessageCard forumMessage"
            />
          )
        )
      );
    }

    var showNewMessageDialog = this.state.showNewMessageDialog;

    if (showNewMessageDialog == undefined) {
      showNewMessageDialog = false;
    }

    let creatMessageModal = (
      <Modal show={showNewMessageDialog} onHide={this.closeCreateMessageModal}>
        <Modal.Header closeButton>
          <Modal.Title>Erstelle eine Forumnachricht</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Titel</Form.Label>
              <Form.Control
                id="ForumMessageTitleInput"
                type="text"
                placeholder="Titel"
                name="title"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Text</Form.Label>
              <Form.Control
                id="ForumMessageTextInput"
                type="text"
                placeholder="Text"
                name="text"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Button
              id="CreateForumMessageButton"
              variant="primary"
              type="submit"
              onClick={this.submitNewMessage}
              className="Button"
            >
              Thread anlegen
            </Button>

            <Button
              id="CancelCreateForumMessageButton"
              variant="secondary"
              onClick={this.closeCreateMessageModal}
              className="Button"
            >
              abbrechen
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );

    return (
      <div style={{ background: "white" }}>
        {creatMessageModal}
        <section className="portfolio-block block-intro">
          <div className="container">
            <div className="about-me">
              <h1>Forum Messages</h1>
              <p>
                Das ist der Bereich alle Forumeinträge zu sehen. Aus
                Forumthread: {this.state.currentThread.name}
              </p>
            </div>
            <div id="ForumMessageList" className="card-columns">
              {ListofForumMessages}
            </div>
          </div>

          <LinkContainer to="/forumPage" id="ViewForumThreadButton">
            <Button id="GoBackButton" variant="secondary" className="Button">
              zurück zu Forum Threads
            </Button>
          </LinkContainer>

          <Button
            id="OpenCreateForumMessageDialogButton"
            variant="outline-secondary"
            className="Button"
            onClick={this.openCreateMessageModal}
          >
            neuen Eintrag anlegen
          </Button>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getForumMessagesAction: ForumMessageService.getAllForumMessages,
      submitNewMessageAction: ForumMessageService.getNewForumMessage,
    },
    dispatch
  );

const ConnectedForumMessagesManagment = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForumMessagesManagment);

export default ConnectedForumMessagesManagment;
