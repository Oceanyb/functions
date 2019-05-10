import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage, ScrollView } from 'react-native';
import { Flex, Button, List, InputItem, Icon } from '@ant-design/react-native'
import ImagePicker from 'react-native-image-crop-picker';

import apiFetch from '../static/libs/apiFetch'

type Props = {};
export default class PermissionList extends Component<Props> {
  static navigationOptions = {
    header: null,
  }
  constructor(props){
    super(props)
    this.state={
      ...props,
      listType:0,
      list:[]
    }
  }
  componentWillMount = () => {
    const { listType } = this.props.navigation.state.params
    this.setState({listType})
  }
  render() {
    return (
      <View style={{height:'100%',backgroundColor:'#eee'}}>
        <ScrollView
          style={{ flex: 1, backgroundColor: '#f5f5f9',marginTop:50 }}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <List>
            {this.state.list.map((item,index)=>
              <Item
                style={{borderRadius:5,justifyContent:'space-around'}}
                onPress={() => this.props.navigation.navigate('Usepermission',{getInfo:item,status:this.state.listType})}
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
    const res = await apiFetch.withToken('/selectUserByAptitude',{
      aptitude:this.state.listType,
    })
    const list = JSON.parse(res._bodyText)
    console.log(list)
    this.setState({
      list
    })
  }
}

const Item = List.Item;
const Brief = Item.Brief;