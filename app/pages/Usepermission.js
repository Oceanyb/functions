import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage, Linking } from 'react-native';
import { Flex, Button, List, InputItem, Icon, Toast } from '@ant-design/react-native'
import ImagePicker from 'react-native-image-crop-picker';

import { XyNavBar } from '../static/libs/MiniXy'
import apiFetch from '../static/libs/apiFetch'
import $s from '../static/styles/sui'

type Props = {};
export default class Usepermission extends Component<Props> {
  static navigationOptions = {
    header: null,
  }
  constructor(props){
    super(props)
    this.state={
      ...props,
      getInfo:{},
      c1:'',
      c2:'',
      c3:''
    }
  }
  componentWillMount = () => {
    const { status } = this.props.navigation.state.params
    if(status == 1){
      this.setState({c1:'#f00',c2:'#fff',c3:'#fff'})
    }else if(status == 2){
      this.setState({c1:'#fff',c2:'#f00',c3:'#fff'})
    }else{
      this.setState({c1:'#fff',c2:'#fff',c3:'#f00'})
    }
  }
  render() {
    return (
      <View style={{height:'100%',backgroundColor:'#eee'}}>
        <XyNavBar title="功能" style={{ position: 'absolute', width: '100%', zIndex: 999 }} ></XyNavBar>
        <View style={{marginTop:$s.statusBarH + $s.navH}}>
          <List>
            <Item
              style={{borderRadius:5,justifyContent:'space-around'}}
              onPress={() => {Linking.openURL(`tel:${this.state.getInfo.phone}`)}}
            >
              <Text style={{marginTop:8}}>店铺名称: {this.state.getInfo.shopName}</Text>
              <Text style={{marginTop:10}}>账户手机号: {this.state.getInfo.phone}</Text>
              <Text style={{marginTop:10,marginBottom:8}}>地址: {this.state.getInfo.address || '无'}</Text>
            </Item>
          </List>
          <Button style={{marginTop:30,backgroundColor:this.state.c2}} onPressOut={()=>this.changePermission(2)}>通过</Button>
          <Button style={{marginTop:30,backgroundColor:this.state.c3}} onPressOut={()=>this.changePermission(3)}>不通过</Button>
          <Button style={{marginTop:30,backgroundColor:this.state.c1}} onPressOut={()=>this.changePermission(1)}>审核中</Button>
        </View>
      </View>
    );
  }
  componentDidMount = async () => {
    const { getInfo } = this.props.navigation.state.params
    console.log(getInfo)
    this.setState({getInfo})
  }
  changePermission = async (v) => {
    const res = await apiFetch.withToken('/updateUserByaptitude',{
      aptitude:v,
      phone:this.state.getInfo.phone
    })
    console.log(res)
    if(res._bodyText == 'true'){
      Toast.info('修改成功')
    }else{
      Toast.info('出错，请重试')
    }
  }
}

const Item = List.Item;
const Brief = Item.Brief;