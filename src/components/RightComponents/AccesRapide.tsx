import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ICommunique from '../../interfaces/IMessage';
import CommuniquesService from '../../services/CommuniquesService';
import { Message } from './Message';
import IMessage from '../../interfaces/IMessage';
import AccesRapideService from '../../services/AccesRapideService';

interface IAccesRapideState{loaded:boolean,data:IMessage[]};

export class AccesRapide extends React.Component<null,IAccesRapideState>
{
    constructor(props) {
        super(props);
        this.state={loaded:false,data:[]};
      }
    
    getData():void
    {
        AccesRapideService.getData().then(f=>
            {
                this.setState({loaded:true,data:f});
            })
    }

    renderMessage()
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

    render()
    {        
        return (<div>
                    <div className="box-communique-top"><a className="box-communique-top-text">ACCÈS RAPIDE</a></div> 
                    <div>
                        {this.renderMessage()}
                    </div>
        </div>);        
    }
}