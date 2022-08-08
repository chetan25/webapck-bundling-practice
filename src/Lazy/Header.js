import React from "react";

const Header = (props) => {
  return (
    <div>
      <h4>{props.children}</h4>
    </div>
  );
};

export default Header;
