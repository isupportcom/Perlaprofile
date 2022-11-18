export class User {

    constructor(public username: string, public id: string, private _token: string, private _tokenExpirationDate: Date, public address: string, public afm: string, public city: string, public doy: string, public eponimia: string, public phone1: string, private phone2: string,public zip:string,public trdr:number,public email:string,public emporiki_katigoria: string,public geografikh_zwnh: string,public metaforeas: string,public dromologio: string) {}

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }

    // get afm(){
    //     return this._afm;
    // }
}
