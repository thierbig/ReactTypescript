import ICommunique from "../interfaces/IMessage";
import Environnement from "../Outils/Environnement";
import MessageMock from "../mock/MessageMock";
import { MessagesAPI } from "../sharepointREST/MessagesAPI";


export default class CommuniquesService
{
    public static getData():Promise<ICommunique[]>
    {
        if(Environnement.EstLocal())
        {
            return MessageMock.getDataCommuniques();
        }
        else
        {
            return MessagesAPI.getCommuniques(5);
        }
    }
}