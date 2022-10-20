import React, { useState, useCallback } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import styled from "styled-components";

const LoginForm = ({ setIsLoggedIn }) => {
  const [input, setInput] = useState({
    id: "",
    password: "",
  });

  const onChangeId = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInput({ ...input, [name]: value });
    },
    [input]
  );

  const onSubmitForm = useCallback(() => {
    console.log(input.id, input.password);
    setIsLoggedIn(true);
  }, [input]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="id" value={input.id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="password">아이디</label>
        <br />
        <Input
          name="password"
          type="password"
          value={input.password}
          onChange={onChangeId}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;
