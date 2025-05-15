const express = require('express');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');

start();

async function start() {
    const app = express();
    
    // Load configurations
    expressConfig(app);
    await databaseConfig(app);
    routesConfig(app);

    
    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port 3000`);
    });
    }