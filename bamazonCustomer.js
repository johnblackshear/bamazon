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
//----------- function to display information in a cli table ------------------

function showInventory(){
      
    
      connection.query('SELECT * FROM products', function(err,res){
        if (err) throw err;
        console.log("Welocme to Bamazon!!")
        console.log("------------------------");
        console.log("Availible Inventory");
        console.log("------------------------");

     
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

// ----------- function and prompt to for user to select a product using item_id -----------

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
// ---------------- show product name when item_id is selected -----------------
               console.log("You have selected: " + res[0].product_name);
// ----------- prompt for quantity selection -------------------------
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
                    console.log(res[0].product_name);
                    console.log("Your total is: " + "$" + res[0].price * selectedQty);

// ------------------ update the qauntity in table --------------------------
                var updateQty = res[0].stock_quantity - selectedQty;
                connection.query(
                    "UPDATE products SET stock_quantity = " + updateQty + " WHERE item_id = " + res[0].item_id,
                    function(err, resUpdate) {
                        if (err) throw err;
                        console.log("Your Order has been Processed. Thank You for your service..!");
                        connection.end();
                        }
                    );   
                }
            });
           }
        });
    });
};        
           
        





  showInventory();   
    

   

 