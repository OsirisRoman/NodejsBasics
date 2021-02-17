const fs = require('fs');
const path = require('path');

const cartFilePath = path.join(
    path.dirname(require.main.filename), 
    'data', 
    'cart.json'
);

const getCartFromFile = (myCallBackFunc) => {
    fs.readFile(cartFilePath, (error, fileContent) => {
        //if the file do not exist
        if(error){
            /*Then execute the callback with an 
            empty array as the argument passed to it*/
            myCallBackFunc({products: [], totalToPay: 0});
        }else {
        /*else Then execute the callback with the 
        content of the file (parsed as a JSON object) 
        as the argument passed to it*/
        myCallBackFunc(JSON.parse(fileContent));
        }
    })
}

module.exports = class Cart {
    constructor(){
        this.products = [];
        this.totalToPay = 0;
    }

    static addProduct(id, productPrice){
        //Fetch the previous cart
        getCartFromFile(cart => {
            //Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products[existingProductIndex];
            //Add new product / increase the quantity and update the total Payment
            if(existingProduct){
                //If the product already exist, then we increase its quantity by 1
                cart.products[existingProductIndex].quantity = existingProduct.quantity + 1;
            } else {
                //If the product has not been added yet, then it is pushed to the end
                cart.products.push({id: id, quantity: 1});
            }
            //At the same time the total amout of payment is increased respectively
            cart.totalToPay = Number(cart.totalToPay) + Number(productPrice);
            cart.totalToPay = cart.totalToPay.toFixed(2);
            //Finally the file replace its content by the new generated one
            fs.writeFile(cartFilePath, JSON.stringify(cart), error => {
                if(error){
                    console.log(error);
                }
            })
        })
    }
    static getProducts(myCallBackFunc){
        getCartFromFile(cart => {
            myCallBackFunc(cart);
        })
    }
    static deleteProduct(productId, price){
        getCartFromFile(cart => {
            const removedProduct = cart.products.find(product => product.id === productId);
            if(!removedProduct) return; 
            cart.products = cart.products.filter(product => product.id !== productId);
            cart.totalToPay = Number(cart.totalToPay) - (price * removedProduct.quantity);
            cart.totalToPay = cart.totalToPay.toFixed(2);
            //Finally the file replace its content by the new generated one
            fs.writeFile(cartFilePath, JSON.stringify(cart), error => {
                if(error){
                    console.log(error);
                }
            })
        })
    }
}