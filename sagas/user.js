import { all, fork, takeLatest, put, delay } from "redux-saga/effects";
import axios from "axios";

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from "../reducers/user";

function logInAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  // post 해줘야 하니 action.data 를 넘겨야 한다
  try {
    console.log("saga logIn");
    // const result = yield call(logInAPI, action.data); // call 은 동기고 fork 는 비동기다. 그러니깐 call 을 해야지 위 axios 결과값을 기다린다.
    yield delay(1000);
    yield put({
      // put = dispatch
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.get("/api/logout");
}

function* logOut() {
  try {
    console.log("saga logout");
    // const result = yield call(logOutAPI); // call 은 동기고 fork 는 비동기다. 그러니깐 call 을 해야지 위 axios 결과값을 기다린다.
    yield delay(1000);
    yield put({
      // put = dispatch
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI() {
  return axios.get("/api/signup");
}

function* signUp(action) {
  try {
    console.log("saga signup");
    // const result = yield call(signUpAPI); // call 은 동기고 fork 는 비동기다. 그러니깐 call 을 해야지 위 axios 결과값을 기다린다.
    yield delay(1000);
    yield put({
      // put = dispatch
      type: SIGN_UP_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  // 이벤트리스너 같은것
  yield takeLatest(LOG_IN_REQUEST, logIn); // login action 실행될 때까지 기다리겠다.
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)]);
}
