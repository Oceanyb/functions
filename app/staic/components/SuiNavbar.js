'use strict'

import React, { Component } from "react";
import { View, Text, Platform, TouchableWithoutFeedback, DeviceEventEmitter } from 'react-native'

export default class SuiNavbar extends Component {
  constructor(props){
    super(props)
    this.state={
      ...props
    }
  }
  render() {
    return(
      <TouchableWithoutFeedback>
        <Text>Hello World!</Text>
      </TouchableWithoutFeedback>
    )
  }
}

const _ = StyleSheet.create({
  nav: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 999
  }
})