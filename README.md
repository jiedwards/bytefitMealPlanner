ByteFit
=======

#### Project Overview
This is a revival project. Originally, way back, it was a WordPress application, which is ridiculous. This will be rebuilt with new tech, and actually planned properly.
ByteFit is an application to calculate the appropriate nutritional diet based on several user inputs. It aims to quickly point the end user on a better diet and achieve specific dietary goals.

#### Objectives
`Node.js` will be used as the backend. Node will connect to a database, `MongoDB`(?), and retrieve the data based on algorithmic frontend. 
`Express.js` will be the frontend, this is where the users requirements are parsed.

#### Directory Structure

1. `assets`: This directory contains all the code that makes the application work.

2. `assets/core`: This is where the applications logic lives. Everything from the `js` file that calculates calories, to the 

3. `assets/*`: Everything else here is self explanatory. Things such as `bootstrap`, `jquery` and so on.

4. `html`: All the `html` documents that `node` will serve.

5. `index.js`: The server code.


```
app
├── assets
│   ├── bootstrap
│   │   ├── css
│   │   │   └── bootstrap.css
│   │   └── js
│   │       └── bootstrap.js
│   ├── core
│   │   ├── css
│   │   │   └── styles.css
│   │   └── js
│   │       └── calorie_calc.js
│   ├── fontawesome
│   │   └── fontawesome.css
│   ├── jquery
│   │   └── jquery.js
│   ├── materialize
│   │   ├── css
│   │   │   └── materialize.css
│   │   └── js
│   │       └── materialize.js
│   └── popper
│       └── popper.js
├── html
│   └── index.html
├── index.js
└── package.json
```

