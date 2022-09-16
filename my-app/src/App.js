import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { connect } from "react-redux";

import logo from "./logo.svg";
import "./App.css";
//import ClockClass from './react/components/clockClass';

import TopMenu from "./react/components/TopMenu";
import PublicPage from "./react/components/PublicPage";
import PrivatePage from "./react/components/PrivatePage";
import LandingPage from "./react/components/LandingPage";
import NoAuthenticationPage from "./react/components/NoAuthenticationPage";

import UserManagement from "./react/user/UserManagment";
import ForumThreadManagement from "./react/forum/ForumThreadManagement";
import ForumMessagesManagment from "./react/forum/ForumMessagesManagment";

import { Routes, Route } from "react-router-dom";

const mapStateToProps = (state) => {
  return state;
};

class App extends Component {
  render() {
    const user = this.props.user;

    let workspace;
    let userManagement;
    let forumThreadManagement;
    let forumMessagesManagment;

    if (user) {
      workspace = <PrivatePage />;
      userManagement = <UserManagement/>;
      forumThreadManagement = <ForumThreadManagement/>;
      forumMessagesManagment = <ForumMessagesManagment/>
    } else {
      workspace = <LandingPage />;
      forumMessagesManagment = <NoAuthenticationPage/>;
      forumThreadManagement = <NoAuthenticationPage/>;
      userManagement = <NoAuthenticationPage/>;
    }

    return (
      <div className="App">
        <TopMenu />
        <Routes>
          <Route path="/" element={workspace} exact />
          <Route path="/userManagement" element={userManagement} />
          <Route path="/forumPage" element={forumThreadManagement} />
          <Route path="/forumMessages" element={forumMessagesManagment} />
        </Routes>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
