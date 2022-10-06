import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const AppLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Link href="/">
          <a>노드버드</a>
        </Link>
        <Link href="/profile">
          <a>프로필</a>
        </Link>
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </div>
      {children}
    </div>
  );
};

// 어차피 타입스크립트를 쓰면 검사할 필요가 없긴 함. 이건 node 라는 타입이라는 것을 검사하고자 하는 것.
AppLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
