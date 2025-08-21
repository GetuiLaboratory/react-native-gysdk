import React, { useEffect } from 'react';
import {
  View,
  StatusBar,
  Button,
  Alert,
  useColorScheme,
  StyleSheet,
  ScrollView,
  Text,
  NativeEventEmitter
} from 'react-native';

import GetuiIdo from 'react-native-idosdk';

// 监听方式二：
var { NativeAppEventEmitter } = require('react-native');
let names: string[] = ["GTCountSDKDidReceiveGtcid"];

// 监听个推回调
const listenerCallBack = (eventName: string, message: any) => {
  console.log('Event Received', `Event: ${eventName}\nMessage: ${JSON.stringify(message)}`);
  switch (eventName) {
    case 'GTCountSDKDidReceiveGtcid':
      console.log("收到gtcid回调", message)
      break;
    //...开发者自行处理
  }
};

// 为每个事件创建一个封装的回调函数
names.forEach((eventName) => {
  console.log(`Adding listener for ${eventName}`);
  NativeAppEventEmitter.addListener(eventName, (message: any) => listenerCallBack(eventName, message));
});



function App() {
  useEffect(() => {  return () => {
    };
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  // 抽象颜色配置（根据深色/浅色模式动态返回颜色）
  const getColors = (isDarkMode: boolean) => ({
    text: isDarkMode ? '#fff' : '#000',
    button: isDarkMode ? '#2196F3' : '#007AFF',
    background: isDarkMode ? '#121212' : '#f5f5f5',
    header: isDarkMode ? '#1e1e1e' : '#e0e0e0'
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* 标题 */}
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { color: isDarkMode ? '#000' : '#000' }]}>
          功能列表
        </Text>
      </View>

      {/* 按钮列 */}
      <View style={styles.buttonsContainer}>

        <Text style={[styles.headerText, { color: isDarkMode ? '#000' : '#000' }]}>
          IDO APIs
        </Text>
        <Button
          key={1}
          title="startSdk"
          onPress={() => {
            //开发者根据自己的情况设置下方属性
            GetuiIdo.registerEventProperties({"commonPro1":"cc1","commonPro2":100})

            GetuiIdo.setSessionTime(30001)
            GetuiIdo.setMinAppActiveDuration(0)
            GetuiIdo.setMaxAppActiveDuration(12*3600*1000)
            GetuiIdo.setEventUploadInterval(10000)
            GetuiIdo.setEventForceUploadSize(30)
            GetuiIdo.setProfileUploadInterval(5000)
            GetuiIdo.setProfileForceUploadSize(5)
            
            GetuiIdo.setDebugEnable(true)//仅测试环境
            GetuiIdo.startSdk("xXmjbbab3b5F1m7wAYZoG2","appstore")

            GetuiIdo.setUserId("123321")
          }}
          color={getColors(isDarkMode).button}

        />

        {/* 按钮 2 */}
        <Button
          title="version"
          onPress={() => {

            GetuiIdo.version((version) => {
              console.log("SDK Version:", version);
            });
          }}
        />

        <Button
          key={1}
          title="gtcid"
          onPress={() => {
            GetuiIdo.gtcid((cid) => {
              Alert.alert('gtcid:', cid)
            });
          }}
          color={getColors(isDarkMode).button}

        />

        <Text style={[styles.headerText, { color: isDarkMode ? '#000' : '#000' }]}>
          Track
        </Text>

        <Button
          title="track begin"
          onPress={() => {
            GetuiIdo.trackCustomKeyValueEventBegin("event1")
          }}
        />
        <Button
          title="track end"
          onPress={() => {
            GetuiIdo.trackCustomKeyValueEventEnd("event1",{"name":"ak","age":99},"");
          }}
        />
        <Button
          title="track count"
          onPress={() => {
             GetuiIdo.trackCountEvent("countEvent1",{"name":"lucky","age":1},"");
          }}
        />
        <Button
          title="setProfile"
          onPress={() => {
            GetuiIdo.setProfile({"city":"hangzhou","mind":true},"");
          }}
        />  
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    width: '100%',
    gap: 15, // 按钮之间的间距
  },
});

export default App;