'use strict';

import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import TabNav from './TabNav'
import Blank from './Blank'
import Usepermission from './Usepermission'
import PermissionList from './PermissionList'

const Index = createAppContainer(
  createStackNavigator({
    TabNav: {
      screen: TabNav,
      navigationOptions:() => ({
        header: null,
      })
    },
    Blank: {
      screen: Blank
    },
    PermissionList: {
      screen: PermissionList
    },
    Usepermission: {
      screen: Usepermission
    },
  },{
    initialRouteName: 'Blank',
    headerMode: 'screen'
  })
)

export default Index