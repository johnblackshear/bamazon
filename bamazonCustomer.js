var mysql = require('mysql');

var inquirer = require('inquirer');

// mysql connection parameters

 var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "joesmells007",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startPromt();
  });

  function startPromt(){
      inquirer.prompt([{
          type:"confirm",
          name:"confirm",
          message:"welcome would you like to veiw our invetory?",
          default:true
      }]).then(function(user){
          if (user.confirm === true){
              startBamazon();
              showInventory();
          }else{
              console.log("Thanks for visiting!");
          }
      });
  }
// user prompt for item and quantity
  function promptUserSelection(){

    inquirer.prompt([
    {
        type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: validateInput,
			filter: Number

    },
    {
        type: 'input',
        name: 'quantity',
        message: 'Please give an amount needed.',
        validate: validateInput,
        filter: Number 

    }
    ]).then(function(input){
        var item = input.item_id;
        var quantity = input.quantity;

        var que = "SELECT * FROM products WHERE? ";

        connection.query(que, {item_id: item}, function(err, data){
            if (err) throw err;

            if(data.length === 0){
                console.log("ERROR: invalid id");
                showInventory();
            }else
            var productInfo = data[0];

            if (quantity <= productInfo.stock_quantity){
                console.log("The requested item is in stock");

                var upadateQue = "UPDATE products SET stock_quantity = " + (productInfo.stock_quantity - quantity) + "WHERE item_id =" + item;

                connection.query(upadateQue, function(err, data){
                    if (err) throw err; 
                    console.log("Your order has been place" + productInfo.price * quantity);
                    connection.end();
                })
            }else{
                console.log("sorry, the product" + productInfo.product_name + "is not in stock");
                console.log("please update your order.");
                showInventory();
            }
        })
    })

  }

  function showInventory(){
      que = "SELECT * FROM products";
    
      connection.query(que, function(err, data){
        if (err) throw err;
        console.log("Availible Inventory");
        console.log("................\n")

        var storage = "";
        for(var i = 0; i < data.lenth; i++){
             storage = "";
            storage += "Item ID:" + data[i].item_id + " // ";  
            strOut += 'Product Name: ' + data[i].product_name + '  //  ';
			strOut += 'Department: ' + data[i].department_name + '  //  ';
            strOut += 'Price: $' + data[i].price + '\n';
            console.log(storage);
        }
        console.log("------------------------")

        promptUserSelection();
      })

    } 
    
    
    function startBamazon(){
        showInventory();
    }

  