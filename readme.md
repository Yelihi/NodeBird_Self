<h1 align="center">Tweeter 핵심기능 구현</h1>
<h3 align="center"> React Nodebird -Front- 정리 </h3> 
<br />

<h2 id="프로젝트소개"> :dart: 개요 및 목표</h2>

<p align="justify">
SNS 서비스 중 tweeter 에서 사용되고 있는 기능들을 학습하였습니다. <br />
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

<h2 align="center" id="next">:large_blue_diamond: Setting</h2>
<br>

> **ESlint**

```json
{
  "parser": "babel-eslint", // babel 이 해석해서 최신 문법도 에러 발생 안함
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "extends": ["airbnb"], // 좀 더 강하게 스타일을 적용한다. 규제가 강함
  "plugins": ["import", "react-hooks"],
  "rules": {
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-console": "off",
    "no-underscore-dangle": "off",
    "react/forbid-prop-types": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-one-expression-per-line": "off",
    "object-curly-newline": "off",
    "linebreak-style": "off",
    "no-param-reassign": "off"
  }
}
```

<p align="justify">
Nav 구현 중 로그인, 회원가입 등 옵션을 선택할 수 있는 프로필 모달창을 만들었어야 했는데, 로그인 버튼을 클릭할 시 다른 모달창의 overlay 속성에 의해 로그인이 눌리지 않고 모달창이 닫히는 현상이 발생하였습니다. 
<br />처음에는 프로필 모달창(로그인 하기 버튼이있는)의 z-index 값을 더 높혀서 처리하려 했으나 잘 되지 않았고, 방법을 찾아보다가 로그인 버튼을
누르는 이벤트가 더 상위인 overlay 클릭 이벤트까지 도달하지 않는다면 될 것이라 판단하였습니다.<br /> 상위 이벤트까지 버블링 되는 것을 막는 방법으로 <b>event.stopPropagation()</b>을
활용하니 로그인 버튼을 클릭해도 모달창이 닫히지 않게되어 해결되었습니다.
</p>

<br />

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
