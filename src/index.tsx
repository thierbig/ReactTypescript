import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {default as env} from './Outils/Environnement';
import { AccesRapide } from './components/RightComponents/AccesRapide';
import { Communiques } from './components/RightComponents/Communiques';
import pnp from 'sp-pnp-js/lib/pnp';
import { NavBarCSPQ } from './components/NavComponents/NavBarCSPQ';
import { Group } from './components/FAQComponents/Group';
//import { polyfillLoader } from 'polyfill-io-feature-detection';


/* polyfillLoader({
  "features": "Promise",
  "onCompleted": start
}); */

export const loadFnc= loading;
/* module.exports.SecuriteSharepoint=Securite;
module.exports.loading= loading;
module.exports.Menu=Menu;
module.exports.Licences=Licences; */


pnp.setup({
  sp: {
      headers: {
          "Accept": "application/json; odata=verbose"
      }
  }
});

var loading=function(){
  if(!env.EstLocal()){
    console.log( "local");
  }
      if(document.getElementById('Communiques')!=null){
        ReactDOM.render(
        <Communiques />,
        document.getElementById('Communiques') as HTMLElement
        );
      }
      if(document.getElementById('AccesRapide')!=null){
        ReactDOM.render(
        <AccesRapide />,
        document.getElementById('AccesRapide') as HTMLElement
        );
      }
      if(document.getElementById('NavBarCPSQ')!=null){
        ReactDOM.render(
        <NavBarCSPQ key={1} data={[{lien:_spPageContextInfo.webServerRelativeUrl+"/Accueil.aspx",titre:"Accueil"},{lien:_spPageContextInfo.webServerRelativeUrl+"/Agilite.aspx",titre:"Agilité"},{lien:_spPageContextInfo.webServerRelativeUrl+"/SoutienDev.aspx",titre:"Soutien développement"},{lien:_spPageContextInfo.webServerRelativeUrl+"/SoutienMetho.aspx",titre:"Soutien méthodologique"},{lien:"",titre:""},{lien:_spPageContextInfo.webServerRelativeUrl+"/Formation.aspx",titre:"Formation"},{lien:_spPageContextInfo.webServerRelativeUrl+"/Comites.aspx",titre:"Comités"}]} />,
        document.getElementById('NavBarCPSQ') as HTMLElement
        );
      }
      if(document.getElementById('Group')!=null){
        ReactDOM.render(
        <Group />,
        document.getElementById('Group') as HTMLElement
        );
      }
      
      
      
      
    //});
//});
};

(()=>{
    if (env.EstLocal() ==true) {
      loading();
      /* ReactDOM.render(
        <Banniere  />,
        document.getElementById('banniere') as HTMLElement
      ); */
    }
    else
    {
      SP.SOD.executeOrDelayUntilScriptLoaded(()=>{
        
      }, "sp.js");
      SP.SOD.executeFunc("sp.js","SP.ClientContext",()=>{setTimeout(loading,500) } );
    }
})();
