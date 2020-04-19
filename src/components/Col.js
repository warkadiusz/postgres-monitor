import React from 'react';

function Col(props) {
  const colClassXs = props.width ? "col-" + props.width : "col-12";
  const colClassSm = props.smWidth ? "col-sm-" + props.smWidth : "";
  const colClassMd = props.mdWidth ? "col-md-" + props.mdWidth : "";
  const colClassLg = props.lgWidth ? "col-lg-" + props.lgWidth : "";

  const classList = [colClassXs, colClassSm, colClassMd, colClassLg].join(" ");

  return (<div className={classList}>{props.children}</div>);
}

export default Col
