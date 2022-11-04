import { all, call, fork, put, take } from "redux-saga/effects";
import axios from "axios";

function logInAPI(data) {
  return axios.post("/api/login", data);
}

function logOutAPI() {
  return axios.get("/api/logout");
}

function addPostAPI(data) {
  return axios.post("/api/addpost", data);
}

function* logIn(action) {
  // post 해줘야 하니 action.data 를 넘겨야 한다
  try {
    yield put({
      // yield 가 await 이랑 비슷한 느낌이라고 생각하면 된다.
      type: "LOG_IN_REQUEST",
    });
    const result = yield call(logInAPI, action.data); // call 은 동기고 fork 는 비동기다. 그러니깐 call 을 해야지 위 axios 결과값을 기다린다.
    yield put({
      // put = dispatch
      type: "LOG_IN_SCCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function* logOut() {
  try {
    yield put({
      // yield 가 await 이랑 비슷한 느낌이라고 생각하면 된다.
      type: "LOG_OUT_REQUEST",
    });
    const result = yield call(logOutAPI); // call 은 동기고 fork 는 비동기다. 그러니깐 call 을 해야지 위 axios 결과값을 기다린다.
    yield put({
      // put = dispatch
      type: "LOG_OUT_SCCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function* addPost(action) {
  try {
    yield put({
      // yield 가 await 이랑 비슷한 느낌이라고 생각하면 된다.
      type: "ADD_POST_REQUEST",
    });
    const result = yield call(addPostAPI, action.data); // call 은 동기고 fork 는 비동기다. 그러니깐 call 을 해야지 위 axios 결과값을 기다린다.
    yield put({
      // put = dispatch
      type: "ADD_POST_SCCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogIn() {
  // 이벤트리스너 같은것
  yield take("LOG_IN_REQUEST", logIn); // login action 실행될 때까지 기다리겠다.
}

function* watchLogOut() {
  yield take("LOG_OUT_REQUEST", logOut);
}

function* watchAddPost() {
  yield take("ADD_POST_REQUEST", addPost);
}

//fork 는 함수를 실행한다. call 로 해도되는데 좀 차이점이 있다. 나중에... 파악해보자
export default function* rootSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchAddPost)]); // 마치 이벤트 리스너를 등록해준다 생각하자.
}
