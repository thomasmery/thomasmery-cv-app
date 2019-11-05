import React from "react";

const Technology = props => {
  const count = parseInt(props.projects_count, 10);
  const className = `technology badge badge-default`;

  return (
    <span className={className} style={props.style}>
      {props.name} {props.projects_count ? ` (${count})` : ``}
    </span>
  );
};

export default Technology;
