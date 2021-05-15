
class Mainchecker 
{
    constructor()
    {

        this.profile=0;
    }
    setProfile(check)
    {
        this.profile=check.val();
    }
    getProfile()
    {
        return(
            this.profile
        );
    }
}
export default new Mainchecker(); //class k object kore dewa holo