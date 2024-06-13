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
    //User Dashboard
    static dashboard = async (req, res) => {
        try{
            res.render('user/dashboard');
        }catch(err){
            console.log(err);
        }
    }
    //Policy
    static policy = async (req, res) => {
        try{
            res.render('policy');
        }catch(err){
            console.log(err);
        }
    }

}

module.exports = FrontController