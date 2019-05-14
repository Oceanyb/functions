import React, { Component } from 'react';
import { View, Text, AsyncStorage, StatusBar, Linking, Platform, Alert, TouchableWithoutFeedback, PixelRatio, Image } from 'react-native';
import { Modal, Toast} from '@ant-design/react-native'
import { isFirstTime, isRolledBack, checkUpdate, downloadUpdate, switchVersion, markSuccess } from 'react-native-update';
import { StackActions, NavigationActions } from 'react-navigation';

import _updateConfig from '../../update.json';
import apiFetch from '../static/libs/apiFetch'
const { appKey } = _updateConfig[Platform.OS];

export default class Blank extends Component<Props> {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      ...props,
      visible:false
    }
  }
  componentWillMount(){
    if (isFirstTime) {
      markSuccess()
    } else if (isRolledBack) {
      Alert.alert('提示', '更新失败,关闭软件后重试！');
    }
  }
  render() {
    // const footerButtons = [
    //   { text: '', onPress: () => console.log('ok') },
    // ];
    return (
      <View style={{height:"100%",backgroundColor:'#fff'}}>
        <StatusBar hidden={true}/>
        {/* <Modal
          transparent
          onClose={()=>{this.setState({visible:false})}}
          visible={this.state.visible}
          style={{borderRadius:15,width:328}}
        >
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:22,alignItems:'center',fontWeight:'700'}}>贵重物品保价声明</Text>
          </View>
        </Modal> */}
      </View>
    )
  }
  componentDidMount = () => {
    this.checkUpdate()
    // this.props.navigation.replace('TabNav')
  }
  doUpdate = (info) => {
    downloadUpdate(info).then((hash) => {
      switchVersion(hash)
    }).catch(err => { 
      console.log('提示', '更新失败!');
    });
  }
  checkUpdate = () => {
    const _this = this
    checkUpdate(appKey).then((info) => {
      console.log(info)
      if (info.expired) {
        console.log('version')
        // Modal.alert('提示', '您的应用版本已更新,请下载新的版本', [
        //   {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
        // ], Platform.OS).close()
        Alert.alert('提示', '您的应用版本已更新,请下载新的版本', [
          {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
        ]);
      } else if (info.upToDate) {
        console.log('提示:您的应用版本已是最新.');
        // _this.setState({visible:true})
        this.props.navigation.replace('TabNav')
      } else {
        console.log('coding',info.description)
        const list = info.description.split(' ')
        let description = ''
        for(let i in list){
          if(i == 0){
            description = description + list[0]
          }else{
            description = description + '\n' + list[i]
          }
        }
        Alert.alert('提示', '检查到新的版本' + info.name + '\n\n' + description, [
          {text: '更  新', onPress: ()=>{this.doUpdate(info)}},
        ]);
      }
    }).catch(err => { 
      console.log('提示', '更新失败！');
    });
  }
}
