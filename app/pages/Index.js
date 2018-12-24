'use strict'

import React from "react";
import { View, Text } from 'react-native'
import { TabBar, Icon } from '@ant-design/react-native'
import { createStackNavigator } from 'react-navigation'

import Functions from './Functions'
import My from './My'
import Barcode from './Barcode'

class Index extends React.Component {
  static navigationOptions = {
    header: null,
  }
  
  constructor(props){
    super(props)
    this.state={
      ...props,
      selectedTab:'Functions'
    }
  }

  render() {
    return(
      <TabBar
        navigation={this.props.navigation}
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="#f5f5f5"
      >
        <TabBar.Item
          title={<Text style={{fontSize:13}}>功能</Text>}
          icon={<Icon name={'appstore'} size={28} />}
          selected={(this.state.selectedTab === 'Functions')}
          onPress={() => this.onChangeTab('Functions')}
        >
          {this.renderContent()}
        </TabBar.Item>
        <TabBar.Item
          title={<Text style={{fontSize:13}}>我的</Text>}
          icon={<Icon name={'user'} size={28} />}
          selected={(this.state.selectedTab === 'My')}
          onPress={() => this.onChangeTab('My')}
        ></TabBar.Item>
      </TabBar>
    )
  }
  componentDidMount = () => {
    console.log('props',this.props)
  }
  renderContent() {
    if(this.state.selectedTab == 'Functions'){
      console.log('page-')
      return (
        <Functions navigation={this.props.navigation}/>
      )
    }else if(this.state.selectedTab == 'My'){
      console.log('page=')
      return (
        <My navigation={this.props.navigation}/>
      )
    }
  }
  onChangeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }
}

const route = createStackNavigator({
  Index: {
    screen: Index
  },
  Functions: {
    screen: Functions
  },
  My: {
    screen: My
  },
  Barcode: {
    screen: Barcode
  },
})

export default route