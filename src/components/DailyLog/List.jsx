import React from "react";
import "./List.css";

const List = props => {
  return (
    <div>
      <ul className="list">
        {props.items.map((item, index) => (
          <li contentEditable="true" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
