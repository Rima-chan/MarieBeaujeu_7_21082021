# MarieBeaujeu_7_21082021 - Projet Open Classrooms Groupomania
MVP for corporate social network. 
---------------------------------------------------------
## OVERVIEW
### Backend (MAMP)
#### Server
NodeJs, Express, Sequelize (ORM)
##### Databse
MySQL
### Frontend
VueJS (Composition API), Bootstrap
------------------------
## INSTALLATION
### Backend

* Use database servir like __MAMP/WAMP__
* Create 3 databases : database_development_groupomania / database_test_groupomania / database_production_groupomania 
* Install sequelize-cli - [More deatils here(https://sequelize.org/master/manual/getting-started.html)]
* Run npx sequelize-cli db:migrate to create tables in database
* Open control terminal in __Backend__ run :
` npm install`
` npm run or nodemon server`
* Create `dot env config` to put your keys

`npm sequelize`
`npx sequelize-cli`

### Frontend

* Open control terminal in __Groupomania__ run :
` npm install`
` npm run serve`