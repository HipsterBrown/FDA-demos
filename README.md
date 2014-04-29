#An Intro to Front-End Driven App Solutions

This is the repo for my demo apps to back my talk about Front-End Driven / Static Web Apps for the April Front-End Orlando meetup.

I have chosen to show off the abilities of one Backend as a Service, [Firebase](https://www.firebase.com), and an awesome open source project, [Hoodie](http://hood.ie).

I learned how to use Firebase from Codecademy's [API Track](http://www.codecademy.com/tracks/apis).


##How to run the various apps

1. Make sure you have the grunt-cli and node installed on your system. If not: [Grunt](http://gruntjs.com/)

2. Then run: `npm install` , which should install all the grunt plugins and dependencies.

3. Add the Hoodie command line interface to work with the hoodie app. Follow the appropriate direction here: [Hoodie](http://hood.ie/#installation)

4. To start the app servers:

 - For Firebase: `grunt serveFire`
 - For Hoodie: `cd hoodie/trooper && hoodie start`

5. If you make any edits to the sass or javascript files, make sure you're running `grunt` in another command line window to watch for changes and reload the page.
