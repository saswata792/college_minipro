
class Mainchecker 
{
    constructor()
    {

        this.profile="";
    }
    setProfile(check)
    {
        
        this.profile=check;
    }
    getProfile()
    {
        return(
            this.profile
        )
    }
}
export default new Mainchecker(); 