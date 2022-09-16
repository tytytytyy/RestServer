export const GET_MESSAGES_PENDING = "GET_MESSAGES_PENDING";
export const GET_MESSAGES_ERROR = "GET_MESSAGES_ERROR ";
export const GET_MESSAGES_SUCESS = "GET_MESSAGES_SUCESS";

export const NEW_MESSAGE_PENDING = "NEW_MESSAGE_PENDING";
export const NEW_MESSAGE_ERROR = "NEW_MESSAGE_ERROR ";
export const NEW_MESSAGE_SUCESS = "NEW_MESSAGE__SUCESS";

export const DELETE_MESSAGE_PENDING = "DELETE_MESSAGE_PENDING";
export const DELETE_MESSAGE_ERROR = "DELETE_MESSAGE_ERROR ";
export const DELETE_MESSAGE_SUCESS = "DELETE_MESSAGE__SUCESS";

export function getAllForumMessagesPendingAction(error) {
  return {
    type: GET_MESSAGES_PENDING,
  };
}

export function getAllForumMessagesErrorAction(error) {
  return {
    type: GET_MESSAGES_ERROR,
    error: error,
  };
}

export function getAllForumMessagesSucessAction(messages) {
  return {
    type: GET_MESSAGES_SUCESS,
    messages: messages,
  };
}

export function getNewForumMessagePendingAction(error) {
  return {
    type: NEW_MESSAGE_PENDING,
  };
}

export function getNewForumMessageErrorAction(error) {
  return {
    type: NEW_MESSAGE_ERROR,
    error: error,
  };
}

export function getNewForumMessageSucessAction(thread) {
  return {
    type: NEW_MESSAGE_SUCESS,
  };
}

export function getDeleteForumMessagePendingAction(error) {
  return {
    type: DELETE_MESSAGE_PENDING,
  };
}

export function getDeleteForumMessageErrorAction(error) {
  return {
    type: DELETE_MESSAGE_ERROR,
    error: error,
  };
}

export function getDeleteForumMessageSucessAction(message) {
  return {
    type: DELETE_MESSAGE_SUCESS,
  };
}

export function getAllForumMessages(token, threadID) {
  return (dispatch) => {
    dispatch(getAllForumMessagesPendingAction());
    getAllMessages(token, threadID)
      .then(
        (messages) => {
          dispatch(getAllForumMessagesSucessAction(messages));
        },
        (error) => {
          console.log(error);

          dispatch(getAllForumMessagesErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getAllForumMessagesErrorAction(error));
        console.log(error);
      });
  };
}

function getAllMessages(token, threadID) {
  let requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  console.log(
    "Request Header URL",
    "https://localhost/forumThreads/" + threadID + "/forumMessages"
  );

  return fetch(
    "https://localhost/forumThreads/" + threadID + "/forumMessages",
    requestOptions
  )
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

export function getNewForumMessage(token, title, text, authorID, forumID) {
  return (dispatch) => {
    dispatch(getNewForumMessagePendingAction());
    fetchNewMessageRequest(token, title, text, authorID, forumID)
      .then(
        (message) => {
          dispatch(getNewForumMessageSucessAction(message));
        },
        (error) => {
          console.log(error);

          dispatch(getNewForumMessageErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getNewForumMessageErrorAction(error));
        console.log(error);
      });
  };
}

function fetchNewMessageRequest(token, title, text, authorID, forumThreadID) {
  console.log("titel", title);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      title,
      text,
      forumThreadID,
    }),
  };

  console.log("Request Header", requestOptions);

  return fetch("https://localhost/forumMessages", requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

export function deleteMessageAction(token, messageID, threadID) {
  return (dispatch) => {
    dispatch(getDeleteForumMessagePendingAction());
    fetchDeleteMessage(token, messageID)
      .then(
        (message) => {
          dispatch(getDeleteForumMessageSucessAction(message));
        },
        (error) => {
          console.log(error);

          dispatch(getDeleteForumMessageErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getDeleteForumMessageErrorAction(error));
        console.log(error);
      });
  };
}

function fetchDeleteMessage(token, messageID) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  console.log("Request Header", requestOptions);

  return fetch("https://localhost/forumMessages/" + messageID, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

export function editMessageAction(token, title, text, messageID) {
  return (dispatch) => {
    dispatch(getDeleteForumMessagePendingAction());
    fetchEditMessage(token, messageID)
      .then(
        (message) => {
          dispatch(getDeleteForumMessageSucessAction(message));
        },
        (error) => {
          console.log(error);

          dispatch(getDeleteForumMessageErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getDeleteForumMessageErrorAction(error));
        console.log(error);
      });
  };
}

function fetchEditMessage(token, messageID) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  console.log("Request Header", requestOptions);

  return fetch("https://localhost/forumMessages/" + messageID, requestOptions)
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
      return data;
    }
  });
}
