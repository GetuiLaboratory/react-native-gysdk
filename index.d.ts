

export default class GetuiGy { 
	static startSdk(appid: string, cb: (success: boolean, gtcid: string) => void): void;
	 
	static gtcid(cb: (param: string) => void): void;
 
	static version(cb: (param: string) => void): void;
 
	static setDebug(isEnable: boolean): void;

	static setPreLoginTimeout(time: number): void;

	static setEloginTimeout(time: number);

	static currentNetworkInfo(cb: (map: Map) => void);
	static currentCarrierCount(cb: (count: number) => void);

	static isPreGettedTokenValidate(cb: (isvalid: boolean) => void): void;
	
	static deletePreResultCache();

	static preGetToken(cb: (map: Map) => void);
	static login(cb: (success: boolean, result:Map, msg:string) => void);
	static getPhoneVerifyToken(cb: (success: boolean, code:number, msg:string) => void);
	static checkPhoneNumber(pn:string, cb: (success: boolean, code:number, msg:string) => void);
}
