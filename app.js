/*
HenrysBooks Web Application
COP4710 Assignment 5
Written by Shaan Khan
*/

// Load a simple app server on Express.
// We need to import the Express library by declaring a const.
const express = require('express');
// Create new instance of Express.
const app = express();
// We will use morgan to log requests.
// This will help us figure out errors in code.
const morgan = require('morgan');
app.use(morgan('short'));
// Import Mysql library.
const mysql = require('mysql');
// Static HTML files will be served from the public directory by Express
app.use(express.static('./public'));

// Specify root route. Use / for root. req = request, res = response.
app.get("/", (req, res) => {
  console.log("Responding to root route");

  // Here is the response to the client request to the root.
  res.send("You have reached the root.");
})

// GetConnection is a helper function that will connect to MySQL database
function getConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'COP4710_HenrysBooks'
  })
}

// Install body-parser and import it
const bodyParser = require('body-parser');

// Use bodyParser to parse what is input into forms by the user
app.use(bodyParser.urlencoded({extended: false}));

// Create author insert post route
app.post('/author_insert', (req, res) => {
  console.log("Inserting into Author table");
  console.log("Getting form data");

  // Use bodyparser to get variables passed in
  console.log("Author Number: " + req.body.createAuthorNum);
  console.log("Author First Name: " + req.body.createFirstName);
  console.log("Author Last Name: " + req.body.createLastName);

  // Store the Strings input by user into variables
  var firstNameInput = req.body.createFirstName;
  var lastNameInput = req.body.createLastName;
  var numberInput = req.body.createAuthorNum;

  // queryString will hold SQL command to insert
  const queryString = "INSERT INTO Author (authorNum, authorLast, authorFirst) VALUES (?, ?, ?)";

  // Now execute MySQL query to insert these values into table.
  getConnection().query(queryString, [numberInput, lastNameInput, firstNameInput], (err, results, fields) => {
    if (err) {
      console.log("Failed to INSERT");
      return
    }
  })
  console.log("Insert was successful");
})

// Create book insert post route
app.post('/book_insert', (req, res) => {
  console.log("Inserting into Book table");
  console.log("Getting form data");

  // Use bodyparser to get variables passed into bookinsertform.html
  console.log("Book Code: " + req.body.createBookCode);
  console.log("Title" + req.body.createTitle);
  console.log("Publisher Code: " + req.body.createPublisherCode);
  console.log("Type: " + req.body.createType);
  console.log("Paperback: " + req.body.createPaperback);

  // Store the Strings input by user into variables
  var newBookCode = req.body.createBookCode;
  var newTitle = req.body.createTitle;
  var newPublisherCode = req.body.createPublisherCode;
  var newType = req.body.createType;
  var newPaperback = req.body.createPaperback;

  // queryString will hold SQL command to insert
  const queryString = "INSERT INTO Book (bookCode, title, publisherCode, type, paperback) VALUES (?, ?, ?, ?, ?)";

  // Now execute MySQL query to insert these values into table.
  getConnection().query(queryString, [newBookCode, newTitle, newPublisherCode, newType, newPaperback], (err, results, fields) => {
    if (err) {
      console.log("Failed to INSERT");
      return
    }
  })
  console.log("Insert was successful");
})

// Create publisher insert post route
app.post('/publisher_insert', (req, res) => {
  console.log("Inserting into Publisher table");
  console.log("Getting form data");

  // Use bodyparser to get variables passed into publisherinsertform.html
  console.log("Publisher Code: " + req.body.createPublisherCode);
  console.log("Publisher Name: " + req.body.createPublisherName);
  console.log("City" + req.body.createCity);

  // Store the Strings input by user into variables
  var newPublisherCode = req.body.createPublisherCode;
  var newCity = req.body.createCity;
  var newPublisherName = req.body.createPublisherName;

  // queryString will hold SQL command to insert
  const queryString = "INSERT INTO Publisher (publisherCode, publisherName, city) VALUES (?, ?, ?)";

  // Now execute MySQL query to insert these values into table.
  // First, call getConnection.
  getConnection().query(queryString, [newPublisherCode, newPublisherName, newCity], (err, results, fields) => {
    if (err) {
      console.log("Failed to INSERT");
      return
    }
  })
  console.log("Insert was successful");
})

// Create copy insert post route
app.post('/copy_insert', (req, res) => {
  console.log("Inserting into Copy table");
  console.log("Getting form data");

  // Use bodyparser to get variables passed in
  console.log("Book Code: " + req.body.createBookCode);
  console.log("Branch Number: " + req.body.createBranchNumber);
  console.log("Copy Number: " + req.body.createCopyNumber);
  console.log("Quality: " + req.body.createQuality);
  console.log("Price: " + req.body.createPrice);

  // Store the Strings input by user into variables
  var newBookCode = req.body.createBookCode;
  var newBranchNumber = req.body.createBranchNumber;
  var newCopyNumber = req.body.createCopyNumber;
  var newQuality = req.body.createQuality;
  var newPrice = req.body.createPrice;

  // queryString will hold SQL command to insert
  const queryString = "INSERT INTO Copy (bookCode, branchNum, copyNum, quality, price) VALUES (?, ?, ?, ?, ?)";

  // Now execute MySQL query to insert these values into table.
  getConnection().query(queryString, [newBookCode, newBranchNumber, newCopyNumber, newQuality, newPrice], (err, results, fields) => {
    if (err) {
      console.log("Failed to INSERT");
      return
    }
  })
  console.log("Insert was successful");
})

// Create author delete post route
app.post('/author_delete', (req, res) => {
  console.log("Deleting from Author table");
  console.log("Getting form data");

  // Use bodyparser to get variables passed in
  console.log("Author Number: " + req.body.deleteAuthorNum);

  // Store the Strings input by user into variables
  var deleteThisAuthorNumber = req.body.deleteAuthorNum;

  // queryString will hold SQL command to insert
  const queryString = "DELETE FROM Author WHERE authorNum = ?";

  // Now execute MySQL query to delete these values from table
  getConnection().query(queryString, deleteThisAuthorNumber, (err, results, fields) => {
    if (err) {
      console.log("Failed to DELETE");
      return
    }
  })
  console.log("Delete was successful");
})

// Create book delete post route
app.post('/book_delete', (req, res) => {
  console.log("Deleting from Book table");
  console.log("Getting form data");

  // Use bodyparser to get variables passed in
  console.log("Book Code: " + req.body.deleteBookCode);

  // Store the Strings input by user into variables
  var deleteThisBookCode = req.body.deleteBookCode;

  // queryString will hold SQL command to insert
  const queryString = "DELETE FROM Book WHERE bookCode = ?";

  // Now execute MySQL query to delete these values from table
  getConnection().query(queryString, deleteThisBookCode, (err, results, fields) => {
    if (err) {
      console.log("Failed to DELETE");
      return
    }
  })
  console.log("Delete was successful");
})

// Create publisher delete post route
app.post('/publisher_delete', (req, res) => {
  console.log("Deleting from Publisher table");
  console.log("Getting form data");

  // Use bodyparser to get variables passed in
  console.log("Publisher Code: " + req.body.deletePublisherCode);

  // Store the Strings input by user into variables
  var deleteThisPublisherCode = req.body.deletePublisherCode;

  // queryString will hold SQL command to insert
  const queryString = "DELETE FROM Publisher WHERE publisherCode = ?";

  // Now execute MySQL query to delete these values from table
  getConnection().query(queryString, deleteThisPublisherCode, (err, results, fields) => {
    if (err) {
      console.log("Failed to DELETE");
      return
    }
  })
  console.log("Delete was successful");
})

// Create copy delete post route
app.post('/copy_delete', (req, res) => {
  console.log("Deleting from Copy table");
  console.log("Getting form data");

  // Use bodyparser to get variables passed in
  console.log("Book Code: " + req.body.deleteBookCode);
  console.log("Branch Number: " + req.body.deleteBranchNumber);
  console.log("Copy Number: " + req.body.deleteCopyNumber);

  // Store the Strings input by user into variables
  var deleteThisBookCode = req.body.deleteBookCode;
  var deleteThisBranchNumber = req.body.deleteBranchNumber;
  var deleteThisCopyNumber = req.body.deleteCopyNumber;

  // queryString will hold SQL command to insert
  const queryString = "DELETE FROM Copy WHERE bookCode = ? AND branchNum = ? AND copyNum = ?";

  // Now execute MySQL query to delete these values from table
  getConnection().query(queryString, [deleteThisBookCode, deleteThisBranchNumber, deleteThisCopyNumber], (err, results, fields) => {
    if (err) {
      console.log("Failed to DELETE");
      return
    }
  })
  console.log("Delete was successful");
})

// Create author update post route
app.post('/author_update', (req, res) => {
  console.log("Updating Author table");
  console.log("Getting form data");

  // Use bodyparser to get variables passed in
  console.log("Author Number: " + req.body.updateAuthorNum);
  console.log("Author First Name: " + req.body.updateFirstName);
  console.log("Author Last Name: " + req.body.updateLastName);

  // Store the Strings input by user into variables
  var firstNameUpdate = req.body.updateFirstName;
  var lastNameUpdate = req.body.updateLastName;
  var numberUpdate = req.body.updateAuthorNum;

  // queryString will hold SQL command
  const queryString = "UPDATE Author SET authorFirst = ?, authorLast = ? WHERE authorNum = ?";

  // Now execute MySQL query to update table
  getConnection().query(queryString, [firstNameUpdate, lastNameUpdate, numberUpdate], (err, results, fields) => {
    if (err) {
      console.log("Failed to UPDATE");
      return
    }
  })
  console.log("Update was successful");
})

// Create book update post route
app.post('/book_update', (req, res) => {
  console.log("Updating Book table");
  console.log("Getting form data");

  // Use bodyparser to get variables passed in
  console.log("Book Code: " + req.body.updateBookCode);
  console.log("Title: " + req.body.updateTitle);
  console.log("Publisher Code: " + req.body.updatePublisherCode);
  console.log("Type: " + req.body.updateType);
  console.log("Paperback: " + req.body.updatePaperback);


  // Store the Strings input by user into variables
  var bookCodeUpdate = req.body.updateBookCode;
  var titleUpdate = req.body.updateTitle;
  var publisherCodeUpdate = req.body.updatePublisherCode;
  var typeUpdate = req.body.updateType;
  var paperbackUpdate = req.body.updatePaperback;

  // queryString will hold SQL command
  const queryString = "UPDATE Book SET title = ?, publisherCode = ?, type = ?, paperback = ? WHERE bookCode = ?";

  // Now execute MySQL query to update table
  getConnection().query(queryString, [titleUpdate, publisherCodeUpdate, typeUpdate, paperbackUpdate, bookCodeUpdate], (err, results, fields) => {
    if (err) {
      console.log("Failed to UPDATE");
      return
    }
  })
  console.log("Update was successful");
})

// Create publisher update post route
app.post('/publisher_update', (req, res) => {
  console.log("Updating Publisher table");
  console.log("Getting form data");

  // Use bodyparser to get variables passed
  console.log("Publisher Code: " + req.body.updatePublisherCode);
  console.log("Publisher Name: " + req.body.updatePublisherName);
  console.log("Publisher City: " + req.body.updateCity);

  // Store the Strings input by user into variables
  var newCode = req.body.updatePublisherCode;
  var newName = req.body.updatePublisherName;
  var newCity = req.body.updateCity;

  // queryString will hold SQL command to insert
  const queryString = "UPDATE Publisher SET publisherName = ?, city = ? WHERE publisherCode = ?";

  // Now execute MySQL query to update table
  getConnection().query(queryString, [newName, newCity, newCode], (err, results, fields) => {
    if (err) {
      console.log("Failed to UPDATE");
      return
    }
  })
  console.log("Update was successful");
})

// Create copy update post route
app.post('/copy_update', (req, res) => {
  console.log("Updating Copy table");
  console.log("Getting form data");

  // Use bodyparser to get variables passed in
  console.log("Book Code: " + req.body.updateBookCode);
  console.log("Branch Number: " + req.body.updateBranchNumber);
  console.log("Copy Number: " + req.body.updateCopyNumber);
  console.log("Quality: " + req.body.updateQuality);
  console.log("Price: " + req.body.updatePrice);

  // Store the Strings input by user into variables
  var newBookCode = req.body.updateBookCode;
  var newBranch = req.body.updateBranchNumber;
  var newCopyNumber = req.body.updateCopyNumber;
  var newQuality = req.body.updateQuality;
  var newPrice = req.body.updatePrice;

  // queryString will hold SQL command
  const queryString = "UPDATE Copy SET quality = ?, price = ? WHERE bookCode = ? AND branchNum = ? AND copyNum = ?";

  // Now execute MySQL query to update table
  getConnection().query(queryString, [newQuality, newPrice, newBookCode, newBranch, newCopyNumber], (err, results, fields) => {
    if (err) {
      console.log("Failed to UPDATE");
      return
    }
  })
  console.log("Update was successful");
})


/*
// Create another route /users
// This will return some JSON to the users
app.get("/user", (req, res) => {
  // Respond to client request with JSON array
  var user1 = {firstName: "Shaan", lastName: "Khan"};
  var user2 = {firstName: "Christo", lastName: "Logan"};
  res.json([user1, user2]);
  // res.send("Nodemon auto updates when I save this file.")
}) 
*/

// Express will listen to port 8085, and print a success message if it works.
// localhost:8085
app.listen(8085, () => {
    console.log("Server is functional, and listening on port 8085.")
})

// Get method for authorNum
app.get("/user/:authorNum", (req, res) => {
  console.log("Fetch author with authorNum: " + req.params.authorNum);

  // Open a connection to COP4710_HenrysBooks database on localhost
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'COP4710_HenrysBooks'
  })

  // Declare variables for parameter in route, and String for SQL query
  const anAuthorNumber = req.params.authorNum;
  const queryString = "SELECT * FROM Author WHERE authorNum = ?";
  // Execute a MySQL query to pull data from database
  connection.query(queryString, [anAuthorNumber], (err, rows, fields) => {

    // First check for error in the SQL query
    if (err) {
      console.log("Query failed");
      return
    }

    console.log("Data has been fetched successfully.");
    // Return response to client

    const users = rows.map((row) => {
      return {AuthorNum: row.authorNum, firstName: row.authorFirst, lastName: row.authorLast}
  })
    // Return JSON to client (WORKS)
    res.json(users);

  })
  //res.end();
})

// Get method for all Author Table info
app.get("/authorTable", (req, res) => {
  console.log("Fetch Author Table");

  // Open a connection to COP4710_HenrysBooks database on localhost
  const connection2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'COP4710_HenrysBooks'
  })

  // Declare variables for parameter in route, and String for SQL query
  const queryString = "SELECT * FROM Author";
  // Execute a MySQL query to pull data from database
  connection2.query(queryString, (err, rows, fields) => {

    // First check for error in the SQL query
    if (err) {
      console.log("Query failed");
      return
    }

    console.log("Data has been fetched successfully.");

    // Return response to client
    res.json(rows);

    // Now experiment with JSON
    var myObj, myJSON, text, obj;
    myJSON = JSON.stringify(rows);
    obj = JSON.parse(myJSON)
    //res.write("WHOA DUDE THERE'S MORE");

    //res.


  })
  //res.end();
})

// Get method for Books table
app.get("/getAllBooks", (req, res) => {
  console.log("Fetch Book Table");

  // Open a connection to COP4710_HenrysBooks database on localhost
  const connection2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'COP4710_HenrysBooks'
  })

  // Declare variables for parameter in route, and String for SQL query
  const queryString = "SELECT * FROM Book";
  // Execute a MySQL query to pull data from database
  connection2.query(queryString, (err, rows, fields) => {

    // First check for error in the SQL query
    if (err) {
      console.log("Query failed");
      return
    }

    console.log("Data has been fetched successfully.");

    // Return response to the client: a webpage that shows the results of the query
    // First, write HTML header and create a table
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<h2>Henry's Books Web Application</h2>");
    res.write("<p>COP4710 Database - Assignment #5<br />By Shaan Khan</p>");
    res.write("<hr/>");
    res.write("<table><tr><th><u>Book Code</u></th><th><u>Title</u></th><th><u>Publisher Code</u></th><th><u>Type</u></th><th><u>Paperback</u></th></tr>");

    // Insert each tuple in table into a table row
    for (var i = 0; i < rows.length; i++) {
      thisThing = rows[i];
      console.log(thisThing.authorNum + " " + thisThing.authorFirst);
      var first = thisThing.bookCode;
      var second = thisThing.title;
      var third = thisThing.publisherCode;
      var fourth = thisThing.type;
      var fifth = thisThing.paperback;
      var finalString = "<tr><td>" + first + "</td><td>" + second + "</td><td>" + third + "</td><td>" + fourth + "</td><td>" + fifth + "</td> </tr>";
      res.write(finalString);
    }
    res.write("</table>");

    res.end();
  })
})

// Get method for Author table
app.get("/getAllAuthors", (req, res) => {
  console.log("Fetch Author Table");

  // Open a connection to COP4710_HenrysBooks database on localhost
  const connection2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'COP4710_HenrysBooks'
  })

  // Declare variables for parameter in route, and String for SQL query
  const queryString = "SELECT * FROM Author";
  // Execute a MySQL query to pull data from database
  connection2.query(queryString, (err, rows, fields) => {

    // First check for error in the SQL query
    if (err) {
      console.log("Query failed");
      return
    }

    console.log("Data has been fetched successfully.");

    // Return response to the client: a webpage that shows the results of the query
    // First, write HTML header and create a table
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<h2>Henry's Books Web Application</h2>");
    res.write("<p>COP4710 Database - Assignment #5<br />By Shaan Khan</p>");
    res.write("<hr/>");
    res.write("<table><tr><th><u>Author Number</u></th><th><u>First Name</u></th><th><u>Last Name</u></th></tr>");

    // Insert each tuple in table into a table row
    for (var i = 0; i < rows.length; i++) {
      thisThing = rows[i];
      console.log(thisThing.authorNum + " " + thisThing.authorFirst);
      var first = thisThing.authorNum;
      var second = thisThing.authorFirst;
      var third = thisThing.authorLast;
      var finalString = "<tr><td>" + first + "</td><td>" + second + "</td><td>" + third + "</td></tr>";
      res.write(finalString);
    }
    res.write("</table>");

    res.end();
  })
})

// Get method for Publisher table
app.get("/getAllPublishers", (req, res) => {
  console.log("Fetch Publisher Table");

  // Open a connection to COP4710_HenrysBooks database on localhost
  const connection2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'COP4710_HenrysBooks'
  })

  // Declare variables for parameter in route, and String for SQL query
  const queryString = "SELECT * FROM Publisher";
  // Execute a MySQL query to pull data from database
  connection2.query(queryString, (err, rows, fields) => {

    // First check for error in the SQL query
    if (err) {
      console.log("Query failed");
      return
    }

    console.log("Data has been fetched successfully.");

    // Return response to the client: a webpage that shows the results of the query
    // First, write HTML header and create a table
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<h2>Henry's Books Web Application</h2>");
    res.write("<p>COP4710 Database - Assignment #5<br />By Shaan Khan</p>");
    res.write("<hr/>");
    res.write("<table><tr><th><u>Publisher Code</u></th><th><u>Publisher Name</u></th><th><u>City</u></th></tr>");

    // Insert each tuple in table into a table row
    for (var i = 0; i < rows.length; i++) {
      thisThing = rows[i];
      console.log(thisThing.publisherCode + " " + thisThing.publisherName);
      var first = thisThing.publisherCode;
      var second = thisThing.publisherName;
      var third = thisThing.city;
      var finalString = "<tr><td>" + first + "</td><td>" + second + "</td><td>" + third + "</td></tr>";
      res.write(finalString);
    }
    res.write("</table>");

    res.end();
  })
})

// Get method for Branch table
app.get("/getAllBranches", (req, res) => {
  console.log("Fetch Branch Table");

  // Open a connection to COP4710_HenrysBooks database on localhost
  const connection2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'COP4710_HenrysBooks'
  })

  // Declare variables for parameter in route, and String for SQL query
  const queryString = "SELECT * FROM Branch";
  // Execute a MySQL query to pull data from database
  connection2.query(queryString, (err, rows, fields) => {

    // First check for error in the SQL query
    if (err) {
      console.log("Query failed");
      return
    }

    console.log("Data has been fetched successfully.");

    // Return response to the client: a webpage that shows the results of the query
    // First, write HTML header and create a table
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<h2>Henry's Books Web Application</h2>");
    res.write("<p>COP4710 Database - Assignment #5<br />By Shaan Khan</p>");
    res.write("<hr/>");
    res.write("<table><tr><th><u>Branch Number</u></th><th><u>Branch Name</u></th><th><u>Branch Location</u></th></tr>");

    // Insert each tuple in table into a table row
    for (var i = 0; i < rows.length; i++) {
      thisThing = rows[i];
      console.log(thisThing.branchNum + " " + thisThing.branchName);
      var first = thisThing.branchNum;
      var second = thisThing.branchName;
      var third = thisThing.branchLocation;
      var finalString = "<tr><td>" + first + "</td><td>" + second + "</td><td>" + third + "</td></tr>";
      res.write(finalString);
    }
    res.write("</table>");

    res.end();
  })
})

// Get method for Copy table
app.get("/getAllCopies", (req, res) => {
  console.log("Fetch Copy Table");

  // Open a connection to COP4710_HenrysBooks database on localhost
  const connection2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'COP4710_HenrysBooks'
  })

  // Declare variables for parameter in route, and String for SQL query
  const queryString = "SELECT * FROM Copy";
  // Execute a MySQL query to pull data from database
  connection2.query(queryString, (err, rows, fields) => {

    // First check for error in the SQL query
    if (err) {
      console.log("Query failed");
      return
    }

    console.log("Data has been fetched successfully.");

    // Return response to the client: a webpage that shows the results of the query
    // First, write HTML header and create a table
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<h2>Henry's Books Web Application</h2>");
    res.write("<p>COP4710 Database - Assignment #5<br />By Shaan Khan</p>");
    res.write("<hr/>");
    res.write("<table><tr><th><u>Book Code</u></th><th><u>Branch Name</u></th><th><u>Branch Location</u></th><th><u>Quality</u></th><th><u>Price</u></th></tr>");

    // Insert each tuple in table into a table row
    for (var i = 0; i < rows.length; i++) {
      thisThing = rows[i];
      console.log(thisThing.bookCode + " " + thisThing.branchNum);
      var first = thisThing.bookCode;
      var second = thisThing.branchNum;
      var third = thisThing.copyNum;
      var fourth = thisThing.quality;
      var fifth = thisThing.price;

      var finalString = "<tr><td>" + first + "</td><td>" + second + "</td><td>" + third + "</td><td>" + fourth + "</td><td>" + fifth + "</td></tr>";
      res.write(finalString);
    }
    res.write("</table>");

    res.end();
  })
})


// Create book search get route
app.post('/searchBooks', (req, res) => {
  console.log("Searching for a book");

  // Use bodyparser to get variable passed in
  console.log("Search term: " + req.body.searchTerm);
  // Store the Strings input by user into variables
  var lookForThis = req.body.searchTerm;
  // queryString will hold SQL command to select all Book Titles
  const queryString = "SELECT title FROM Book";
  // Connect to database
  const connection2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'COP4710_HenrysBooks'
  })
  // By default String is not found
  var resultOfSearch = "Not found";

  var queryTitle = null;
  const secondQueryString = "SELECT DISTINCT Br.branchNum, Br.branchName, Br.branchLocation, C.copyNum, C.quality, C.price, A.authorNum, A.authorLast, A.authorFirst, P.publisherCode, P.publisherName, P.city FROM Book B, Copy C, Inventory I, Wrote W, Author A, Publisher P, Branch Br WHERE B.title = (?) AND B.bookCode = W.bookCode AND W.authorNum = A.authorNum AND C.bookCode = B.bookCode AND P.publisherCode = B.publisherCode";

  var foundFlag = 0;

  // Now execute MySQL query to store result of this query in rows
  connection2.query(queryString, (err, rows, fields) => {
    // First check for error in the SQL query
    if (err) {
      console.log("Query failed");
      return
    }
    console.log("Data has been fetched successfully.");
    // We now have all of the book titles in a JSON object
    // res.json(rows);
    // Search every element in rows for a String that matches
    for (var i = 0; i < rows.length; i++) {
      var stringInDatabase = rows[i].title;
      // Search for user-entered string in each element in JSON
      var n = stringInDatabase.search(lookForThis);
      // -1 is returned if no match is found
      // if n! = -1, then book was found
      if (n != -1) {
        resultOfSearch = stringInDatabase;
        connection2.query(secondQueryString, resultOfSearch, (err, rows, fields) => {
          if (err) {
            console.log("Second query failed")
            return
          }
        //res.json(rows);
        //console.log("Second query succeeded");
        //res.end();

        // Return response to the client: a webpage that shows the results of the query
        // First, write HTML header and create a table
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<h2>Henry's Books Web Application</h2>");
        res.write("<p>COP4710 Database - Assignment #5<br />By Shaan Khan</p>");
        res.write("<hr/>");
        res.write("<p>Results for your search query: " + lookForThis + "</p>");
        res.write("<p>Found: " + resultOfSearch + "</p>");
        // First print out Author and Publisher info by drawing data out of the first row 
        res.write("<p>Written by: " + rows[0].authorFirst + " " + rows[0].authorLast + "</p>");
        res.write("<p>Published by: " + rows[0].publisherName + ", based in " + rows[0].city + "</p>");
        res.write("<p>This title was found in Henrys Books stores. Printing inventory information below:</p>");
        res.write("<table><tr><th><u>Branch Name</u></th><th><u>Location</u></th><th><u>Copy Number</u></th><th><u>Quality</u></th><th><u>Price</u></th></tr>");

        for (var i = 0; i < rows.length; i++) {
          thisThing = rows[i];
          console.log(thisThing.branchNum + " " + thisThing.branchName);
          var first = thisThing.branchName;
          var second = thisThing.branchLocation;
          var third = thisThing.copyNum;
          var fourth = thisThing.quality;
          var fifth = thisThing.price;

          var finalString = "<tr><td>" + first + "</td><td>" + second + "</td><td>" + third + "</td><td>" + fourth + "</td><td>" + fifth + "</td></tr>";
          res.write(finalString);
        }
        res.write("</table>");

        res.end();
        })
        break;
      }
    }
    /*console.log("Book was not found");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<h2>Henry's Books Web Application</h2>");
    res.write("<p>COP4710 Database - Assignment #5<br />By Shaan Khan</p>");
    res.write("<hr/>");
    res.write("No titles were found that match your search request.");
    */
  }) // end Connection2 query
}) 