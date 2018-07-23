import pnp, { CamlQuery } from "sp-pnp-js/lib/pnp";
import IMessage from "../interfaces/IMessage";
import { CAML, SortType } from "../Outils/Caml";




export class MessagesAPI{
    
    public static getAttribute = function(obj, key) {
        return key.split(".").reduce(function(o, x) {
            return (typeof o == "undefined" || o === null) ? o : o[x];
        }, obj);
    }
    

    public static getCommuniques(lastItemCount:number):Promise<IMessage[]>
    {        
        let promise=pnp.sp.web.getList(_spPageContextInfo.webServerRelativeUrl + '/Lists/Communiques').items.top(lastItemCount).orderBy("Modified", false).get();
        return promise.then((items: any[]) => {
            let i:number=0;
            let arrayIMessage:IMessage[]=[];
            while(i<items.length)
            {            
                if(i===items.length)
                {
                    arrayIMessage.push({titre:items[i].Title,lien:items[i].lien.Url,icone:null,id:items[i].ID,isLast:true});
                }
                else
                {
                    arrayIMessage.push({titre:items[i].Title,lien:items[i].lien.Url,icone:null,id:items[i].ID,isLast:false});
                }
                i++;
            }
            return new Promise<IMessage[]>((resolve,reject)=>
            {
                resolve(arrayIMessage);
            });
        });        
    }


    public static getAccesRapide(lastItemCount:number):Promise<IMessage[]>
    {        
        let promise=pnp.sp.web.getList(_spPageContextInfo.webServerRelativeUrl + '/Lists/AccesRapide').items.top(lastItemCount).orderBy("Modified", false).get();
        return promise.then((items: any[]) => {
            let i:number=0;
            let arrayIMessage:IMessage[]=[];
            while(i<items.length)
            {    
                if(i===items.length)
                {
                    arrayIMessage.push({titre:items[i].Title,lien:items[i].Lien.Url,icone:this.getAttribute(items[i],'Icone.Url'),id:items[i].ID,isLast:true});
                }
                else
                {
                    arrayIMessage.push({titre:items[i].Title,lien:items[i].Lien.Url,icone:this.getAttribute(items[i],'Icone.Url'),id:items[i].ID,isLast:false});
                }
                i++;
            }

            return arrayIMessage;
        });        
    }
}