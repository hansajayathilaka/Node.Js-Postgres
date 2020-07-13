install dependencies
```css
npm i express body-parser sequelize pg pg-hstore express-handlebars
```

Install dev dependencies
```css
npm i -D nodemon
```

Documentation for Sequelize

    https://sequelize.org/master/manual/getting-started.html

[ Solution for an Error ] How to include the path for the node binary npm was executed with.
```
npm config set scripts-prepend-node-path auto
```

Add gitignore file
```css
touch .gitignore && echo "node_modules/" >> .gitignore && git rm -r --cached node_modules ; git status
```
