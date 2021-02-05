/*
This file just let us export the path of
the root project folder
*/
const path = require('path');

/*dirname let us get the full path 
based in our operative system, while 
require.main.filename return us the 
entry point of the current application.
In our case this entry point file is 
server.js
*/
module.exports = path.dirname(require.main.filename);
