# back-end

/routes - This folder will execute all the routes you manage with the Express Router and what they do will be exported from the controller file.
File naming - xxxxx.[api methood].js

/errors is the standard error folder.
File naming - xxxxx.js

/middleware - This folder will be given to all the middleware you create, be it authentication or some other function.
File naming - xxxxxMiddleWarexxx.js

app.js - This file will mostly be closed in an Express application and should be as small as possible.
package.json - file containing all npm project details, scripts and dependencies.

.gitignore - files you don't want to push to git

POST REQUEST: https://tododackend.onrender.com/api/task

body:
{
"name": "string",
"done": Boolean,
"createdAt": "11/30/2022, 12:43:17 PM"
}

DELETE REQUEST: https://tododackend.onrender.com/api/task/:id

PATCH REQUEST: https://tododackend.onrender.com/api/task/:id
body:
{
"name": "string",
"done": Boolean,
"createdAt": "11/30/2022, 12:43:17 PM"
}

GET REQUEST: https://tododackend.onrender.com/api/tasks?pp=&page=&filterBy=&order

pp - number of tasks per page
page - current page
filterBy - filtering by completed (done), not completed (undone), by all tasks (""(empty string))
order - asc/desc filtering
