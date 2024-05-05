const path = require('path');
module.exports={
    entry : './index.ts',
    output:{
        filename: 'index.js',
        path: `${__dirname}/dist`,

    }
}