/* import { IRapportLicences, ILicences, ILicencesAccordees } from "./IRapportLicencesInterfaces";
import pnp, { CamlQuery } from "sp-pnp-js";
import { CAML, SortType } from "../Outils/Caml";
import { Kiwi as _Kiwi } from '../../../KIWI.4.Gestion/KIWI.4.1.Erreurs/gestion-erreurs';
import * as Global from "../../../KIWI.5.Utilitaires/KIWI.5.2.Context/context";
import { SiteUser } from "sp-pnp-js/lib/sharepoint/siteusers";

export class RapportLicencesSharepoint{

    public static getRapport():Promise<IRapportLicences>{
        return this.ObtenirInformationLicences().then(Licences => {
            return this.ObtenirInformationLicencesAccordees().then(LicencesAccordees=>{
                    return  { Licenses:Licences, LicencesAccordees:LicencesAccordees } as IRapportLicences
                })
            }
        )
    }   

    private static ObtenirInformationLicences():Promise<ILicences>{
        return  pnp.sp.web.getList(_spPageContextInfo.webServerRelativeUrl + '/Lists/Licences').items.get()
            .then((r:{NbLicencesTotale:number,DateDebutLicence:Date,DateFinLicence:Date}[]) =>{
                var temp=r[0] as ILicences;
                return {DateDebutLicence:new Date(temp.DateDebutLicence),
                    DateFinLicence:new Date(temp.DateFinLicence),
                    NbLicencesTotale:temp.NbLicencesTotale} as ILicences;
        }).catch(e =>{ 
            _Kiwi.GestionErreurs.LancerErreurAjax(this,e);
            return null;    
        });
    }

    private static ObtenirInformationLicencesAccordees():Promise<ILicencesAccordees>{
        var oList = pnp.sp.web.getList(_spPageContextInfo.webServerRelativeUrl + '/Lists/LicencesAccordees');
        var camlQuery:CamlQuery ={ViewXml:""};

        camlQuery.ViewXml=CAML.View(
            [
                CAML.Query
                (
                    [
                        CAML.Where(
                            CAML.Eq(CAML.FieldRef('AccesSansLicence'), CAML.ValueAsBoolean(false))
                        )
                    ]
                )
            ]
        );

        return oList.getItemsByCAMLQuery(camlQuery).then((r:{}[]) =>{
            var compte=r.length;
            console.log("Nombre de licences accordées : " + compte.toString());
            return {
                NombreUtilisateurAvecLicence:compte, 
                NombreUtilisateurSansLicence:0
            } as ILicencesAccordees;
        }).catch(e =>{ 
            _Kiwi.GestionErreurs.LancerErreurAjax(this,e);
            return {
                NombreUtilisateurAvecLicence:0, 
                NombreUtilisateurSansLicence:0
            } as ILicencesAccordees;    
        });
    }
} */