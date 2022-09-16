import base64 from "base-64";

export const SHOW_LOGIN_DIALOG = "SHOW_LOGIN_DIALOG";
export const HIDE_LOGIN_DIALOG = "HIDE_LOGIN_DIALOG";

export const AUTHENTICATION_PENDING = "AUTHENTICATION_PENDING";
export const AUTHENTICATION_SUCESS = "AUTHENTICATION_SUCESS";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";

export const LOGOUT = "LOGOUT";

export function getShowLoginDialogAction() {
  return {
    type: SHOW_LOGIN_DIALOG,
  };
}

export function getHideLoginDialogAction() {
  return {
    type: HIDE_LOGIN_DIALOG,
  };
}

export function getAuthenticateUserPendingAction() {
  return {
    type: AUTHENTICATION_PENDING,
  };
}

export function getAuthenticationSuccessAction(userSession) {
  return {
    type: AUTHENTICATION_SUCESS,
    user: userSession.user,
    accessToken: userSession.accessToken,
  };
}

export function getAuthenticationErrorAction(error) {
  return {
    type: AUTHENTICATION_ERROR,
    error: error,
  };
}

export function getLogOutAction(error) {
  return {
    type: LOGOUT,
    user: null,
    accessToken: null,
  };
}

export function authenticateUser(userID, password) {
  return (dispatch) => {
    dispatch(getAuthenticateUserPendingAction());
    login(userID, password)
      .then(
        (userSession) => {
          dispatch(getAuthenticationSuccessAction(userSession));
        },
        (error) => {
          console.log(error);

          dispatch(getAuthenticationErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getAuthenticationErrorAction(error));
        console.log(error);
      });
  };
}

function login(userID, password) {
  const requestOptions = {
    method: "GET",
    //headers: { Authorization : "Basic YWRtaW46MTIz"}
    headers: {
      Authorization: "Basic " + base64.encode(userID + ":" + password),
    },
  };

  console.log(requestOptions.headers);

  return fetch("https://localhost/authenticate", requestOptions) //welches Format soll request option haben
    .then(handleResponse)
    .then((userSession) => {
      return userSession;
    });
}

function handleResponse(response) {
  const authorizationHeader = response.headers.get("Authorization");

  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    var token;

    if (authorizationHeader) {
      token = authorizationHeader.split(" ")[1];
    }

    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    } else {
      let userSession = {
        user: data,
        accessToken: token,
      };

      return userSession;
    }
  });
}

export function logout() {
  console.log("Should log out");
  getLogOutAction();
  console.log("Logged out");
}
