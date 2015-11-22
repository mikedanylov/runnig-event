# Running events app
AngularJS, Node.js, MongoDB, mynextrun api, google maps api

### Brief description of operation
+ The app is loaded and request for the list of all running events is sent to https://api-test.mynextrun.com/site/v1/event-stats (currently static JSON file is used because given api doesn't work presumably because server does not allow cross-origin resource sharing or returns not formated JSON)
+ JSON with events is loaded and first a few events are rendered to the view with AngularJS
+ Each event latitude and longitude parameters are send to google maps api to retrieve human readable locations
+ Cron job is started for retreiving locations names using google api because of api restrictions on number of requests
+ More events are rendered when page is scrolled down
+ Each event is zoomed when hovered over

### TODO
- [ ] Save events data to MongoDB
- [ ] Save location name for each event to MongoDB
- [ ] Every time app is started load both lists of events from mynextrun api and MongoDB, compare them, requerst location name for each new entry, save new copy to MongoDB