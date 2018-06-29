/* eslint-disable */
import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
const styles = require('./Canvas.scss');

export default class Canvas extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    
  }

  addClick = (x, y, dragging) => {
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
  }


  mousedownHandler = (event) => {
    const elem = document.getElementById('canvasInAPerfectWorld')
    const mouseX = event.pageX - elem.offsetLeft;
    const mouseY = event.pageY - elem.offsetTop;
    this.paint = true;
    this.addClick(mouseX, mouseY);
    this.redraw();
  }

  render() {
    return (
      <div className={styles.canvas}> My Canvas</div>
    );
  }
}
