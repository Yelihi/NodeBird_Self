import {
  all,
  fork,
  put,
  take,
  takeLatest,
  call,
  delay,
} from "redux-saga/effects";
import shortid from "shortid";
import axios from "axios";

import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  generateDummyPost,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_TO_ME } from "../reducers/user";

function loadPostAPI(data) {
  return axios.get("/api/addpost", data);
}

function* loadPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data); // call 은 동기고 fork 는 비동기다. 그러니깐 call 을 해야지 위 axios 결과값을 기다린다.
    yield delay(2000);
    const id = shortid.generate();
    yield put({
      // put = dispatch
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post(
    "/post",
    { content: data },
    {
      withCredentials: true,
    }
  );
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data); // call 은 동기고 fork 는 비동기다. 그러니깐 call 을 해야지 위 axios 결과값을 기다린다.
    console.log(result);
    yield put({
      // put = dispatch
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      //saga 는 post 에 user 부분을 import 할 수 있다.
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.post("/api/addpost", data);
}

function* removePost(action) {
  try {
    // const result = yield call(addPostAPI, action.data); // call 은 동기고 fork 는 비동기다. 그러니깐 call 을 해야지 위 axios 결과값을 기다린다.
    yield delay(2000);
    yield put({
      // put = dispatch
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      //saga 는 post 에 user 부분을 import 할 수 있다.
      type: REMOVE_POST_TO_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data); // call 은 동기고 fork 는 비동기다. 그러니깐 call 을 해야지 위 axios 결과값을 기다린다.
    yield put({
      // put = dispatch
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPost);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
  ]);
}
