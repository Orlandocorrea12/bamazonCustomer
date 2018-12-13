var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "Bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});


function start() {
    connection.query("SELECT * FROM PRODUCTS", (err, res) => {
        if (err) throw err;
        console.table(res);
        console.log("\n---------------------------------------------------------------------\n");
        inquirer.prompt([{
            name: "ID",
            type: "input",
            message: "Which ID would you like to buy?",
            filter: Number
        },
        {
            name: "amount",
            type: "input",
            message: "How many would you like to buy?",
            filter: Number
        }
        ]).then(function (input) {
            var id = input.ID;
            var amount = input.amount;
            connection.query("select * from products where ?", { id: id }, function (err, data) {
                if (err) throw err;

                else {
                    var product = data[0];

                    if (amount <= product.stock_quantity) {
                        console.log("We have that in stock!")
                        var update = 'UPDATE products SET stock_quantity = ' + (product.stock_quantity - amount) + ' WHERE id = ' + id;
                        connection.query(update, (err, res) => {
                            if (err) throw err;
                            console.log('Your item will be shipped! Your total is $' + product.price * amount);
                            console.log("\n---------------------------------------------------------------------\n");
                            connection.end();
                        });
                    } else {
                        console.log('Insufficient quantity!');
                        console.log("\n---------------------------------------------------------------------\n");

                        connection.query("SELECT * FROM PRODUCTS", (err, res) => {
                            if (err) throw err;
                            console.table(res);
                            console.log("\n---------------------------------------------------------------------\n");
                            connection.end();
                        });
                    };
                };
            });
        });
    });
};
