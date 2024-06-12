class FrontController {
    static home = async (req, res) => {
        try{
            res.render('index');
        }catch(err){
            console.log(err);
        }
    }
    //Login User
    static login = async (req, res) => {
        try{
            res.render('user/login');
        }catch(err){
            console.log(err);
        }
    }

}

module.exports = FrontController