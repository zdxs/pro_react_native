/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import Main from '../main';
import WelcomView from '../welcome/WelcomView';
var Platform = require('Platform'); //用作判断系统类型

export default class navigator extends Component {
   constructor(props) {
     super(props);
   }
   // TODO FUNCTION 跳转
    renderSceneMy(route,navigator){
        let Component = route.component;
        //首页
        if (route.main) {
            return <Main navigator={navigator} />;
        }
        //这个语法是把 routes.params 里的每个key作为props的一个属性，在下个页面即可用this. props.id调用
        //navigator对象在导航容器跳转时一直存在
        return <Component {...route.params} navigator = {navigator} />
    }
   render() {
    let defaultName = 'WelcomView';
    let defaultComponent = WelcomView;

    return (
      <Navigator
        //初始化页面
        initialRoute = {{name : defaultName , component: defaultComponent}}
        //页面之间跳转时候的动画
        configureScene={(route) => {
            if (Platform.OS === 'android') {
//                return Navigator.SceneConfigs.VerticalDownSwipeJump;
                return Navigator.SceneConfigs.FloatFromBottomAndroid;
            }
            // TODO: Proper scene support
            if (route.shareSettings || route.friend) {
                return Navigator.SceneConfigs.FloatFromRight;
            } else {
                return Navigator.SceneConfigs.FloatFromBottom;
            }
        }}
//        configureScene = {(route) => {
//          return Navigator.SceneConfigs.VerticalDownSwipeJump;
//        }}
        //两个参数中的route包含的事initial的时候传递的name和component，
        //而navigator是一个我们需要用的Navigator的对象，所以当我们拿到route中的component的时候，
        //我们就可以将navigator传递给它，正因为如此，我们的组件HomeScene才可以通过  this.props.navigator，拿到路由。
//        {this.renderScene}
          renderScene = {this.renderSceneMy}
//        renderScene={(route,navigator) => {
//            let Component = route.component;
//                //首页
//                if (route.main) {
//                    return <Main navigator={navigator} />;
//                }
//            //这个语法是把 routes.params 里的每个key作为props的一个属性，在下个页面即可用this. props.id调用
//            //navigator对象在导航容器跳转时一直存在
//            return <Component {...route.params} navigator = {navigator} />
//        }}
        />
    );}

};