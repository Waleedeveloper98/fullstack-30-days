import React from "react";

const Input = ({ label, type, id, icon: Icon, ...rest }) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <div className="input-wrapper">
        <span className="input-icon left">
          <Icon size={20} />
        </span>
        <input
          id={id}
          type={type}
          className="form-input"
          placeholder="Enter your username"
          {...rest}
        />
      </div>
    </div>
  );
};

export default Input;
