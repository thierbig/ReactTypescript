export default class Environnement
{
    public static EnvironmentType():string
    {
        return window['ENVIRONMENTTYPE'];
    }

    public static EstLocal():boolean{
        return this.EnvironmentType()==='Local';
    }
}
