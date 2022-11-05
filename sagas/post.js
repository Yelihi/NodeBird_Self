import {
  all,
  fork,
  put,
  take,
  takeLatest,
  call,
  delay,
} from "redux-saga/effects";

import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "../reducers/post";

function addPostAPI(data) {
  return axios.post("/api/addpost", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data); // call 은 동기고 fork 는 비동기다. 그러니깐 call 을 해야지 위 axios 결과값을 기다린다.
    yield delay(2000);
    yield put({
      // put = dispatch
      type: ADD_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    // const result = yield call(addPostAPI, action.data); // call 은 동기고 fork 는 비동기다. 그러니깐 call 을 해야지 위 axios 결과값을 기다린다.
    yield delay(2000);
    yield put({
      // put = dispatch
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
