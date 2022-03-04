import React from "react";

const Completed = (props) => {
  const { completed } = props;

    return(
      <div>
        <div>Hello from Completed</div>
        <div>{completed.map((word) => {
          return <div key={word.id}>{word.e}</div>
        })}</div>
      </div>
    )
}

export default Completed;