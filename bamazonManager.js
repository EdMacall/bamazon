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
  manageStore();
});

function displayProducts(items) 
{
  console.log("\nProducts:\n---------------------------------------------------" +
              "\nProductID ProductName                Price Quantity" +
              "\n---------------------------------------------------");
  for (var i = 0; i < items.length; i++)
  {
    console.log(buildItemString(items[i]));
  }
  manageStore();
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

  var quantityString = "" + item.stock_quantity;
  if(quantityString.length < 8)
  {
    for(var i = 0; i < (8 - quantityString.length); i++)
    {
      quantityString = " " + quantityString;
    }
  }

  var result = ((item.id < 10) ? "    " : "   ") + item.id + "   " +
                                            "  " + nameString +
                                            "  " + priceString +
                                            "  " + quantityString;
  return result;
}

function manageStore() 
{
  console.log("");
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Quit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          viewProducts();
          break;
        case "View Low Inventory":
          viewLowInventory();
          break;
        case "Add to Inventory":
          addToInventory();
          break;
        case "Add New Product":
          addNewProduct();
          break;
        case "Quit":
          quit();
          break;
      }
    });
}

function viewProducts()
{
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) 
  {
    displayProducts(res);
  });
}

function viewLowInventory()
{
  var query = "SELECT * FROM products WHERE stock_quantity < 5";
  connection.query(query, function(err, res) 
  {
    displayProducts(res);
  });
}

function addToInventory()
{

}

function addNewProduct()
{

}

function quit()
{
  connection.end();
}