//
//  RCTGetuiGyModule.h
//  RCTGetuiGyModule
//
//  Created by admin on 17/2/27.
//  Copyright © 2017年 getui. All rights reserved.
//

#import <Foundation/Foundation.h>

#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#elif __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#elif __has_include("React/RCTBridgeModule.h")
#import "React/RCTBridgeModule.h"
#endif

#import <GeYanSdk/GeYanSdk.h>

@interface RCTGetuiGyModule : NSObject<RCTBridgeModule>
+ (instancetype)sharedGetuiGyModule;
@end
