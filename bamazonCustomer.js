var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "bldr2537",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) 
  {
    console.log("Products:\n------------------------------------------" +
                "\nProductID ProductName                Price" +
                "\n------------------------------------------");
    for (var i = 0; i < res.length; i++)
    {
      console.log(buildItemString(res[i]));
    }
    runStore();
  });
}

function buildItemString(item)
{
  var nameString = item.product_name;
  if(item.product_name.length < 22)
  {
    for(var i = 0; i < (22 - item.product_name.length); i++)
    {
      nameString += " ";
    }
  }

  var priceString = " " + item.price;
  if(priceString.length < 8)
  {
    for(var i = 0; i < (8 - priceString.length); i++)
    {
      nameString += " ";
    }
  }

  var result = ((item.id < 10) ? "    " : "   ") + item.id + "   " +
                                            "  " + nameString +
                                            "  " + priceString;
  return result;
}

function runStore()
{
  inquirer
    .prompt({
      name: "productId",
      type: "input",
      message: "What product would you like to buy?"
    })
    .then(function(answer1){
      inquirer
        .prompt({
          name: "qty",
          type: "input",
          message: "How many products would you like to buy?"
        })
        .then(function(answer2){
          var nameString;
          var query = "SELECT * FROM products where id=" + answer1.productId;
          connection.query(query, function(err, res) 
          {
            /*
            console.log(res);
            console.log(res[0].product_name);
            */

            nameString = res[0].product_name;
            console.log("Processing your order to buy " + answer2.qty + " " +
                        nameString + ((answer2.qty == 1) ? "" : "s") + ".");
            // console.log(answer1);
            // console.log(answer2);
            
            var purchaseQuantity = parseInt(answer2.qty);

            if(purchaseQuantity > res[0].stock_quantity)
            {
              console.log("Insufficient quantity.");
            }
            else
            {
              var newQuantity = res[0].stock_quantity - purchaseQuantity;
              connection.query("UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: newQuantity
                  },
                  {
                    id: res[0].id
                  }
                ],
                function(error) {
                  if (error) throw err;
                  console.log("Order placed successfully!");

                }
              );
            }

            connection.end();
          });
        })
    })
}