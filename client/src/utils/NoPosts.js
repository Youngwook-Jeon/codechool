import React from "react";
import noData from "../assets/no-data.svg";

const NoPosts = ({ text }) => {
  return (
    <div className="no-posts-component">
      <div className="post-image-container">
        <object type="image/svg+xml" data={noData}>
          페이지 로딩에 실패했습니다.
        </object>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default NoPosts;
