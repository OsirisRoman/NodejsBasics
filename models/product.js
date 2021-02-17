const Cart = require('./cart')
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
    constructor(id=Date.now().toString(), name, imageUrl, description, price){
        /*Date.now is a JavaScript built-in 
        function which allow us to get the number 
        of miliseconds ELAPSED SINCE January 1, 1970*/
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save(){
        //Get all products from the data file
        getProductsFromFile(products => {
            //Check if the product already exist
            const productIndex = products.findIndex(product => product.id === this.id);
            if(productIndex === -1){
                /*takes the new product that came inside the 
                request and add it to the list of products*/
                products.push(this);
            }else {
                /*If the product already exist, then it is just updated */
                products[productIndex] = this;
            }
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
    static deleteFromProductsList(productId){
        //Get all products from the data file
        getProductsFromFile(products => {
            const productToRemove = products.find(product => product.id === productId);
            //Create a new Array without the product that the user wants to delete
            const updatedProductList = products.filter(product => product.id !== productId);
            
            /*then save the result in the product.json file. It also calls a callback 
            that prints any error in case of an error happens.*/
            fs.writeFile(productsFilePath, JSON.stringify(updatedProductList), error => {
                //Just print the error if there occurs an error while writing the file.
                if(error){
                    console.log(error);
                }
            });
            Cart.deleteProduct(productId, productToRemove.price);
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