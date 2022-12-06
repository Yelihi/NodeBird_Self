import React, { useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import { END } from "redux-saga";

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { useDispatch, useSelector } from "react-redux";

import wrapper from "../store/configureStore";

import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST } from "../reducers/user";

const profile = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }
  return (
    <AppLayout>
      <NicknameEditForm />
      <FollowList header="팔로잉 목록" data={me.Followings} />
      <FollowList header="팔로워 목록" data={me.Followers} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log("getServerSideProps Start");
  console.log(context);
  const cookie = context.req ? context.req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  // success 까지 기다리기 위해서 하는 조치
  context.store.dispatch(END);
  //store.sagaTask 는 기존에 configStore.js 에서 처리함
  await context.store.sagaTask.toPromise();
});

export default profile;
