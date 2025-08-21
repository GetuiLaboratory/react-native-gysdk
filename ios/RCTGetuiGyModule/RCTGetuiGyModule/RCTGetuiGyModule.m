//
//  RCTGetuiGyModule.m
//  RCTGetuiGyModule
//
//  Created by admin on 17/2/27.
//  Copyright © 2017年 getui. All rights reserved.
//

#import "RCTGetuiGyModule.h"

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTEventDispatcher.h>
#import <React/RCTRootView.h>
#import <React/RCTBridge.h>
#import <React/RCTLog.h>
#import <React/RCTEventEmitter.h>

#elif __has_include("RCTBridge.h")
#import "RCTEventDispatcher.h"
#import "RCTRootView.h"
#import "RCTBridge.h"
#import "RCTLog.h"
#import "RCTEventEmitter.h"
#elif __has_include("React/RCTBridge.h")
#import "React/RCTEventDispatcher.h"
#import "React/RCTRootView.h"
#import "React/RCTBridge.h"
#import "React/RCTLog.h"
#import "React/RCTEventEmitter.h"

#endif
 


@interface RCTGetuiGyModuleEvent : NSObject
@property (nonatomic, copy) NSString *name;
@property (nonatomic) id body;
@end
@implementation RCTGetuiGyModuleEvent
@end


@interface RCTGetuiGyModule ()
@property (nonatomic, strong) NSMutableArray<RCTGetuiGyModuleEvent *> *cachedEvents;
@end


@implementation RCTGetuiGyModule

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();
+ (instancetype)sharedGetuiGyModule {
    static RCTGetuiGyModule *module;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        module = [[super allocWithZone:NULL] init];
        [module setup];
    });
    return module;
}

+ (instancetype)allocWithZone:(struct _NSZone *)zone {
    return [self sharedGetuiGyModule];
}

- (instancetype)init {
    if ((self = [super init])) {
        NSLog(@"GYSDK>>>init self:%@",self);
    }
    return self;
}

- (void)setup {
    NSLog(@"GYSDK>>>setup");
    self.cachedEvents = [NSMutableArray array];
}

//需要等待bridge被RN初始化后，才能回调JS
- (void)setBridge:(RCTBridge *)bridge {
    NSLog(@"GYSDK>>>setBridge %@", bridge);
    _bridge = bridge;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [self performCachedEvents];
    });
    //     dont work
    //    dispatch_async(self.methodQueue, ^{
    //        [self performCachedEvents];
    //    });
}

- (RCTBridge *)bridge {
    return _bridge;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

//RCT_EXPORT_METHOD(createClient:(NSDictionary *) options
//                  resolver:(RCTPromiseResolveBlock)resolve
//                  rejecter:(RCTPromiseRejectBlock)reject) {
//
//
//    NSLog(@"GYSDK>>>createClient bridge:%@ self:%@",[self bridge], self);
//    resolve([NSNumber numberWithInt:123]);
//}
//
//RCT_EXPORT_METHOD(resume)
//{
//   NSLog(@"GYSDK>>>resume self:%@",self);
//    [self.bridge.eventDispatcher sendDeviceEventWithName:@"GeTuiSdkDidRegisterClient"
//                                                    body:@{@"event": @"closing"
//                                                           }];
//}

- (void)performCachedEvents {
    for (RCTGetuiGyModuleEvent *event in self.cachedEvents) {
        [self getui_sendAppEventWithName:event.name body:event.body];
    }
    [self.cachedEvents removeAllObjects];
}

- (void)getui_sendAppEventWithName:(NSString *)name body:(id)body {
#if DEBUG
    NSLog(@"GYSDK>>>sendEvent name:%@ body:%@", name, body);
#endif
    
    if(self.bridge) {
        [self.bridge.eventDispatcher sendDeviceEventWithName:name body:body];
    }else {
        RCTGetuiGyModuleEvent *event = [[RCTGetuiGyModuleEvent alloc] init];
        event.name = name;
        event.body = body;
        [self.cachedEvents addObject:event];
    }
}
//
////MARK: - GeYanSdkDelegate
//
//- (void)GeYanSdkDidReceiveGtcid:(NSString *)gtcid error:(NSError *)error {
//    NSLog(@"GYSDK>>>GeYanSdkDidReceiveGtcid %@",gtcid);
//    [self getui_sendAppEventWithName:@"GeYanSdkDidReceiveGtcid"
//                                body:gtcid];
//}

//MARK: -- SDK


//+ (void)startSDKWithAppId:(NSString *)appId withChannelId:(NSString *)channelId delegate:(id<GeYanSdkDelegate>)delegate;
/**
 *  销毁SDK，并且释放资源
 */
RCT_EXPORT_METHOD(startSdk:(NSString *)appId callback:(RCTResponseSenderBlock)callback)
{
    
    NSLog(@"GYSDK>>>startSDKWithAppId %@", appId);
    [GeYanSdk startWithAppId:appId
                withCallback:^(BOOL isSuccess, NSError *error, NSString *gtcid) {
        callback(@[@(isSuccess),gtcid]);
    }];
}

RCT_EXPORT_METHOD(version:(RCTResponseSenderBlock)callback)
{
    NSLog(@"GYSDK>>>version");
    callback(@[[GeYanSdk getVersion]]);
}
 
RCT_EXPORT_METHOD(gyuid:(RCTResponseSenderBlock)callback)
{
    NSLog(@"GYSDK>>>gtcid");
    NSString *gyuid = [GeYanSdk gyuid]?:@"";
    callback(@[gyuid]);
}

//MARK: - Properties

RCT_EXPORT_METHOD(setDebug:(BOOL)debug)
{
  NSLog(@"GYSDK>>>setDebug %@", @(debug));
   [GeYanSdk setDebug:debug];
}

RCT_EXPORT_METHOD(setPreLoginTimeout:(NSInteger)time)
{
  NSLog(@"GYSDK>>>setPreLoginTimeout %@", @(time));
   [GeYanSdk setPreLoginTimeout:time];
}

RCT_EXPORT_METHOD(setEloginTimeout:(NSInteger)time)
{
  NSLog(@"GYSDK>>>setEloginTimeout %@", @(time));
   [GeYanSdk setEloginTimeout:time];
}

RCT_EXPORT_METHOD(currentNetworkInfo:(RCTResponseSenderBlock)callback)
{
    NSLog(@"GYSDK>>>currentNetworkInfo");
    callback(@[[GeYanSdk currentNetworkInfo]]);
}
 
RCT_EXPORT_METHOD(getCurrentCarrierCount:(RCTResponseSenderBlock)callback)
{
    NSLog(@"GYSDK>>>getCurrentCarrierCount");
    callback(@[[GeYanSdk getCurrentCarrierCount]]);
}
 
//MARK: - PreLogin

RCT_EXPORT_METHOD(isPreGettedTokenValidate)
{
  NSLog(@"GYSDK>>>isPreGettedTokenValidate");
    //akak test?
   return [GeYanSdk isPreGettedTokenValidate];
}

RCT_EXPORT_METHOD(deletePreResultCache)
{
  NSLog(@"GYSDK>>>deletePreResultCache");
   [GeYanSdk deletePreResultCache];
}

RCT_EXPORT_METHOD(preGetToken:(RCTResponseSenderBlock)callback)
{
   NSLog(@"GYSDK>>>preGetToken");
    [GeYanSdk preGetToken:^(NSDictionary *preDic) {
        NSLog(@"preGetToken: %@ %@", preDic, preDic[@"msg"]);
        callback(@[preDic]);
    }];
}

//MARK: - Login

RCT_EXPORT_METHOD(login:(RCTResponseSenderBlock)callback)
{
   NSLog(@"GYSDK>>>login");
    [GeYanSdk getPhoneVerifyTokenCallback:^(NSDictionary *result) {
        NSLog(@"GYSDK>>>getPhoneVerifyToken: %@ %@", result, result[@"msg"]);
        NSString *msg = result[@"msg"] ?:@"";
        NSNumber *code = result[@"code"];
        NSString *token = result[@"token"];
        if (token.length > 0) {
            callback(@[@(YES), code, msg);
        } else {
            callback(@[@(NO), code, msg);
        }
    }];
    
    [GyOneLoginPro requestTokenWithCompletion:^(NSDictionary * _Nullable result) {
        NSLog(@"GYSDK>>>login result:%@", result);
        NSString *msg = result[@"msg"] ?:@"";
        NSNumber *code = result[@"code"];
      
#if DEBUG
        [[RCTGetuiGyModule sharedGetuiGyModule] queryPhoneNumber:result]];
#endif
        if ([result[@"code"] isEqualToNumber:@30000]) {
            callback(@[@(YES), code, msg);
        } else {
            callback(@[@(NO), code, msg);
        }
    }];
}
 
/// 向服务端查询完整手机号
- (void)queryPhoneNumber:(NSDictionary*)result {
//    SuccessController *vc = [[SuccessController alloc] init];
//    vc.tipTitle = @"登录成功";
//    vc.pn = result[@"number"] ?: @"";
//    [self.navigationController presentViewController:vc animated:YES completion:nil];
//    return;
    
//    [CommonToastHUD showLoadingHUDWithMessage:@"查询号码中"];
    // TODO, 正式版本请根据服务端对接文档使用加密接口 https://openapi-gy.getui.com/v2/gy/ct_login/gy_get_pn
    NSURL *url = [[NSURL alloc] initWithString:@"https://openapi-gy.getui.com/v1/gy/ct_login/gy_get_pn"];
    NSString *token = result[@"token"] ?:@"";
    NSString *pid = result[@"processID"] ?:@"";
    NSString *gyuid = result[@"gyuid"] ?:@"";
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    NSDictionary *params = @{
        @"appId": [appDelegate getAppID],
        @"gyuid": gyuid,
        @"token": token,
        @"processId": pid
    };
    NSLog(@"json : %@", params);
    NSData *data = [Utils dic2JsonData:params];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    [request setHTTPBody:data];
//    self.startTime = CFAbsoluteTimeGetCurrent();
    NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration] delegate:nil delegateQueue:nil];
    NSURLSessionDataTask *task = [session dataTaskWithRequest:request completionHandler:^(NSData *_Nullable data, NSURLResponse *_Nullable response, NSError *_Nullable error) {
        dispatch_async(dispatch_get_main_queue(), ^{
//            [CommonToastHUD hideAllHUD];
            if (data.length == 0) {
//                [CommonToastHUD hideAllAndTip:@"查询失败"];
                NSLog(@"查询失败");
                return;
            }
            
            CFAbsoluteTime endTime = CFAbsoluteTimeGetCurrent();
            //{"errno":0,"data":{"msg":"成功","result":"20000","data":{"pn":"15258060533"}}}
            NSDictionary *dic = [Utils jsonData2Dic:data];
            NSLog(@"收到回执: %lf", endTime);
            NSLog(@"收到回执内容：%@", dic);
            NSLog(@"取号耗时: %lf，token：%@", (endTime - self.startTime) * 1000, token);
            
//            if ([dic[@"errno"] intValue] == 0) {
//                SuccessController *ctrl = [[SuccessController alloc] init];
//                ctrl.tipTitle = @"登录成功";
//                ctrl.pn = dic[@"data"][@"data"][@"pn"]?:@"";
//                [self.navigationController pushViewController:ctrl animated:YES];
//            } else {
//                [CommonToastHUD hideAllAndTip:dic[@"msg"]];
//            }
        });
    }];
    [task resume];
}

//MARK: - 本机号码校验

RCT_EXPORT_METHOD(getPhoneVerifyTokenCallback:(RCTResponseSenderBlock)callback)
{
   NSLog(@"GYSDK>>>getPhoneVerifyTokenCallback");
    [GeYanSdk getPhoneVerifyTokenCallback:^(NSDictionary *result) {
        NSLog(@"GYSDK>>>getPhoneVerifyToken: %@ %@", result, result[@"msg"]);
        NSString *msg = result[@"msg"] ?:@"";
        NSNumber *code = result[@"code"];
        NSString *token = result[@"token"];
        if (token.length > 0) {
            callback(@[@(YES), code, msg);
        } else {
            callback(@[@(NO), code, msg);
        }
    }];
}

RCT_EXPORT_METHOD(checkPhoneNumber:(NSString *)pn callback:(RCTResponseSenderBlock)callback)
{
   NSLog(@"GYSDK>>>checkPhoneNumber");
    [GeYanSdk checkPhoneNumber:pn andCallback:^(NSDictionary * _Nullable verifyDictionary) {
        NSLog(@"GYSDK>>>checkPhoneNumber: %@", verifyDictionary);
        NSString *msg = result[@"msg"] ?:@"";
        NSNumber *code = verifyDictionary[@"code"];
        if ([code isEqualToNumber:@30000]) {
            callback(@[@(YES),code, msg);
        } else {
            callback(@[@(NO),code, msg);
        }
    }];
}
 

@end

