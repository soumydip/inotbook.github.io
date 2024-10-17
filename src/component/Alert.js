import React from "react";

function Alert(props) {
  return (
    props.alert && (  // Checking if alert is not null
      <div className={`alert alert-${props.alert.type}`} role="alert">
        {props.alert.message}
      </div>
    )
  );
}

export default Alert;
