import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import React

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    
    //way1: factory方式
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "AwesomeProject",
      in: window,
      launchOptions: launchOptions
    ) 
    return true
    
    // way2: rootView方式，创建并配置桥接器 （启动异常，报无法连接server; 但是用objc实现又正常了，参考archive目录中的Appdelegate）
//    let bridge = RCTBridge(delegate: self, launchOptions: launchOptions)
//    let rootView = RCTRootView(bridge: bridge!, moduleName: "AwesomeProject", initialProperties: nil)
//    let rootViewController = UIViewController()
//    rootViewController.view = rootView
//    self.window = UIWindow(frame: UIScreen.main.bounds)
//    self.window?.rootViewController = rootViewController
//    self.window?.makeKeyAndVisible()
//    return true
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
