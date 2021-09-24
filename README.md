# Groupomania - OpenClassrooms project #

## Mission ## 

Build the MVP for corporate social network. 

## OVERVIEW
### Backend (MAMP)
#### Server
NodeJs, Express, Sequelize (ORM)
##### Database
MySQL
### Frontend
VueJS (Composition API), Bootstrap
------------------------
## INSTALLATION
### Backend

* Use database server like __MAMP/WAMP__
* Create 3 databases : database_development_groupomania / database_test_groupomania / database_production_groupomania 
* Install sequelize-cli - [More deatils here](https://sequelize.org/master/manual/getting-started.html)
* Create config.json file - [More details here](https://sequelize.org/master/manual/migrations.html)
* Run npx sequelize-cli db:migrate to create tables in database
* Open control terminal in __Backend__ run :
` npm install`
` npm run or nodemon server`
* Create `dot env` to put your keys :
  * DB_TOKEN
  * DB_MYSQL_DATABASE_PASS (for config.json)

`npm sequelize`
`npx sequelize-cli`

### Frontend

* Open control terminal in __Groupomania__ run :
` npm install`
` npm run serve`

_______________________________________________

![image](https://user-images.githubusercontent.com/77418945/134634455-9b11c3ff-0c25-45d0-8032-672731650540.png) 
