const college_list = require('./us.json')
 // file system module to perform file operations
const fs = require('fs');

function renameKey ( obj, oldKey, newKey ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }

     
 
  college_list.forEach( obj => renameKey( obj, 'institution', 'name' ) );
  const updatedJson = JSON.stringify( college_list );
  
  console.log( updatedJson );
// write JSON string to a file

fs.writeFile('user.json', updatedJson, err => {
  if (err) {
    throw err
  }
  console.log('JSON data is saved.')
})
