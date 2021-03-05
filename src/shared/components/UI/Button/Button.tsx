import React from "react";
import { Link } from "react-router-dom";

import { ButtonProps } from "./Button.model";

const Button: React.FC<ButtonProps> = (props) => {
  //Set href property on a Button to make it a link.
  if (props.href) {
    return (
      <a title={props.title} href={props.href}>
        {
          // TODO: Add some dynamic styles (boolean types).}
        }
        <button className={props.className}>{props.children}</button>
      </a>
    );
  }
  //Set 'to' property on a Button to make it a React Router Link.
  if (props.to) {
    return (
      <Link to={props.to}>
        <button className={props.className}>{props.children}</button>
      </Link>
    );
  }
  return (
    <button
      className={props.className}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      form={props.form}
    >
      {props.children}
    </button>
  );
};

export default Button;
