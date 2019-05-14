import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, AsyncStorage, StatusBar, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Button, List, InputItem, Toast, Icon, Checkbox, Tabs, Portal } from '@ant-design/react-native';

import { XyNavBar } from '../static/libs/MiniXy'
import apiFetch from '../static/libs/apiFetch'
import $s from '../static/styles/sui'

type Props = {};

export default class My extends Component<Props> {
  static navigationOptions = {
    header: null,
    tabBarLabel: '我的',
    tabBarIcon: ({focused}) => {
      if(focused){
        return (<Icon name='user' color={$s.c.default}/>)
      }else{
        return (<Icon name='user' color='#949494'/>)
      }
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      phone: '',
      password: '',
    }
  }
  render() {
    return (
      <View style={{height:"100%",backgroundColor:"#fefefe"}}>
        <XyNavBar title="我的" style={{ position: 'absolute', width: '100%', zIndex: 999 }} ></XyNavBar>
        <View style={{marginTop:$s.statusBarH + $s.navH,alignItems:"center",justifyContent:'center'}}>
          <View style={{height:188,width:'82%'}}>
              <View>
                <View style={{marginTop:15,flexDirection:'row',alignItems:'center',borderColor:'#EFEFEF',borderWidth:1,borderRadius:5}}>
                  <Icon name='mobile' style={{margin:8}} />
                  <TextInput
                    value={this.state.phone}
                    style={{flex:1,padding:0,marginRight:3,fontSize:18}}
                    onChangeText={(v) => {
                      this.setState({
                        phone: v,
                      })
                    }}
                    returnKeyType="done"
                    placeholder='手机号'
                    keyboardType='number-pad'
                    clearButtonMode='while-editing'
                    maxLength={11}
                  >
                  </TextInput>
                </View>
                <View style={{marginTop:15,flexDirection:'row',alignItems:'center',borderColor:'#EFEFEF',borderWidth:1,borderRadius:5}}>
                  <Icon name='key' style={{margin:8}} />
                  <TextInput
                    value={this.state.password}
                    style={{flex:1,padding:0,marginRight:3,fontSize:18}}
                    onChangeText={(v) => {
                      this.setState({
                        password: v,
                      })
                    }}
                    returnKeyType="done"
                    placeholder='密码'
                    clearButtonMode='while-editing'
                    secureTextEntry={true}
                  >
                  </TextInput>
                </View>
              </View>
          </View>
        </View>
        <TouchableWithoutFeedback style={{position:'absolute',bottom:0,right:0}} onPress={()=>this.login()}>
          <View style={{height:60,backgroundColor:'rgba(30,120,240,0.1)',alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'#000',opacity:0.8,fontSize:18}}>注 册 账 户</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
  componentDidMount = async () => {
    let loginInfo = ''
    loginInfo = JSON.parse(await AsyncStorage.getItem('loginInfo'))
    if(loginInfo != null){
      this.setState({
        phone:loginInfo.phone,
        password:loginInfo.password
      })
    }
  }
  login = async () => {
    console.log('=====')
    if (!this.state.phone || this.state.phone.length != 11) {
      Toast.fail('请输入正确的手机号', 2);
      return
    }
    if (!this.state.password) {
      Toast.fail('请输入密码', 2);
      return
    }
    if(!(this.state.phone == '18918675000' || this.state.phone == '13122098096' || this.state.phone == '15106122192')){
      Toast.info('没有权限',1)
    }
    const loginInfo = {}
    loginInfo['phone'] = this.state.phone
    loginInfo['password'] = this.state.password
    const load = Toast.loading('登录中')
    const pwd_login = await apiFetch.without('/pwdLogin',{
      phone:this.state.phone,
      passWord:this.state.password
    })
    console.log('res',pwd_login)
    Portal.remove(load)
    try {
      const _try = JSON.parse(pwd_login._bodyText)
    } catch (error) {
      Toast.fail('网络错误，请稍后再试！',2)
      return
    }
    const pwdMessage = JSON.parse(pwd_login._bodyText)
    console.log(pwdMessage)
    if(pwd_login.status == 200 && pwdMessage.token && pwdMessage.user){
      Toast.info('登录成功',1)
      AsyncStorage.setItem('user', pwd_login._bodyText)
      AsyncStorage.setItem('loginInfo', JSON.stringify(loginInfo))
    }else if(pwd_login.status == 200 && pwdMessage.message == '此账号已登录'){
      Toast.fail('该账户已登录，请先退出后再登！',2)
      return
    }else if(pwd_login.status == 200 && pwdMessage.message == '账户不存在'){
      Toast.fail('该账户不存在，请用验证码登录！',2)
      return
    }else if((/4|5/).test(pwd_login.status)){
      Toast.fail('网络错误，请稍后再试！',2)
    }else{
      Toast.fail('密码错误',1)
      return
    }
  }
}