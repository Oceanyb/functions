import React, { Component } from "react";
import { View, Text } from 'react-native'

export default class My extends Component {
  constructor(props){
    super(props)
    this.state={
      ...props
    }
  }
  render() {
    return(
      <View>
        <Text>Hello My!</Text>
      </View>
    )
  }
}