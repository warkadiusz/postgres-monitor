import React from 'react';

function Card(props) {
  return (<div className="card">
    <div className="card-body">
      <div className="card-title">{props.title}</div>
      <div className="card-category">{props.subtitle}</div>
      {props.children}
    </div>
  </div>);
}

export default Card
