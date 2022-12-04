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
<p align='justify'>각 요소들의 사용법은 공식 문서를 활용하도록 하자</p>
</br>

[공식 사이트](https://ant.design/)

</div>
</details>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
