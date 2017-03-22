/**
*   程序入口
*/
'use strict';
import React, { Component } from 'react';
import {
  Text,
  View,
  Navigator,
  Animated,             //动画
  Easing,               //减缓
  TouchableHighlight,   //触摸点击高亮效果
} from 'react-native';
const {AppRegistry} = require('react-native');
var StyleSheet = require('F8StyleSheet');
var Platform = require('Platform'); //用作判断系统类型

export default class WelcomView extends Component {
    constructor(props: any) {
     console.log(props);
        super(props);
        (this: any).onPressTitle = this.onPressTitle.bind(this);
        //动画元素相关
        this.animatedValue1 = new Animated.Value(0);
        this.animatedValue2 = new Animated.Value(0);
        this.animatedValue3 = new Animated.Value(0);
    }
    // TODO FUNCTION
    onPressTitle(){
        console.log(this);
        this.props.navigator.push({main: 1,});
    }
    // TODO 动画相关
    componentDidMount () {
      this.animate()
    }
    animate () {
      this.animatedValue1.setValue(0)
      this.animatedValue2.setValue(0)
      this.animatedValue3.setValue(0)
      const createAnimation = function (value, duration, easing, delay = 0) {
        return Animated.timing(
          value,
          {
            toValue: 1,
            duration,
            easing,
            delay
          }
        )
      }
      Animated.parallel([
        createAnimation(this.animatedValue1, 2000, Easing.ease),
        createAnimation(this.animatedValue2, 1000, Easing.ease, 1000),
        createAnimation(this.animatedValue3, 1000, Easing.ease, 2000)
      ]).start()
    }
  render() {
    //scaleText -- 插值的输出范围是从0.5到2，我们会用这个值对文本按0.5到2的比例进行缩放
    const scaleText = this.animatedValue1.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 2]
      })
      //spinText -- 插值的输出范围是 0 degrees 到 720 degrees，即将元素旋转两周
      const spinText = this.animatedValue2.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '720deg']
      })
      //introButton -- 插值的输出范围是 -100 到 400，该值会用于 View 的 margin 属性
      const introButton = this.animatedValue3.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 400]
      })
    return (
         //欢迎页展示
        <View style={[styles.container]}>
             <Text>欢迎页面</Text>
             <Text
                style={styles.titleText}
                onPress={this.onPressTitle}>去首页</Text>
            <Animated.View
                style={{ transform: [{scale: scaleText}] }}>
                <Text>Welcome</Text>
              </Animated.View>
              <Animated.View
                style={{ marginTop: 20, transform: [{rotate: spinText}] }}>
                <Text
                  style={{fontSize: 20}}>
                  to the App!
                </Text>
              </Animated.View>
              <Animated.View
                style={{top: introButton, position: 'absolute'}}>
                <TouchableHighlight
                  onPress={this.animate.bind(this)}
                  style={styles.button}>
                  <Text
                    style={{color: 'white', fontSize: 20}}>
                    Click Here To Start
                  </Text>
               </TouchableHighlight>
              </Animated.View>
        </View>
    );
  }
}

var styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    button:{
        backgroundColor:'blue'
    }
});
AppRegistry.registerComponent('WelcomView', () => WelcomView);
