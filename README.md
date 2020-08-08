## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

Seed db `psql -d hybowar-helper -f ./seeds/seed.hybowar_helper.sql`

Migrate db `npm run migrate`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

Interact with production db `heroku pg:psql`