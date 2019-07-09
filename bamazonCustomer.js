var mysql = require('mysql');
var Table = require('cli-table2');
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

  /*connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    //startPromt();
    showInventory();

  });


/*
  function startPromt(){
      inquirer.prompt([{
          type:"confirm",
          name:"confirm",
          message:"welcome would you like to veiw our invetory?",
          default:true
      }]).then(function(user){
          if (user.confirm === true){
              startBamazon();
          }else{
              console.log("Thanks for visiting!");
          }
      });
  }
// user prompt for item and quantity
  function promptUserSelection(){

    inquirer.prompt([
    {
        name: 'item_id',
        type: 'input',
		message: 'Please enter the Item ID which you would like to purchase.',
			

    },
    {
        type: 'input',
        name: 'quantity',
        message: 'Please give an amount needed.',   
        filter: Number
    },

    
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
            var productData = data[0];

            if (quantity <= productData.stock_quantity){
                console.log("The requested item is in stock");

                var upadateQue = "UPDATE products SET stock_quantity = " + (productData.stock_quantity - quantity) + "WHERE item_id =" + item;

                connection.query(upadateQue, function(err, data){
                    if (err) throw err; 
                    console.log("Your order has been place" + productData.price * quantity);
                    connection.end();
                })
            }else{
                console.log("sorry, the product" + productData.product_name + "is not in stock");
                console.log("please update your order.");
                showInventory();
            }
        })
    })

  }*/

function showInventory(){
      
    
      connection.query('SELECT * FROM products', function(err,res){
        if (err) throw err;
        console.log("Welocme to Bamazon!!")
        console.log("------------------------");
        console.log("Availible Inventory");
        console.log("------------------------");

        //promptUserSelection();
     
      var table = new Table({
        head: ['Product Id', 'Product Name', 'Price', 'QTY'], 
        colWidths: [12, 50, 8,8],
        colAligns: ["center", "left", "right","right" ],
    });

    for(i = 0; i < res.length; i++){
        table.push([res[i].item_id,res[i].product_name, res[i].price, res[i].stock_quantity]);
    }
    console.log(table.toString());
    console.log("-------------------\n");
    promptUserSelection();
});
};

var  promptUserSelection = function(){

    inquirer.prompt({
    
        name: 'selectedProduct',
        type: 'input',
		message: 'Please enter the Item ID which you would like to purchase.',
    
    })
    .then(function(answer1){
        var selected = answer1.selectedProduct;
        connection.query("SELECT * FROM products WHERE item_id=?",selected, function(err,res){
           if(err) throw err;
           if (res === 0){
               console.log("Item is not in inventory, please select from listed items.");
            promptUserSelection();
           }else{
            inquirer.prompt({
                name: "quantity",
                type: "input",
                message: "How many of this item would you like to purchase?"
            })
            .then(function(answer2){
                var selectedQty = answer2.quantity;
                if (selectedQty > res[0].stock_quantity){
                console.log("Sorry " + res[0].product_name + " only has " + res[0].stock_quantity + " availible items");
                promptUserSelection();
                }else{
                    console.log("there is enough in stock");
                }
            })
           }
        });
    });
};        
           
        





  showInventory();   
    

   

 