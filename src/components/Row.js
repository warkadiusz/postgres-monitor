import React from 'react';

function Row(props) {
  const classList = "row " + (props.addClassNames || "");

  return (<div className={classList}>{props.children}</div>);
}

export default Row
