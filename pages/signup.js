import React, { useCallback } from "react";
import AppLayout from "../components/AppLayout";
import { Form } from "antd";

const signup = () => {
  const onSubmit = useCallback(() => {});

  return (
    <AppLayout>
      <Form onFinish={onSubmit}></Form>
    </AppLayout>
  );
};

export default signup;
