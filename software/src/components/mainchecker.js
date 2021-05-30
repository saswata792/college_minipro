
class Mainchecker 
{
    constructor()
    {

        this.profile="";
    }
    setProfile(check)
    {
        
        this.profile=check;
        console.log(this.profile);
    }
    getProfile()
    {
        return(
            this.profile
        )
    }
}
export default new Mainchecker(); 