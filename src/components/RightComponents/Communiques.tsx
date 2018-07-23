import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ICommunique from '../../interfaces/IMessage';
import CommuniquesService from '../../services/CommuniquesService';
import { Message } from './Message';
import IMessage from '../../interfaces/IMessage';

interface ICommuniquesState{loaded:boolean,data:IMessage[]};

export class Communiques extends React.Component<null,ICommuniquesState>
{
    constructor(props) {
        super(props);
        this.state={loaded:false,data:[]};
      }
    
    getData():void
    {
        CommuniquesService.getData().then(f=>
            {
                this.setState({loaded:true,data:f});
            })
    }

    renderMessagesBody()
    {
        let body=null;

        if(this.state.loaded)
        {
            body=<div>{this.state.data.map(t=><Message key={t.id} data={t}/>)}</div>;
        }
        else
        {
            body= <div className="box-message box-communique-bottom-text"><a>EN ATTENTE DE DONNÉES</a></div> 
        }

        return body;
    }
    

    componentDidMount()
    {
        this.getData();

    }    

    //col-sm-3 col-sm-offset-1"
    render()
    {        
        return (<div>
                    <div className="box-communique-top"><a className="box-communique-top-text">COMMUNIQUÉS</a></div> 
                    <div>
                        {this.renderMessagesBody()}
                    </div>
                    <div className="box-message box-communique-bottom-text"><a href="https://google.com">Voir tous les communiqués</a></div>                     
        </div>);        
    }
}