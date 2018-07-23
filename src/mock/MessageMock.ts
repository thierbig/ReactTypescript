import ICommunique from "../interfaces/IMessage";

export default class MessageMock
{
    private static _communiqueAccesRapide:ICommunique[]=[
    {icone:"https://imghost.io/images/2018/07/13/icone.png",id:"0",lien:"http://google.com",titre:"Vive les chats!",isLast:false},
    {icone:null,id:"1",lien:"http://google.com",titre:"Non aux abeilles",isLast:false},
    {icone:null,id:"2",lien:"http://google.com",titre:"Pourquoi travailler au CSPQ",isLast:false},
    {icone:null,id:"3",lien:"http://google.com",titre:"Vivre en harmonie avec la nature",isLast:false},
    {icone:"https://imghost.io/images/2018/07/13/icone.png",id:"4",lien:"http://google.com",titre:"**** LES POGOS",isLast:true}]
    
    private static _communiqueCommuniques:ICommunique[]=[
        {icone:null,id:"0",lien:"http://google.com",titre:"DASDSAD!",isLast:false},
        {icone:null,id:"1",lien:"http://google.com",titre:"Bonjour à la vies",isLast:false},
        {icone:null,id:"2",lien:"http://google.com",titre:"Pourquoi travailler au CSPQ",isLast:false},
        {icone:null,id:"3",lien:"http://google.com",titre:"Vivre en harmonie avec la nature",isLast:false},]

    public static getDataAccesRapide():Promise<ICommunique[]>
    {        
        return new Promise<ICommunique[]>((resolve) => {
            setTimeout(()=>{
                resolve(MessageMock._communiqueAccesRapide);
             },1000);
      });
    }

    public static getDataCommuniques():Promise<ICommunique[]>
    {        
        return new Promise<ICommunique[]>((resolve) => {
            setTimeout(()=>{
                resolve(MessageMock._communiqueCommuniques);
             },1000);
      });
    }
}