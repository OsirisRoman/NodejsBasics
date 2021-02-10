const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(path.dirname(require.main.filename), 'data', 'products.json');

module.exports = class Product {
    constructor(title){
        this.title = title;
    }
    save(){
        fs.readFile(productsFilePath, (err, fileContent) => {
            let products = [];
            //if the file exist
            if(!err){
                /*then save the content of the file parsed as a JSON
                 object to the variable products*/
                products = JSON.parse(fileContent);
            }
            /*If the file do not exist or if we finished reading 
            file, then add the new product that came inside the 
            request and add it to the list of products*/
            products.push(this);
            /*In case the file do not exist the next function 
            creates a new file, if the files do actually exist, then 
            the next function replace its content by this new content */
            fs.writeFile(productsFilePath, JSON.stringify(products), error => {
                console.log(error);
            });
        })
        products.push(this);
    }
    /*Given that fetch all contains an async function it is 
    necessary to pass a callback as a parameter to be executed
    when the data has finished to be read.*/
    static fetchAll(myCallBackFunc){
        fs.readFile(productsFilePath, (error, fileContent) => {
            //if the file do not exist
            if(error){
                //then return an empty array
                myCallBackFunc([]);
            }else {
            /*else return the content of the file parsed 
            as a JSON object*/
            myCallBackFunc(JSON.parse(fileContent));
            }
        })
    }
}