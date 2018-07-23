import * as React from 'react';
import * as ReactDOM from 'react-dom';
import INavigation from '../../interfaces/INavigation';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import {default as env} from '../../Outils/Environnement';

const s=require('./styleNav.css');

interface INavigationState{isSelected:boolean};

export class NavItemCSPQ extends React.Component<INavigation,INavigationState>
{
    constructor(props) {
        super(props);
        if("Accueil"===this.props.lien)
        {
            this.state=({isSelected:true})
        }
        else
        {
            this.state=({isSelected:false})
        }
      }

      makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }
      

      getTextElements()
      {        
        let arrayA:string[]=[];
        //let arrayJSX=[];        
        if(this.props.titre.includes(" "))
        {
            arrayA=this.props.titre.split(" ");
        }
        else
        {
            arrayA.push(this.props.titre);
        }
        return arrayA.map((element,index) => {
            if(index==0)
            {
              if(this.state.isSelected)
              {
                return <p  key={this.makeid()} className="multiline-1 white-text">{element}</p>;
              }
              else
              {
                return <p key={this.makeid()} className="multiline-1">{element}</p>;
              }
            }
            if(index==1)
            {
              if(this.state.isSelected)
              {
                return <div>­<p  key={this.makeid()} className="multiline-2 white-text">{element}</p>
                    <p key={this.makeid()} className="multiline-2 white-text">{element}</p></div>;
              }
              else
              {
                return <p key={this.makeid()} className="multiline-2">{element}</p>;
              }
            }
            else return null;
      });
    }
      componentDidMount()
      {
          //PROD
          let currentPath;
          if(!env.EstLocal()){
            if(this.props.lien!="")
            {
                currentPath=_spPageContextInfo.serverRequestPath.split("/")[4].split(".aspx")[0]      
            }
          }
          else
          {
            if(this.props.lien!="")
            {
                currentPath=this.props.lien.split("/")[3].split(".aspx")[0]
            }
          }
        if("Accueil"===currentPath)
        {
            this.setState({isSelected:true})
        }
        else
        {
            this.setState({isSelected:false})
        }
      }

      render()
      {             
          let cssName="nav-box";       
          if(this.props.titre==="")
          {
              cssName+=" nav-box-vide";
          }
          if(this.state.isSelected)
          {
              cssName+=" nav-box-selected";
          }
                    
         return (<NavItem className={cssName} href={this.props.lien}>{this.getTextElements()}</NavItem>)
          
      }
}
