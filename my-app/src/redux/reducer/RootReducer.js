import * as authenticationActions from "../actions/AuthenticationActions";
import * as UserService from "../service/UserService";
import * as ForumThreadService from "../service/ForumThreadService";
import * as ForumMessageService from "../service/ForumMessageService";

import jwt_decode from "jwt-decode";

const initaialState = {
  user: null,
  loginPending: false,
  showLoginDialog: false,
  showNewThreadDialog: false,
  showEditThreadDialog: false,
  error: null,
  currentThread: null,
};

function rootReducer(state = initaialState, action) {
  console.log("Bin im RootReducer: " + action.type);

  switch (action.type) {
    case authenticationActions.SHOW_LOGIN_DIALOG:
      return {
        ...state,
        showLoginDialog: true,
        error: null,
      };

    case authenticationActions.HIDE_LOGIN_DIALOG:
      return {
        ...state,
        showLoginDialog: false,
        error: null,
      };

    case authenticationActions.AUTHENTICATION_SUCESS:
      var administratorStatus;

      var decoded = jwt_decode(action.accessToken);

      console.log("Token decoded: ", decoded);

      console.log("Prüfe Admin Status");

      if (decoded.isAdministrator == true) {
        console.log("Der User ist Admin!");
        administratorStatus = true;
      } else {
        console.log("Kein Admin. Eingschränkter Zugriff!");
        administratorStatus = false;
      }

      return {
        ...state,
        showLoginDialog: false,
        pending: false,
        user: action.user,
        accessToken: action.accessToken,
        isAdministrator: administratorStatus,
      };

    case authenticationActions.AUTHENTICATION_ERROR:
      return {
        ...state,
        pending: false,
        error: "Authentication failed",
      };
    case authenticationActions.AUTHENTICATION_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case authenticationActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case UserService.SHOW_CREATE_USER_DIALOG:
      return {
        ...state,
        showCreateUserDialog: true,
        error: null,
      };

    case UserService.HIDE_CREATE_USER_DIALOG:
      return {
        ...state,
        showCreateUserDialog: false,
        error: null,
      };
    case UserService.SHOW_EDIT_DIALOG:
      return {
        ...state,
        showEditDialog: true,
        error: null,
      };

    case UserService.HIDE_EDIT_DIALOG:
      return {
        ...state,
        showEditDialog: false,
        error: null,
      };
    case UserService.GET_USERS_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };

    case UserService.GET_USERS_ERROR:
      return {
        ...state,
        pending: false,
        error: "Load all Users failed",
      };
    case UserService.GET_USERS_SUCESS:
      return {
        ...state,
        pending: false,
        users: action.users,
        error: null,
      };
    case UserService.CREATE_USER_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };

    case UserService.CREATE_USER_ERROR:
      return {
        ...state,
        pending: false,
        error: "Create User failed",
      };
    case UserService.CREATE_USER_SUCESS:
      return {
        ...state,
        pending: false,
        error: null,
        showCreateUserDialog: false,
      };

    case UserService.DELETE_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };

    case UserService.DELETE_ERROR:
      return {
        ...state,
        pending: false,
        error: "Delete User failed",
      };
    case UserService.DELETE_SUCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };

    case UserService.EDIT_USER_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };

    case UserService.EDIT_USER_ERROR:
      return {
        ...state,
        pending: false,
        error: "Edit User failed",
      };

    case UserService.EDIT_USER_SUCESS:
      return {
        ...state,
        pending: false,
        error: null,
        showEditDialog: false,
      };

    case ForumThreadService.GET_THREADS_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case ForumThreadService.GET_THREADS_ERROR:
      return {
        ...state,
        pending: false,
        error: "Load all Threads failed",
      };
    case ForumThreadService.GET_THREADS_SUCESS:
      return {
        ...state,
        pending: false,
        threads: action.threads,
        error: null,
      };
    case ForumThreadService.NEW_THREAD_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case ForumThreadService.NEW_THREAD_ERROR:
      return {
        ...state,
        pending: false,
        error: "Create new Thread failed",
      };
    case ForumThreadService.NEW_THREAD_SUCESS:
      return {
        ...state,
        pending: false,
        error: null,
        showNewThreadDialog: false,
      };
    case ForumThreadService.EDIT_THREAD_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case ForumThreadService.EDIT_THREAD_ERROR:
      return {
        ...state,
        pending: false,
        error: "Edit Thread failed",
      };
    case ForumThreadService.EDIT_THREAD_SUCESS:
      return {
        ...state,
        pending: false,
        error: null,
        showEditThreadDialog: false,
      };
    case ForumThreadService.DELETE_THREAD_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case ForumThreadService.DELETE_THREAD_ERROR:
      return {
        ...state,
        pending: false,
        error: "Delete Thread failed",
      };
    case ForumThreadService.DELETE_THREAD_SUCESS:
      return {
        ...state,
        pending: false,
        error: null,
        showThreadDeleteDialog: false,
      };
    case ForumThreadService.SAVE_CURRENT_THREAD:
      console.log(action);
      console.log(action.thread);

      return {
        ...state,
        pending: false,
        error: null,
        currentMessageThread: action.thread,
      };

    case ForumMessageService.GET_MESSAGES_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case ForumMessageService.GET_MESSAGES_ERROR:
      return {
        ...state,
        pending: false,
        error: "Load all Messages failed",
      };
    case ForumMessageService.GET_MESSAGES_SUCESS:
      return {
        ...state,
        pending: false,
        messages: action.messages,
        error: null,
      };
    case ForumMessageService.DELETE_MESSAGE_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case ForumMessageService.DELETE_MESSAGE_ERROR:
      return {
        ...state,
        pending: false,
        error: "Delete Message failed",
      };
    case ForumMessageService.DELETE_MESSAGE_SUCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };

    default:
      return state;
  }
}

export default rootReducer;
