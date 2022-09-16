export const GET_THREADS_PENDING = "GET_THREADS_PENDING";
export const GET_THREADS_ERROR = "GET_THREADS_ERROR ";
export const GET_THREADS_SUCESS = "GET_THREADS_SUCESS";

export const NEW_THREAD_PENDING = "NEW_THREAD_PENDING";
export const NEW_THREAD_ERROR = "NEW_THREAD_ERROR ";
export const NEW_THREAD_SUCESS = "NEW_THREAD__SUCESS";

export const EDIT_THREAD_PENDING = "EDIT_THREAD_PENDING";
export const EDIT_THREAD_ERROR = "EDIT_THREAD_ERROR ";
export const EDIT_THREAD_SUCESS = "EDIT_THREAD_SUCESS";

export const DELETE_THREAD_PENDING = "DELETE_THREAD_PENDING";
export const DELETE_THREAD_ERROR = "DELETE_THREAD_ERROR ";
export const DELETE_THREAD_SUCESS = "DELETE_THREAD_SUCESS";

export const SAVE_CURRENT_THREAD = "SAVE_CURRENT_THREAD";

export function getAllForumThreadsPendingAction(error) {
  return {
    type: GET_THREADS_PENDING,
  };
}

export function getAllForumThreadsErrorAction(error) {
  return {
    type: GET_THREADS_ERROR,
    error: error,
  };
}

export function getAllForumThreadsSucessAction(threads) {
  return {
    type: GET_THREADS_SUCESS,
    threads: threads,
  };
}

export function getNewForumThreadPendingAction(error) {
  return {
    type: NEW_THREAD_PENDING,
  };
}

export function getNewForumThreadErrorAction(error) {
  return {
    type: NEW_THREAD_ERROR,
    error: error,
  };
}

export function getNewForumThreadSucessAction(thread) {
  return {
    type: NEW_THREAD_SUCESS,
  };
}

export function getEditForumThreadPendingAction(error) {
  return {
    type: EDIT_THREAD_PENDING,
  };
}

export function getEditForumThreadErrorAction(error) {
  return {
    type: EDIT_THREAD_ERROR,
    error: error,
  };
}

export function getEditForumThreadSucessAction(thread) {
  return {
    type: EDIT_THREAD_SUCESS,
  };
}

export function getDeleteForumThreadPendingAction(error) {
  return {
    type: DELETE_THREAD_PENDING,
  };
}

export function getDeleteForumThreadErrorAction(error) {
  return {
    type: DELETE_THREAD_ERROR,
    error: error,
  };
}

export function getDeleteForumThreadSucessAction(thread) {
  return {
    type: DELETE_THREAD_SUCESS,
  };
}

export function getsaveCurrentThread(thread) {
  return {
    type: SAVE_CURRENT_THREAD,
    thread: thread,
  };
}

export function saveCurrentThread(thread) {
  console.log("thread", thread);
  return (dispatch) => {
    dispatch(getsaveCurrentThread(thread));
  };
}

export function getNewForumThread(token, owner, name, description) {
  return (dispatch) => {
    dispatch(getNewForumThreadPendingAction());
    getNewThread(token, owner, name, description)
      .then(
        (thread) => {
          dispatch(getNewForumThreadSucessAction(thread));
        },
        (error) => {
          console.log(error);

          dispatch(getNewForumThreadErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getNewForumThreadErrorAction(error));
        console.log(error);
      });
  };
}

function getNewThread(token, owner, name, description) {
  console.log("token", token);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      owner,
      name,
      description,
    }),
  };

  console.log("Request Header", requestOptions);

  return fetch("https://localhost/forumThreads", requestOptions) //welches Format soll request option haben
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

export function getAllForumThreads(token) {
  return (dispatch) => {
    dispatch(getAllForumThreadsPendingAction());
    getThreads(token)
      .then(
        (threads) => {
          console.log("threads", threads);

          dispatch(getAllForumThreadsSucessAction(threads));
        },
        (error) => {
          console.log(error);

          dispatch(getAllForumThreadsErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getAllForumThreadsErrorAction(error));
        console.log(error);
      });
  };
}

function getThreads(token) {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  };

  console.log("Request Header", requestOptions);

  return fetch("https://localhost/forumThreads", requestOptions) //welches Format soll request option haben
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

export function editThreadAction(token, name, description, threadID) {
  return (dispatch) => {
    dispatch(getEditForumThreadPendingAction());
    console.log("threadid", threadID);

    getEditThread(token, name, description, threadID)
      .then(
        (thread) => {
          dispatch(getEditForumThreadSucessAction(thread));
        },
        (error) => {
          console.log(error);

          dispatch(getEditForumThreadErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getEditForumThreadErrorAction(error));
        console.log(error);
      });
  };
}

function getEditThread(token, name, description, threadID) {
  let requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  };

  if (name == undefined) {
    requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        description,
      }),
    };
  }

  if (description == undefined) {
    requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name,
      }),
    };
  }

  if (description == undefined && name == undefined) {
    requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
  }

  return fetch("https://localhost/forumThreads/" + threadID, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

export function deleteThreadAction(token, threadID) {
  return (dispatch) => {
    dispatch(getDeleteForumThreadPendingAction());
    deleteThread(token, threadID)
      .then(
        (thread) => {
          dispatch(getDeleteForumThreadSucessAction(thread));
        },
        (error) => {
          console.log(error);

          dispatch(getDeleteForumThreadErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getDeleteForumThreadErrorAction(error));
        console.log(error);
      });
  };
}

function deleteThread(token, threadID) {
  console.log("token", token);
  let requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  console.log("Request Header", requestOptions);

  return fetch("https://localhost/forumThreads/" + threadID, requestOptions)
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
