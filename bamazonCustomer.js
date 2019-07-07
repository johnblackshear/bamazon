var mysql = require("mysql");

var inquire = require("inquire");

// mysql connection parameters

 var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startPromt();
  });

  function startPromt(){
      inquire.prompt([{
          type:"confirm",
          name:"confirm",
          message:"welcome would you like to veiw our invetory?",
          default:"true"
      }]).then(function(user){
          if (user.confirm === "true"){
              stock();
          }else{
              console.log("Thanks for visiting!");
          }
      });
  }

  

  