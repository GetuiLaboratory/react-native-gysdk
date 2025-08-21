import {
	NativeModules,
	Platform
} from 'react-native';

const GetuiGyModule = NativeModules.GetuiGyModule;

/**
 * Logs message to console with the [Getui] prefix
 * @param  {string} message
 */
const log = (message) => {
	console.log(`[Getui][Ido] ${message}`);
}

export default class GetuiGy {
    /**
	 * 初始化推送服务 只有Android,  IOS在AppDelegate中初始化
     */
    static startSdk(appid, channel){
    	GetuiGyModule.startSdk(appid, channel);
	} 

	/**
	 *  获取SDK的Cid
	 *
	 *  @return Cid值
	 */
	static gtcid(cb) {
		GetuiGyModule.gtcid((param)=>{
			cb(param)
		});
	} 
	static version(cb) {
		GetuiGyModule.version((param)=>{
			cb(param)
		});
	} 
	static setDebugEnable(isEnable) {
		GetuiGyModule.setDebugEnable(isEnable);
	}
	
	static setApplicationGroupIdentifier(idnetifier) {
		GetuiGyModule.setApplicationGroupIdentifier(identifier);
	}

	static setSessionTime(time) {
		GetuiGyModule.setSessionTime(time);
	}

	static setMinAppActiveDuration(val) {
		GetuiGyModule.setMinAppActiveDuration(val);
	}
	static setMaxAppActiveDuration(val) {
		GetuiGyModule.setMaxAppActiveDuration(val);
	}

	static setEventUploadInterval(val) {
		GetuiGyModule.setEventUploadInterval(val);
	}
	static setEventForceUploadSize(val) {
		GetuiGyModule.setEventForceUploadSize(val);
	}
	static setProfileUploadInterval(val) {
		GetuiGyModule.setProfileUploadInterval(val);
	}
	static setProfileForceUploadSize(val) {
		GetuiGyModule.setProfileForceUploadSize(val);
	}
	static setUserId(val) {
		GetuiGyModule.setUserId(val);
	}
	static setSyncGenerateGtcid(val) {
		GetuiGyModule.setSyncGenerateGtcid(val);
	}   
	static registerEventProperties(val) {
		GetuiGyModule.registerEventProperties(val);
	}    
 
	static trackCustomKeyValueEventBegin(eventId) {
		GetuiGyModule.trackCustomKeyValueEventBegin(eventId);
	} 
	static trackCustomKeyValueEventEnd(eventId, args, ext) {
		GetuiGyModule.trackCustomKeyValueEventEnd(eventId, args, ext);
	} 
	static trackCountEvent(eventId, args, ext) {
		GetuiGyModule.trackCountEvent(eventId, args, ext);
	} 
	static setProfile(profiles, ext) {
		GetuiGyModule.setProfile(profiles, ext);
	}  
  
}
