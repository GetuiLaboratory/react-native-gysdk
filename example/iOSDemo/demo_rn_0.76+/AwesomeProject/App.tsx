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

import GetuiGy from 'react-native-gysdk';

// // 监听方式二：
// var { NativeAppEventEmitter } = require('react-native');
// let names: string[] = ["GTCountSDKDidReceiveGtcid"];

// // 监听个推回调
// const listenerCallBack = (eventName: string, message: any) => {
//   console.log('Event Received', `Event: ${eventName}\nMessage: ${JSON.stringify(message)}`);
//   switch (eventName) {
//     case 'GTCountSDKDidReceiveGtcid':
//       console.log("收到gtcid回调", message)
//       break;
//     //...开发者自行处理
//   }
// };

// // 为每个事件创建一个封装的回调函数
// names.forEach((eventName) => {
//   console.log(`Adding listener for ${eventName}`);
//   NativeAppEventEmitter.addListener(eventName, (message: any) => listenerCallBack(eventName, message));
// });



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
            GetuiGy.setDebug(true)//仅测试环境
            GetuiGy.setPreLoginTimeout(10);
            GetuiGy.setEloginTimeout(10);
            GetuiGy.startSdk("5xpxEg5qvI9PNGH2kQAia2",(succ,gtcid) => {
              console.log("start complete:", succ, gtcid);
            })
          }}
          color={getColors(isDarkMode).button}

        />

        {/* 按钮 2 */}
        <Button
          title="version"
          onPress={() => {

            GetuiGy.version((version) => {
              console.log("SDK Version:", version);
            });
          }}
        />

        <Button
          key={1}
          title="gtcid"
          onPress={() => {
            GetuiGy.gtcid((cid) => {
              Alert.alert('gtcid:', cid)
            });
          }}
          color={getColors(isDarkMode).button}

        />

        <Text style={[styles.headerText, { color: isDarkMode ? '#000' : '#000' }]}>
          Info
        </Text>

        <Button
          title="currentNetworkInfo"
          onPress={() => {
            GetuiGy.currentNetworkInfo((info) => {
              console.log('currentNetworkInfo:', info['carrier'],info['network'])
              //Alert.alert('currentNetworkInfo:', info.toString())
            })
          }}
        />
        <Button
          title="CurrentCarrierCount"
          onPress={() => {
            GetuiGy.currentCarrierCount((count) => {
              Alert.alert('getCurrentCarrierCount:', count.toString())
            })
          }}
        />

        <Text style={[styles.headerText, { color: isDarkMode ? '#000' : '#000' }]}>
          PreLogin
        </Text>

        <Button
          title="preGetToken"
          onPress={() => {
            GetuiGy.isPreGettedTokenValidate((isvalid)=>{
              if (!isvalid) {
                GetuiGy.preGetToken((map)=>{
                  console.log('preGetToken result: ',map)
                })
              } else {
                   console.log('isPreGettedToken is Validate')
              }
            })
          }}
        />
        <Button
          title="deletePreResultCache"
          onPress={() => {
             GetuiGy.deletePreResultCache()
          }}
        />

        <Text style={[styles.headerText, { color: isDarkMode ? '#000' : '#000' }]}>
          Login
        </Text>

        <Button
          title="login"
          onPress={() => {
            GetuiGy.login((succ,result,msg)=>{
            console.log('login result: ',succ, result, msg)
            })
          }}
        />  

        <Text style={[styles.headerText, { color: isDarkMode ? '#000' : '#000' }]}>
          Check Phone Number
        </Text>

        <Button
          title="getPhoneVerifyToken"
          onPress={() => {
            GetuiGy.getPhoneVerifyToken((succ,code,msg)=>{
            console.log('getPhoneVerifyToken result: ',succ, code, msg)
            })
          }}
        />  

        <Button
          title="checkPhoneNumber"
          onPress={() => {
            GetuiGy.checkPhoneNumber('13123877803',(succ,code,msg)=>{
            console.log('checkPhoneNumber result: ',succ, code, msg)
            })
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