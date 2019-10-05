ByteFit
=======

#### Project Overview
This is a revival project. Originally, way back, it was a WordPress application, which is ridiculous. This will be rebuilt with new tech, and actually planned properly.
ByteFit is an application to calculate the appropriate nutritional diet based on several user inputs. It aims to quickly point the end user on a better diet and achieve specific dietary goals.

#### Objectives
`Node.js` will be used as the backend. Node will connect to a database, `MongoDB`(?), and retrieve the data based on algorithmic frontend. 
`Express.js` will be the frontend, this is where the users requirements are parsed.

#### Directory Structure

1. `public`: This directory contains all the code that makes the application work. This is called public because EVERYTHING in here is client facing.

2. `public/assets`: Everything required for the application to run. `css`, `js` and so on.

3. `public/assets/bytefit`: The code written by us.

3. `public/assets/thirdparty`: The code not written by us.

4. `public/index.html`: Whats being served from `index.js`

5. `index.js`: The server code.


```
app
├── index.js
├── package.json
└── public
    ├── assets
    │   ├── bytefit
    │   │   ├── css
    │   │   │   └── styles.css
    │   │   ├── data
    │   │   │   ├── macros.csv
    │   │   │   └── macros.json
    │   │   └── js
    │   │       └── calorie_calc.js
    │   └── thirdparty
    │       ├── bootstrap
    │       │   ├── css
    │       │   │   └── bootstrap.css
    │       │   └── js
    │       │       └── bootstrap.js
    │       ├── fontawesome
    │       │   └── fontawesome.css
    │       ├── jquery
    │       │   └── jquery.js
    │       └── popper
    │           └── popper.js
    └── index.html

84 directories, 326 files

```

#### How to set up the project

As soon as you have cloned the project, run the following script:

```
run.sh
```