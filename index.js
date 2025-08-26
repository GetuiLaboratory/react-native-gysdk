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
	console.log(`[Getui][Gy] ${message}`);
}

export default class GetuiGy {
	/**
	 * 初始化推送服务 只有Android,  IOS在AppDelegate中初始化
	 */
	static startSdk(appid, cb){
		GetuiGyModule.startSdk(appid,(success, gtcid)=>{
			cb(success, gtcid)
		});
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
	static setDebug(isEnable) {
		GetuiGyModule.setDebug(isEnable);
	}

	static setPreLoginTimeout(time) {
		GetuiGyModule.setPreLoginTimeout(time);
	}

	static setEloginTimeout(time) {
		GetuiGyModule.setEloginTimeout(time);
	}

	static currentNetworkInfo(cb) {
		GetuiGyModule.currentNetworkInfo((param)=>{
			cb(param)
		});
	} 
	static currentCarrierCount(cb) {
		GetuiGyModule.currentCarrierCount((param)=>{
			cb(param)
		});
	} 
	static isPreGettedTokenValidate(cb) {
		GetuiGyModule.isPreGettedTokenValidate((param)=>{
			cb(param)
		});
	}  
	static deletePreResultCache() {
		GetuiGyModule.deletePreResultCache();
	}
	static preGetToken(cb) {
		GetuiGyModule.preGetToken((param)=>{
			cb(param)
		});
	}
	static login(cb) {
		GetuiGyModule.login((succ,res,msg)=>{
			cb(succ,res,msg)
		});
	} 
	static getPhoneVerifyToken(cb) {
		GetuiGyModule.getPhoneVerifyToken((succ,code,msg)=>{
			cb(succ,code,msg)
		});
	}
	static checkPhoneNumber(pn,cb) {
		GetuiGyModule.checkPhoneNumber(pn,(succ,code,msg)=>{
			cb(succ,code,msg)
		});
	} 
  
}
