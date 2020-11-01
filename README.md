# <h1> Simple NodeJs Express API with Model Controller and Routes - CRUD example

This simple prototype is mainly for quick API prototyping, connect to MySQL database and get a response.
## <h5> Note: This is used to prototype few game missions API. Modify as your need 


# <h2>Installation
## <h3> Change Running port
- Edit file "server.js" to run in different port. 
    ```javascript
    var port = 8081;
    ```

## <h3> Database settings
- Edit file /config/db.config.js to change the database connections information and credentials.
    ```javascript
    module.exports = {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "root",
        DB: "node_test",
        PORT: 8889
    };
    ```

- Run command below to create database table.
    ```javascript
    CREATE TABLE `level` (
        `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
        `board` text,
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    ```

- Edit file /models/db.conn.js to change the connection method.
    ```javascript
    const connection = mysql.createConnection({
        host: dbConfig.HOST,
        user: dbConfig.USER,
        password: dbConfig.PASSWORD,
        database: dbConfig.DB,
        port: 	dbConfig.PORT
    });
    ```

## <h3> Routes
- Folder routes/level.routes.js contained the route that defined for the API.
- This router is include in server.js
    ```javascript
    //include route
    require("./routes/level.routes.js")(app);
    ```
- The controller is included in this router
    ```javascript
    module.exports = app => {
    const customers = require("../controllers/customer.controller.js");
    ```

# <h2> How it works

## <h3> Create a level board
- API POST: /start-level
- This API generates a new board with an id.
## <h5> Note: Modify the controller to your need. Currently it generates random string for the fiekd "board".

## <h3> Get a level board
- API GET: /level/:id
- This API get a single level board with id.
### <h4> Response example
- 
    ```json
    {
        "id": 1,
        "board": "[\"NVNSNNNN\",\"HNNNNNSN\",\"NNHVNHSN\",\"VNNNHNNH\",\"SNNHNHNN\",\"NNNNVNNN\",\"NNNNNHSN\",\"NNSNNNNH\"]"
    }
    ```
## <h3> Get all level board
- API GET: /level
- This API get all the level boards.
### <h4> Response example
- 
    ```json
    {
        "id": 1,
        "board": "[\"NVNSNNNN\",\"HNNNNNSN\",\"NNHVNHSN\",\"VNNNHNNH\",\"SNNHNHNN\",\"NNNNVNNN\",\"NNNNNHSN\",\"NNSNNNNH\"]"
    },
    {
        "id": 2,
        "board": "[\"NVVNNHNH\",\"HNNVSNNN\",\"NNNVSNNH\",\"NNNNNHNN\",\"NVVSNHNN\",\"NNVNNSHN\",\"NSSHNNNN\",\"NNNNNNNV\"]"
    }
    ```

## <h3> Update a level board
- API PUT: /level/:id
- This API update a level data.
### <h4> Request example
- 
    ```json
    {
        "board": "test2"
    }
    ```
### <h4> Response example
- 
    ```json
    {
        "id": "2",
        "board": "test2"
    }
    ```

## <h3> Delete a level board
- API DELETE: /level/:id
- This API delete a level data.
### <h4> Response example
- 
    ```json
    {
        "message": "level was deleted successfully!"
    }
    ```

# <h2> Demo
- DEMO: http://nodeex.keenlio.com/


# <h2> Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

# <h2> TODO
- Proper header
- JWT authentication
- API security
- API Authorisation
- OOP

# <h2> License
[MIT](https://choosealicense.com/licenses/mit/)