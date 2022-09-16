import base64 from "base-64";
import jwt_decode from "jwt-decode";

export const SHOW_CREATE_USER_DIALOG = "SHOW_CREATE_USER_DIALOG";
export const HIDE_CREATE_USER_DIALOG = "HIDE_CREATE_USER_DIALOG";

export const CREATE_USER_PENDING = "CREATE_USER_PENDING";
export const CREATE_USER_ERROR = "CREATE_USER_ERROR";
export const CREATE_USER_SUCESS = "CREATE_USER_SUCESS";

export const EDIT_USER_PENDING = "EDIT_USER_PENDING";
export const EDIT_USER_ERROR = "EDIT_USER_ERROR";
export const EDIT_USER_SUCESS = "EDIT_USER_SUCESS";

export const GET_USERS_PENDING = "GET_USERS_PENDING";
export const GET_USERS_ERROR = "GET_USERS_ERROR";
export const GET_USERS_SUCESS = "GET_USERS_SUCESS";

export const DELETE_PENDING = "DELETE_PENDING";
export const DELETE_ERROR = "DELETE_ERROR";
export const DELETE_SUCESS = "DELETE_SUCESS";

export const SHOW_EDIT_DIALOG = "SHOW_EDIT_DIALOG";
export const HIDE_EDIT_DIALOG = "HIDE_EDIT_DIALOG";

export function getShowCreateUserDialogAction() {
  return {
    type: SHOW_CREATE_USER_DIALOG,
  };
}

export function getHideCreateUserDialogAction() {
  return {
    type: HIDE_CREATE_USER_DIALOG,
  };
}

export function getShowEditDialogAction(currentUser) {
  return {
    type: SHOW_EDIT_DIALOG,
  };
}

export function getHideEditDialogAction() {
  return {
    type: HIDE_EDIT_DIALOG,
  };
}

export function getCreateUserPendingAction() {
  return {
    type: CREATE_USER_PENDING,
  };
}

export function getCreateUserErrorAction(error) {
  return {
    type: CREATE_USER_ERROR,
    error: error,
  };
}

export function getCreateUserSucessAction(error) {
  return {
    type: CREATE_USER_SUCESS,
  };
}

export function getAllUsersPendingAction(error) {
  return {
    type: GET_USERS_PENDING,
  };
}

export function getAllUsersErrorAction(error) {
  return {
    type: GET_USERS_ERROR,
    error: error,
  };
}

export function getAllUsersSucessAction(users) {
  return {
    type: GET_USERS_SUCESS,
    users: users,
  };
}

export function getDeletePendingAction(error) {
  return {
    type: DELETE_PENDING,
  };
}

export function getDeleteErrorAction(error) {
  return {
    type: DELETE_ERROR,
    error: error,
  };
}

export function getDeleteSucessAction(users) {
  return {
    type: DELETE_SUCESS,
  };
}

export function getEditUserPendingAction() {
  return {
    type: EDIT_USER_PENDING,
  };
}

export function getEditUserErrorAction(error) {
  return {
    type: EDIT_USER_ERROR,
    error: error,
  };
}

export function getEditUserSucessAction(error) {
  return {
    type: EDIT_USER_SUCESS,
  };
}

/*List Users*/

export function getAllUsers(token) {
  return (dispatch) => {
    dispatch(getAllUsersPendingAction());
    getUsers(token)
      .then(
        (users) => {
          dispatch(getAllUsersSucessAction(users));
        },
        (error) => {
          console.log(error);

          dispatch(getAllUsersErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getAllUsersErrorAction(error));
        console.log(error);
      });
  };
}

function getUsers(token) {
  console.log("token", token);
  const requestOptions = {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  };

  console.log("Request Header", requestOptions);

  return fetch("https://localhost/users", requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function handleResponse(response) {
  const authorizationHeader = response.headers.get("Authorization");

  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if (response.status === 401) {
        console.log("error");
        return error;
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    } else {
      console.log(data);
      return data;
    }
  });
}

/*Create */

export function submitNewUserAction(
  token,
  userID,
  userName,
  password,
  isAdministrator
) {
  console.log("Try to create new User");

  return (dispatch) => {
    dispatch(getCreateUserPendingAction());
    createUser(token, userID, userName, password, isAdministrator)
      .then(
        (users) => {
          dispatch(getCreateUserSucessAction(users));
        },
        (error) => {
          console.log(error);

          dispatch(getCreateUserErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getCreateUserErrorAction(error));
        console.log(error);
      });
  };
}

function createUser(token, userID, userName, password, isAdministrator) {
  if (isAdministrator == undefined) {
    isAdministrator = false;
  }
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },

    body: JSON.stringify({
      userID,
      password,
      userName,
      isAdministrator,
    }),
  };

  console.log("Request", requestOptions);

  return fetch("https://localhost/users", requestOptions)
    .then(handleCreate)
    .then((response) => {
      return response;
    });
}

function handleCreate(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    console.log("created: ", data);

    if (!response.ok) {
      if (response.status === 401) {
        console.log("error");
        return error;
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    } else {
      return data;
    }
  });
}

/*Delete */

export function delteUserAction(token, userID, userName, password) {
  console.log("Try to delete User");

  return (dispatch) => {
    dispatch(getDeletePendingAction());
    deleteUser(token, userID)
      .then(
        (users) => {
          dispatch(getDeleteSucessAction(users));
        },
        (error) => {
          console.log(error);

          dispatch(getDeleteErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getDeleteErrorAction(error));
        console.log(error);
      });
  };
}

function deleteUser(token, userID) {
  console.log("Token: ", token);
  console.log("userid: ", userID);

  const requestOptions = {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  };

  console.log("Request", requestOptions);
  console.log("URl", "https://localhost/users/" + userID);

  return fetch("https://localhost/users/" + userID, requestOptions)
    .then(handleDelete)
    .then((response) => {
      return response;
    });
}

function handleDelete(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    console.log("Deleted", data);

    if (!response.ok) {
      if (response.status === 401) {
        console.log("error");
        return error;
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    } else {
      return "Deleted User";
    }

    return data;
  });
}

/*Edit */

export function editUserAction(
  token,
  userID,
  userName,
  password,
  IsAdministrator
) {
  console.log("Try to edit User");

  return (dispatch) => {
    dispatch(getEditUserPendingAction());
    editUser(token, userID, userName, password, IsAdministrator)
      .then(
        (user) => {
          dispatch(getEditUserSucessAction(user));
        },
        (error) => {
          console.log(error);

          dispatch(getEditUserErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getEditUserErrorAction(error));
        console.log(error);
      });
  };
}

function editUser(token, userID, userName, password, isAdministrator) {
  let requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      userID,
      password,
      userName,
      isAdministrator,
    }),
  };

  if (password == undefined) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userID,
        userName,
        isAdministrator,
      }),
    };
  }

  if (userName == undefined) {
    requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userID,
        password,
        isAdministrator,
      }),
    };
  }

  if (isAdministrator == undefined) {
    requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userID,
        userName,
        password,
      }),
    };
  }

  if (userName == undefined && password == undefined) {
    requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userID,
        isAdministrator,
      }),
    };
  }

  if (userName == undefined && isAdministrator == undefined) {
    console.log("no password");
    requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userID,
        password,
      }),
    };
  }

  if (isAdministrator == undefined && password == undefined) {
    console.log("no password");

    requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userID,
        userName,
      }),
    };
  }

  console.log("Request", requestOptions.body);

  let requestURL = "https://localhost/users/" + userID;

  console.log("URL: ", requestURL);

  return fetch(requestURL, requestOptions)
    .then(handleEdit)
    .then((response) => {
      return response;
    });
}

function handleEdit(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    console.log("Edit to: ", data);

    if (!response.ok) {
      if (response.status === 401) {
        console.log("error");
        return error;
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    } else {
      return data;
    }

  });
}
