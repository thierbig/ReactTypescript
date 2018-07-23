import React from 'react';
import ReactDOM from 'react-dom';

import { Accordion } from 'semantic-ui-react';
import Collapsible from 'react-collapsible';

import IGroup from '../../interfaces/IAccordion';

interface IGroupState{loaded:boolean,data:IGroup[]};

const s=require('./styleFAQ.css');

export class Group extends React.Component<null,IGroupState>
{
    constructor(props) {
        super(props);
        this.state={loaded:false,data:[]};
        
      }

    getData()
    {
        //this.setState({data:[{group_titre:"lol",sujet:[{subsujet_content:["lol"],subsujet_titre:["lol"],sujet_titre:["lol"]}]}],loaded:true})
    }  
    
    componentDidMount()
    {
        this.getData();

    }   

   /*  getAccordion()
    {
        let AccordionContent = (content) => (
            <div className="indent">
              {content}
            </div>
          )
        let groups=[];
        this.state.data.forEach((subject)=> {
            let subjects=[];                        
            let subsubjects=[];
                //subject.subsubjet_titre.forEach((subsubject_titre,index)=> {
                    subsubjects.push(
                        <Collapsible trigger={subsubject_titre}><p>{subject.subsubjet_message[index]}</p></Collapsible>
                       );
                    });

                subject.sujet_titre.forEach((sujet_titre)=> {
                    subjects.push(
                        <Collapsible trigger={sujet_titre}>{subsubjects}</Collapsible>
                      )

                    });

                    
                groups.push(<Collapsible trigger={subject.group_titre}>{subsubjects}</Collapsible>)                  
                });
                

                return (groups);
                

                
        
    } */

    render() {
        return (<Collapsible trigger={"HELlo"}>{"Not"}</Collapsible>);
      }
}