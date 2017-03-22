/**
*   程序入口
*/
'use strict';
import React, { Component } from 'react';
var Text = require('Text');
const {AppRegistry} = require('react-native');
export default class Main extends Component {
  render() {
    return (
         //欢迎页展示
        <Text>测试首页</Text>
    );
  }
}
AppRegistry.registerComponent('Main', () => Main);
