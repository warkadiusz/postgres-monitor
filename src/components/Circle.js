import React from 'react'
import Circles from '../lib/circles.min.js'

class Circle extends React.Component {
  constructor(props) {
    super(props);
    this.circleId = this.props.id || '_' + Math.random().toString(36).substr(2, 9);
  }

  componentDidMount() {
    const props = this.props;
    Circles.create({
      id: this.circleId,
      radius: props.radius || 45,
      value: props.value || 0,
      maxValue: props.maxValue || 100,
      width: props.width || 7,
      text: props.text || props.value || "",
      colors: [props.bgColor || '#f1f1f1', props.fgColor || '#FF9E27'],
      duration: props.duration || 400,
      wrpClass: 'circles-wrp',
      textClass: 'circles-text',
      styleWrapper: true,
      styleText: true
    })

  };

  render() {
    return (<div className={"text-center"}><div id={this.circleId}></div> <h6 className="fw-bold mt-3 mb-0">{this.props.title || ""}</h6></div>);
  }
}

export default Circle
