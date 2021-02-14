const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(path.dirname(require.main.filename), 'data', 'products.json');

/*The following function tries to read the 'product.json' file 
from the specific file path. If the file do not exist, it executes
the callback function that receives as a parameter with an empty 
array as the argument for this callback function, else it 
executes the callback function with the content of the file as the 
argument for this callback function.*/
const getProductsFromFile = (myCallBackFunc) => {
    fs.readFile(productsFilePath, (error, fileContent) => {
        //if the file do not exist
        if(error){
            /*Then execute the callback with an 
            empty array as the argument passed to it*/
            myCallBackFunc([]);
        }else {
        /*else Then execute the callback with the 
        content of the file (parsed as a JSON object) 
        as the argument passed to it*/
        myCallBackFunc(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product {
    constructor(name, imageUrl, description, price){
        /*Date.now is a JavaScript built-in 
        function which allow us to get the number 
        of miliseconds ELAPSED SINCE January 1, 1970*/
        this.id = Date.now().toString();
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save(){
        //Get all products from the data file
        getProductsFromFile(products => {
            /*takes the new product that came inside the 
            request and add it to the list of products*/
            products.push(this);
            /*In case the file do not exist the next function 
            creates a new file, if the files do actually exist, then 
            the next function replace its content by the new list 
            of products parsed as a string. It also calls a callback 
            that prints any error in case of an error happens.*/
            fs.writeFile(productsFilePath, JSON.stringify(products), error => {
                //Just print the error if there occurs an error while writing the file.
                if(error){
                    console.log(error);
                }
            });
        });
    }
    /*Given that fetch all contains an async function it is 
    necessary to pass a callback as a parameter to be executed
    when the data has finished to be read.*/
    static fetchAll(myCallBackFunc){
        getProductsFromFile(myCallBackFunc);
    }

    static getById(productId, myCallBackFunc){
        getProductsFromFile(products => {
            myCallBackFunc(products.find( product => ( product.id === productId )));
        })
    }
}