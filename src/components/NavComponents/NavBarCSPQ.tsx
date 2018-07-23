import React, { Component } from 'react'; 
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { NavItemCSPQ } from './NavItemCSPQ';
import INavigation from '../../interfaces/INavigation';


const s=require('./styleNav.css');


interface INavigationProps{data:INavigation[]};

export class NavBarCSPQ extends React.Component<INavigationProps>
{
    constructor(props) {
        super(props);                
      }


      render()
      {
          return( 
                  <Navbar>
                  <Nav className="container-nav-bar">
                  {this.props.data.map((t,index)=><NavItemCSPQ key={index} lien={t.lien} titre={t.titre}/>)}                    
                  </Nav>                
                  </Navbar>);
      }
}
