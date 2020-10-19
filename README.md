## Hyborian War Helper Server
This server is meant to interface with the Hyborian War Helper Client.
It allows full user validation with hashed passwords,
and GET and POST requests for characters and positions with the proper
authentication.

## Live: 
https://https://hybowar-client.vercel.app

## Back-end repo:
https://github.com/gdreid13/hybowar-client

## Built with:
* React
* Node
* Express
* PostgreSQL

## To set up:
yarn OR npm i / npm install
** npm is NOT recommended due to difficulties with migration **
createdb hybowar-helper-server
npm run migrate
Seed db local `psql -d hybowar-helper -f ./seeds/seed.hybowar-helper.sql`
Seed db heroku `heroku psql -f ./seeds/seed.hybowar-helper.sql`

## Endpoints:
/api/auth
* GET auth token

/api/users
* POST user

/api/positions
* GET positions by user
* POST positions by user

/api/characters
* GET characters by user and position
* POST characters by user and position

## App Features:
* Private login and authentication
* Tracking game positions
* Tracking characters in game positions

## Registered users can:
* GET and POST positions
* GET and POST characters in those positions
* Data protection: bcrypt

## Installed packages:
* react-router-dom, enzyme
* react-test-renderer(-D)

## Landing page
![Landing page](https://github.com/gdreid13/calorie-counter-client/blob/master/screenshots/dashboard.JPG)

## Registration
![Registration](https://github.com/gdreid13/calorie-counter-client/blob/master/screenshots/register.JPG)

## Position selection
![Position selection](https://github.com/gdreid13/calorie-counter-client/blob/master/screenshots/pos-select.JPG)

## Character display
![Character display](https://github.com/gdreid13/calorie-counter-client/blob/master/screenshots/char-display.JPG)

## Character entry
![Character entry](https://github.com/gdreid13/calorie-counter-client/blob/master/screenshots/char-entry.JPG)

## Future developments
* Allow user to organize characters by statistic
* PATCH existing characters (in rare cases, characters can improve)
* Track provinces and troops

## Developed by:
[Greg Reid](https://github.com/gdreid13)