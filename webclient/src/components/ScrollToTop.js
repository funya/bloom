import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class ScrollToTop extends Component {
  componentDidMount() {
      const node = ReactDOM.findDOMNode(this.top);
      node.scrollIntoView(true)
  }

  render() {
    return (<div style={{ float: "left", clear: "both" }} ref={(ele) => { this.top = ele }}></div>)
  }
}

export default ScrollToTop