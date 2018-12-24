import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View } from 'react-native';
import { Flex, Button, List, InputItem, Icon } from '@ant-design/react-native'
import ImagePicker from 'react-native-image-crop-picker';

type Props = {};
export default class Functions extends Component<Props> {
  static navigationOptions = {
    header: null,
  }
  constructor(props){
    super(props)
    this.state={
      ...props,
      imei:'',
      position:'',
      viewAppear:false
    }
  }
  render() {
    return (
      <View style={{height:'100%'}}>
        <View style={{marginTop:50}}>
          <List>
            <InputItem
              clear
              value={this.state.imei}
              onChange={value => {
                this.setState({
                  imei: value,
                });
              }}
            >
              IMEI
            </InputItem>
          </List>
          {/* <Icon name='alert' color='#000' size='lg'/> */}
          <Flex style={{marginTop:10,marginBottom:10}}>
            <Flex.Item style={{marginLeft:10,marginRight:10}}>
              <Button type='primary' onPressOut={() => this.guarantee()}>保修查询(0.1/0,035)</Button>
            </Flex.Item>
            <Flex.Item style={{marginLeft:10,marginRight:10}}>
              <Button type='primary' onPressOut={() => this.blackList()}>ID黑名单查询(0.5/0.175)</Button>
            </Flex.Item>
          </Flex>
          <Button style={{marginLeft:10,marginRight:10}} type='primary' onPressOut={() => this.ocr()}>文本识别</Button>
          <Button style={{marginLeft:10,marginRight:10,marginTop:10}} type='primary' onPressOut={() => this.openScan()}>扫描识别</Button>
        </View>
      </View>
    );
  }
  componentDidMount = () => {
    console.log('propsF',this.props)
  }
  ocr = async () => {
    const _this = this
    const g_t = 'client_credentials'
    const c_id = '6lGIKhPGhjyd7a0g9rX0rzHl'
    const c_secret = 'ETwuWS8vgStBHm12gj4gwYSbMD67IwjU'
    const a_token = await fetch(`https://aip.baidubce.com/oauth/2.0/token?grant_type=${g_t}&client_id=${c_id}&client_secret=${c_secret}`).then(response => response.json())
    console.log(a_token)
    if(a_token.access_token){
      ImagePicker.openCamera({
        cropping:false,
        compressImageQuality:0.1,
        compressImageMaxWidth:1080,
        compressImageMaxHeight:1920,
        includeBase64:true
      }).then(async(image) => {
        console.log(image);
        if(image.path){
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              const info = JSON.parse(this.responseText)
              console.log(info)
              for(let i in info.words_result){
                const v = info.words_result[i]
                if(' IMEI' == v.words || 'IMEI' == v.words){
                  const j = parseInt(i) + 1
                  v = info.words_result[j]
                  _this.setState({imei:v.words})
                }
              }
            }
          });
          const base64 = encodeURIComponent(image.data)
          const url = `https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=${a_token.access_token}`
          const data = `image=${base64}`
          xhr.open("POST", url);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.setRequestHeader("cache-control", "no-cache");
          xhr.send(data);
        }
      })
    }
  }
  guarantee = async () => {
    if(this.state.imei){
      const url = `http://api.3023data.com/apple/coverage?sn=${this.state.imei}`
      const key_3023 = '2b5cb67b2d6c92a29d4b76f19d0f30eb'
      const _res = await fetch(url,{
        headers: {
          'Content-Type': 'application/json',
          'key': key_3023,
          'cache-control': 'no-cache'
        }
      }).then(response => response.json())
      console.log(_res)
      alert(JSON.stringify(_res))
    }
  }
  blackList = async () => {
    if(this.state.imei){
      const url = `http://api.3023data.com/apple/icloud?sn=${this.state.imei}`
      const key_3023 = '2b5cb67b2d6c92a29d4b76f19d0f30eb'
      const _res = await fetch(url,{
        headers: {
          'Content-Type': 'application/json',
          'key': key_3023,
          'cache-control': 'no-cache'
        }
      }).then(response => response.json())
      console.log(_res)
      alert(JSON.stringify(_res))
    }
  }
  openScan = () => {
    this.state.navigation.navigate('Barcode')
  }
}
