import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ForumThreadComponent from "./ForumThreadComponent";

import * as ForumThreadService from "../../redux/service/ForumThreadService";

const mapStateToProps = (state) => {
  return state;
};

class ForumThreadManagment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
    };
    this.openCreateThreadModal = this.openCreateThreadModal.bind(this);
    this.closeCreateThreadModal = this.closeCreateThreadModal.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.submitNewThread = this.submitNewThread.bind(this);
  }

  componentDidMount() {
    const { getForumThreadAction } = this.props;
    const data = getForumThreadAction(this.props.accessToken);
  }

  openCreateThreadModal(e) {
    e.preventDefault();
    this.setState({ showNewThreadDialog: true });
  }

  closeCreateThreadModal() {
    this.setState({ showNewThreadDialog: false });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  submitNewThread(e) {
    e.preventDefault();
    console.log(this.state);
    const { name, description } = this.state;
    const owner = this.props.userID;
    const { submitNewThreadAction } = this.props;
    submitNewThreadAction(this.props.accessToken, owner, name, description);
    this.setState({ showNewThreadDialog: false });
    const { getForumThreadAction } = this.props;
    getForumThreadAction(this.props.accessToken);
  }

  render() {
    let threads = this.props.threads;
    let forumThreadList;
    let id;

    if (!threads) {
      forumThreadList = <p>Keine ForenThreads sind vorhanden.</p>;
    } else {
      forumThreadList = threads.map(
        (currentThread) => (
          (id = "ForumThread" + currentThread._id),
          (
            <ForumThreadComponent
              id={id}
              key={id}
              currentThread={currentThread}
              className="card ThreadCard forumThread"
            />
          )
        )
      );
    }

    var showNewThreadDialog = this.state.showNewThreadDialog;

    if (showNewThreadDialog == undefined) {
      showNewThreadDialog = false;
    }

    let creatThreadModal = (
      <Modal show={showNewThreadDialog} onHide={this.closeCreateThreadModal}>
        <Modal.Header closeButton>
          <Modal.Title>Erstelle einen Forum Thread</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                id="ForumThreadNameInput"
                type="text"
                placeholder="Name"
                name="name"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Beschreibung</Form.Label>
              <Form.Control
                id="ForumThreadDescriptionInput"
                type="text"
                placeholder="Beschreibung"
                name="description"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Button
              id="CreateForumThreadButton"
              variant="primary"
              type="submit"
              onClick={this.submitNewThread}
              className="Button"
            >
              Thread anlegen
            </Button>

            <Button
              id="CancelCreateForumThreadButton"
              variant="secondary"
              onClick={this.closeCreateThreadModal}
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
        {creatThreadModal}
        <section>
          <div>
            <div>
              <h1>Forum Threads</h1>
              <p>
                Das ist der Bereich in dem alle Forum Threads zu sehen sind.
              </p>
            </div>
            <div id="ForumThreadList" className="card-columns">
              {forumThreadList}
            </div>
          </div>

          <Button
            id="OpenCreateForumThreadDialogButton"
            variant="outline-secondary"
            className="Button"
            onClick={this.openCreateThreadModal}
          >
            neuen Thread anlegen
          </Button>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getForumThreadAction: ForumThreadService.getAllForumThreads,
      submitNewThreadAction: ForumThreadService.getNewForumThread,
    },
    dispatch
  );

const ConnectedForumThreadManagment = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForumThreadManagment);

export default ConnectedForumThreadManagment;
