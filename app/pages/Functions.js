import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage, ScrollView } from 'react-native';
import { Flex, Button, List, InputItem, Icon, Modal } from '@ant-design/react-native'
import ImagePicker from 'react-native-image-crop-picker';

import { XyNavBar } from '../static/libs/MiniXy'
import apiFetch from '../static/libs/apiFetch'
import $s from '../static/styles/sui'

type Props = {};
export default class Functions extends Component<Props> {
  static navigationOptions = {
    header: null,
    tabBarLabel: '功能',
    tabBarIcon: ({focused}) => {
      if(focused){
        return (<Icon name='appstore' color={$s.c.default}/>)
      }else{
        return (<Icon name='appstore' color='#949494'/>)
      }
    }
  }
  constructor(props){
    super(props)
    this.state={
      ...props,
      userInfo:{},
      list:[],
      visible:false,
      visible1:false
    }
  }
  render() {
    return (
      <View style={{height:'100%',backgroundColor:'#eee'}}>
        <XyNavBar title="功能" style={{ position: 'absolute', width: '100%', zIndex: 999 }} ></XyNavBar>
        <Button onPressOut={()=>{this.props.navigation.navigate('PermissionList',{listType:3})}} style={{marginTop:$s.statusBarH + $s.navH}}>未通过名单</Button>
        <Button onPressOut={()=>{this.props.navigation.navigate('PermissionList',{listType:2})}}>已通过名单</Button>
        <Button onPressOut={()=>{this.props.navigation.replace('TabNav')}}>刷新</Button>
        <ScrollView
          style={{ flex: 1, backgroundColor: '#f5f5f9' }}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <List>
            {this.state.list.map((item,index)=>
              <Item
                style={{borderRadius:5,justifyContent:'space-around'}}
                onPress={() => this.props.navigation.navigate('Usepermission',{getInfo:item,status:1})}
                key={index}
              >
                <Text style={{marginTop:8}}>店铺名称: {item.shopName}</Text>
                <Text style={{marginTop:10,marginBottom:8}}>账户手机号: {item.phone}</Text>
              </Item>
            )}
          </List>
        </ScrollView>
      </View>
    );
  }
  componentDidMount = async () => {
    let user = ''
    user = JSON.parse(await AsyncStorage.getItem('user'))
    if(user != null){
      const res = await apiFetch.withToken('/selectUserByAptitude',{
        aptitude:1,
      })
      const list = JSON.parse(res._bodyText)
      console.log(list)
      this.setState({
        list
      })
    }
    // setTimeout(() => {
    //   this.props.navigation.replace('TabNav')
    //   // this.componentDidMount()
    // }, 15000);
  }
}

const Item = List.Item;
const Brief = Item.Brief;