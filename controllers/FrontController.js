class FrontController {
    static home = async (req, res) => {
        try{
            res.render('index');
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = FrontController