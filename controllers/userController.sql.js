const db = require("../configs/mysql.connection")




//using sql


const register = async(req,res)=>{
    try {
        
    const name = req.body.username
    const email = req.body.email
    const password = req.body.password
  
   
        const sqlInsert = "INSERT INTO tasks_dbs (username,email,password) VALUES (? , ? , ? ) ";
        db.query(sqlInsert,[name , email ,password ] , (error , result ) => {
            if (error) {
                console.log("error" , error)
            }
            console.log(result);
          res.send(result)
        })
    } catch (error) {
        console.log(error.message);
    }
}


  
  const getUsers = async (req, res) => {
    console.log("haii");
    try {
        const sqlGet = "SELECT * FROM tasks_db WHERE email = '?'";
        db.query(sqlGet , ( err, result ) => {
         if (err) {
            console.log("error" , err) 
         }
            res.send(result)
        })
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Login failed');
    }
  };



  const loginUser = async(req,res)=>{
    try {
        const email = req.body.email ;
        const password = req.body.password
        const sqlGet = `SELECT * FROM tasks_dbs WHERE email = ?`;
db.query(sqlGet,[email] ,(err,result)=>{
    if(err){
        console.log(err);
        return 
    }
    console.log(result);
    res.status(200).send({message:"successfull"})
})

    } catch (error) {
        console.log(error.message);
    }
  }
  

module.exports = {
    register,
    getUsers,
    loginUser
}
