<h1 align="center">Twitter 핵심기능 구현</h1>
<h3 align="center"> React Nodebird -Front- 정리 </h3> 
<br />

<h2 id="프로젝트소개"> :dart: 개요 및 목표</h2>

<p align="justify">
SNS 서비스 중 twitter 에서 사용되고 있는 기능들을 학습하였습니다. <br />
로그인과 회원가입, 포스팅, 댓글, 팔로잉 및 팔로우, 인피니티 스크롤 등 SNS에서 사용될만한 서비스를 구현하였습니다.
</p>
<br />

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="사용 기술"> :book: 학습한 기술들</h2>

> **주요 프레임워크 및 라이브러리**

- React : @16.14.0
- Redux : @4.2.0
- Redux-saga : @1.2.1
- Next.js : @9.5.5
- styled-component : @5.3.6

> **그 외**

- antd: @4.23.6
- immer: @9.0.16
- prop-types: @15.8.1
- react-slick: @0.29.0
  <br />

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="구현목표"> :floppy_disk: 학습 내용(진행중)</h2>

- 기본적인 <b>next.js</b> 초기 셋팅(ESlint)
- 초기 레이아웃 작업에 있어서 <b>antd</b>(스타일 라이브러리)를 활용.
- 반복되는 input 상태 관리를 위한 <b>useInput 커스텀 훅</b>.
- <b>Redux</b>를 사용하는 이유와 원리를 파악.
- <b>제너레이터(generator)</b>의 이해와 <b>Redux-saga</b> 사용법.
- 더미데이터를 위한 <b>shortId, faker</b> 라이브러리 사용법.
- Reducer의 불변성 유지를 도와주는 <b>immer</b> 사용법.
- 기초적인 <b>인피니티 스크롤</b> 구현 방법
  <br />

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 align="center" id="next">:large_blue_diamond: Study</h2>
<br>

<details>
<summary><b>ESLint 초기 설정</b></summary>
<div markdown="1">
<br />

> **ESLint**

<p align="justify">
ESlint 는 Javascript, JSX 의 정적 분석 도구입니다. 코드를 분석해 문법적인 오류나 안티 패턴을 찾아주고 일관된 코드 스타일로 작성하도록 도와줍니다.<br />
사람들은 저마다의 코딩 스타일이 있기 때문에, 이를 하나의 코딩 스타일로 바꿔주는 역할을 하게 됩니다.
<br /> ESlint 에는 Shareable Configs 라는 기능이 제공되는데, 이를 이용하면 누군가 만들어 놓은 ESLint 설정을 활용할 수 있습니다. <br />
아래와 같이 초기 설치를 해주겠습니다.
</p>
<br />

```
npm i eslint -D
npm i eslint-plugin-import -D
npm i eslint-plugin-react -D
npm i eslint-plugin-react-hooks -D
npm i eslint-config-airbnb@latest -D
npm i babel-eslint -D
```

<br />

```js
{
  "parser": "babel-eslint", // babel 이 해석해서 최신 문법도 에러 발생 안함
  // "parser" : "@typescript-eslint/parser"
  // 전반적인 Javascript 언어 옵션을 설정
  "parserOptions": {
    "ecmaVersion": 2020, // 사용할 ECMAScript 버전을 설정
    "sourceType": "module", //parser의 export 형식을 설정
    "ecmaFeatures": { // ECMAScript의 언어 확장 기능을 설정
      "jsx": true // JSX 사용 여부
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "extends": ["airbnb"], // 패기지를 설치하여 설치한 설정을 적용하고자 할 때 extends 에 넣어준다.
  // 플러그인 추가
  "plugins": ["import", "react-hooks"],
  // 사용할 규칙
  "rules": {
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-console": "off", // console.log 등의 호출을 설정 (지금은 클라이언트에 여전히 전달 가능). node.js 에서는 error 로 하는게 유리.
    "no-underscore-dangle": "off", // 식별자에 붙은 _를 허용할지 안할지를 설정한다. 중요한건 식별자에 매달린!
    "react/forbid-prop-types": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-one-expression-per-line": "off",
    "object-curly-newline": "off", // {} 내 줄바꿈이 필수인지 아닌지에 대한 옵션 처리. 지금은 그냥 꺼버렸다.
    "linebreak-style": "off", // 일관된 줄 바꿈 스타일 적용 설정 ('unix', 'window')
    "no-param-reassign": "off" // 전달된 매개변수에 값을 재할당 하는것을 막아주는 설정
  }
}
```

> 엄격한 스타일 적용을 위해 airbnb 패키지로 설정하였고, 꺼두고 싶은 규칙들을 off 로 설정하였습니다. plugin 에는 react-hooks 를 추가 설정하였습니다.

<h3> 기본 개념 </h3>
<p align="justify">
eslintrc. 파일을 생성 후 위와 같이 셋팅을 해줍니다.  
<br /> ESlint 설정에는 크게 4가지 정도로 구분할 수 있습니다.
</p>

- 환경(env) : 코드가 돌아가는 환경을 설정합니다.
- 전역변수(Globals) : 추가로 사용할 전역변수를 정의할 수 있습니다.
- 규칙(Rules) : 룰의 활성화와 에러들의 수준을 설정합니다.
- 플러그인(plugin) : 위 규칙이나 환경,설정들을 한데 모아둔 집합같은 느낌입니다.
  <br />

<p align="justify">
규칙의 경우 규칙 이름과 이에 대한 설정값으로 'off: 끔', 'warn: 경고', 'error: 오류' 3가지로 나뉩니다. <br />
만일 사용하려는 extends 와 plugin 에서 설정해둔 규칙을 수정하고 싶다면, rules 에서 직접 수정하면 됩니다.
</p>
<br />

- 참고로 prettier 와 설정 충돌을 막고 싶다면, `eslint-config-prettier`
- html 역시 eslint 로 문법 설정을 하고 싶다면, `eslint-plugin-html`

</div>
</details>

<details>
<summary><b>Next.js 초기 설정</b></summary>
<div markdown="1">
<br />

> **Next.js@9**

<p align="justify">
Next.js는 리엑트로 구현 시 CSR 방식으로 인한 SEO(검색 최적화) 문제점을 해소시켜주는 리엑트 프레임워크입니다.<br />
Next.js 를 활용하여 SSR(Server Side Rendering) 구현이 가능해집니다. 
<br />CSR 과 SSR 에 관해서는 아래 링크를 참고해주세요<br />
</p>
<br />

[블로그 참고](https://rock7246.tistory.com/23)

```
npm i next@9
```

<br />

> 추후 내용 추가 예정

</div>
</details>

<details>
<summary><b>antd</b></summary>
<div markdown="1">
<br />

> **antd**

<p align="justify">
antd를 통해서 좀 더 쉽게 페이지의 레이아웃을 설정할 수 있습니다.<br />
간단한 메뉴부터, nav, login form, layout 등등 공식 홈페이지를 참고하여 양식에 맞게 적용하면 됩니다. 전반적으로 미리 디자인이 깔끔하게 되어있지만, 수정이 필요하다면 사용자에 성향에 맞게 수정이 가능합니다. 여기선 version 4 를 사용하였습니다. 최근 버전에는 사용법이 약간 달라진 부분이 있으니 항상 공식 문서를 우선적으로 참조합시다.
<br />
</p>
<br />

```
npm i antd@4
npm i @ant-design/icons
```

<br />
<p align='justify'> `@ant-design/icons` 도 설치해두면 아이콘을 설정할 때 아주 유용합니다. 같이 설치합시다. </p>
<br />

> 예제 (AppLayout)

```js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Link from "next/link";
// 이렇게 import 에서 사용할 수 있다.
import { Menu, Input, Row, Col } from "antd";

import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import styled from "styled-components";

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput
            placeholder="input search text"
            enterButton
            style={{
              width: 300,
              verticalAlign: "middle",
            }}
          />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://rock7246.tistory.com" target="_blank" rel="noreferrer noopenner">
            By Yelihi
          </a>
        </Col>
      </Row>
    </div>
  );
};
AppLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;

// 기존 스타일을 변경할 때 styled-component 를 활용해도 되고, 아니면 그냥 인라인으로 수정해도 된다.
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
```

<br />
<p align='justify'>각 요소들의 사용법은 공식 문서를 활용하도록 합시다</p>
</br>

[공식 사이트](https://ant.design/)

</div>
</details>

<details>
<summary><b>useInput</b></summary>
<div markdown="1">
<br />

> **useInput**

<p align="justify">
Form 양식을 작업하다보면 수많은 input 창이 나오게 되고 그때마다 반복되는 함수를 사용하기에는 번거로운 점이 있습니다.<br />
그래서 이전에는 하나의 state 에 여러개의 value 를 객체 형식으로 관리하였는데, 이번에 커스텀 훅을 사용하여 좀 더 깔끔한 코드로 작성하고자 하였습니다.
<br />
</p>
<br />

- useInput.js

```js
import { useState, useCallback } from "react";

export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler];
};
```

- return 부분이 중요한데, 초기 상태값과, handler 함수를 반환하게 됩니다. 이 함수를 그대로 활용할 수 있게 됩니다.
  <br />

```js
import useInput from "../hooks/useInput";

const LoginForm = ({ setIsLoggedIn }) => {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
```

- 이런식으로 상태값과 함수를 구조분해로 마치 useState 를 사용하듯이 사용하면 됩니다.
- 만일 setState 가 필요해지는 경우가 발생한다면, 간단하게 커스텀훅으로 돌아가 return 부분에 setState 를 같이 반환하게 하면 됩니다.
  <br />

```js
import { useState, useCallback } from "react";

export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};
```

</div>
</details>

<details>
<summary><b>Redux</b></summary>
<div markdown="1">
<br />

> **왜 Redux를 사용해야할까**

<p align="justify">
리엑트의 장점은 화면 랜더링을 컴포넌트의 재사용을 활용하여 좀 더 효율적으로 할 수 있다는 점에 있습니다. 이 때 각 컴포넌트에는 상태값들이 존재할 수 있고, 이러한 상태값의 변화가 곧 화면 랜더링의 업데이트로 이어지곤 합니다. 그리고 이러한 상태값 중 일부는 여러 컴포넌트에서 동시에 사용되어야 하는 경우가 발생합니다.<br /><br />
예를 들자면 만약 사용자의 nickname 이 변경되었다고 할 때, 이 nickname 을 사용하는 컴포넌트가 여러개일 수 있고, 실제로 회원정보창, 장바구니창, 게시글, 댓글 등등에서 활용되곤 합니다. 만일 이러한 상태값들이 많아지게 된다면, 단순 props 로 상태값을 전달하는 방식에는 한계점이 느껴지게 되고, 이런 상태값을 저장할 수 있는 공간이 한 공간 이상은 필요하게 됩니다.
<br /><br />이러한 의미에서 Redux와 같은 상태관리 라이브러리가 필요하게 됩니다.<br />
</p>
<br />

```
npm i next-redux-wrapper
npm i redux
```

- next 에서는 추가로 next-redux-wrapper 가 필요합니다.
- store 폴더를 생성해서, configureStore 를 만듭니다.

```js
import { createWrapper } from "next-redux-wrapper";

import reducer from "../reducers";

// store 를 먼저 만들어 주어야 합니다.
const configureStore = () => {
  // store 생성하기
  const store = createStore(reducer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development,",
}); // 자세한 설명이 나와서 이걸 설정해주자.

export default wrapper;
```

- 이후 redux 의 상태값을 사용하고자 하는 페이지(컴포넌트)에 가서 아래처럼 설정을 해주면 됩니다.

```js
import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";

import wrapper from "../store/configureStore";

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

// 컴포넌트를 wrapper 로 감싸주면 됩니다.
export default wrapper.withRedux(NodeBird);
```

- 이렇게 `_app.js` 에 설정해주게 되면, 나머지 모든 컴포넌트에 관해서 redux store 을 활용할 수 있게 됩니다.
  <br />
  <br />

> **Redux 는 어떻게 동작하는가**

<p align="justify">
리덕스는 중앙 저장소에서 데이터를 저장하는데, 이 데이터를 수정하려면 action 을 통해서 바꿀 수 있습니다. 이 action 을 dispatch 하면 중앙저장소가 바뀌게 됩니다. <br /><br />
물론 diapatch 만 한다고 바뀌는것은 아닙니다. 특정 타입인 action 을 받았을 때, 이 타입에 따른 행동 요건을 switch 문으로 reducer 에서 관리하게 됩니다. 
<br /><br />
문제는 각각의 action 에 대한 reducer 의 코드량이 엄청 많아지게 된다는 점인데, 진행됨에 따라 action 들의 기록들이 남게 되어, 뒤로가기도 가능하고, 어떤식으로 상태가 관리되는지 보기 수월하다는 장점이 있습니다.
<br /><br /> 실제로 한번 구현해보겠습니다.
</p>

```js
// 초기 상태값입니다. 여기에 이제 데이터가 추가되거나 삭제됩니다.
const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

// 이전상태, 액션 => 다음상태 를 만드는 함수
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      };
    case "LOG_OUT":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
```

- 위 코드는 login,logout 에 대한 reducer store 입니다.
- 불변성을 지켜주어야 하기에 스프레드 연산자를 통해 얇은 복사를 하고 있습니다.
- 해당 컴포넌트에서 action 을 건내주면 rootReducer 는 이 type 에 따른 state 값을 변화시켜줍니다.
- reducer 에 action 을 보내는 함수는 밑과 같습니다.

```js
export const loginAction = (data) => {
  return {
    type: "LOG_IN", // reducer 는 이 type 을 통해서 취할 행동을 결정합니다.
    data: data, // 필요한 data 를 같이 전달하게 됩니다.
  };
};

export const logoutAction = () => {
  return {
    type: "LOG_OUT",
  };
};
```

> 위 함수는 store 에서 정의한 함수입니다. 컴포넌트에서 직접 dispatch를 해도되지만, action 함수를 미리 만들어서 dipatch 에서 함수를 넣어 전달해도 됩니다. 사용자의 편의에 따라 합시다.

- reducer 는 상태값을 변화시키고, 이 상태값을 컴포넌트는 그대로 가져와서 사용하면 됩니다.

```js
// useSelector 를 통해서 상태값을 가져올 수 있습니다.
// 컴포넌트 어디던지 가능합니다.
import { useSelector } from "react-redux";

const AppLayout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  // 이런식으로 상태값을 가져와 밑에 그대로 활용하면 됩니다.

	return (
	....


	<Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
```

- dispatch 보내는 방법은 역시나 간단합니다.
- useDispatch 를 통해서 dispatch를 정의하고 그대로 사용하면 됩니다.

```js
import { useDispatch } from "react-redux";
import { loginAction } from "../reducers";

const LoginForm = () => {
  const dispatch = useDispatch();

	const onSubmitForm = useCallback(() => {
    // id, password 를 데이터로 전달합니다.
    dispatch(loginAction({ id, password }));
  }, [id, password]);
```

<br />

> **Redux Devtools**

<p align='justify'>크롬에서 확장프로그램을 설치가 가능합니다. 설정할 때는 개발자 모드에서만 작동하도록 설정하는것이 좋습니다. 크롬과 npm 내 둘다 설치가 되어있어야 사용 가능합니다.</p>

```
npm i redux-devtools-extension
npm i @redux-devtools/extension
```

<p align='justify'>configureStore.js 에 아래와같이 설정을 해줍시다.</p>

```js
import { applyMiddleware, createStore, compose } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "../reducers";

const configureStore = (context) => {
  console.log(context);
  const middlewares = [];
  // 개발자 모두에 한해서 Devtools 를 사용하겠다는 것입니다.
  const enhancer = process.env.NODE_ENV === "production" ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
```

</div>
</details>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
