import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IMessage from '../../interfaces/IMessage';
const s=require('./styleMessage.css');


interface IMessageProp{data:IMessage};


export class Message extends React.Component<IMessageProp>
{
    constructor(props) {
        super(props);    
      }

    isNull(something: any) {
        return something === null;
    }


    handleMessage()
    {
        if(!this.props.data.isLast)
        {
            if(!this.isNull(this.props.data.icone))
            {
                return <div className='box-message'><img className='icone' src={this.props.data.icone}/> <a href={this.props.data.lien}>{this.props.data.titre}</a></div>
            }
            else
            {
                return <div className='box-message'> <a href={this.props.data.lien}>{this.props.data.titre}</a></div>   
            }
        }
        else
        {
            if(!this.props.data.icone!==null)
            {
                return <div className='box-message box-message-icon box-message-bottom'> <a href={this.props.data.lien}>{this.props.data.titre}</a></div>      
            }
            else
            {
                return <div className='box-message box-message-bottom'> <a href={this.props.data.lien}>{this.props.data.titre}</a></div>   
            }
        }    
    }
      

    render(){
        return this.handleMessage()
    }
    
}