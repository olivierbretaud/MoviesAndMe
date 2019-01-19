import React, { Component } from 'react';
import { Animated } from 'react-native';

class EnLargeHeart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewSize: new Animated.Value(this._getSize())
    }
  }

  _getSize() {
    if (this.props.shouldEnLarge) {
      return 40
    }
    return 30
  }

  componentDidUpdate() {
    Animated.spring(
      this.state.viewSize,
      {
        toValue: this._getSize()
      }
    ).start()
  }

  render() {
    return (
      <Animated.View
        style={{ width: this.state.viewSize, height: this.state.viewSize }}
        >
        {this.props.children}
      </Animated.View>
    )
  }

}

export default EnLargeHeart;