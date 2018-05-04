ics
==================

The [iCalendar](http://tools.ietf.org/html/rfc5545) generator

[![npm version](https://badge.fury.io/js/ics.svg)](http://badge.fury.io/js/ics)
[![Code Climate](https://codeclimate.com/github/adamgibbons/ics/badges/gpa.svg)](https://codeclimate.com/github/adamgibbons/ics)
[![TravisCI build status](https://travis-ci.org/adamgibbons/ics.svg?branch=master)](https://travis-ci.org/adamgibbons/ics.svg?branch=master)
[![Downloads](https://img.shields.io/npm/dm/ics.svg)](http://npm-stat.com/charts.html?package=ics)

## Install

`npm install -S ics`

## Example Usage

1) Create an iCalendar event:

```javascript
const ics = require('ics')

const event = {
  start: [2018, 5, 30, 6, 30],
  duration: { hours: 6, minutes: 30 },
  title: 'Bolder Boulder',
  description: 'Annual 10-kilometer run in Boulder, Colorado',
  location: 'Folsom Field, University of Colorado (finish line)',
  url: 'http://www.bolderboulder.com/',
  geo: { lat: 40.0095, lon: 105.2669 },
  categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
  status: 'CONFIRMED',
  organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
  attendees: [
    { name: 'Adam Gibbons', email: 'adam@example.com', rsvp: true },
    { name: 'Brittany Seaton', email: 'brittany@example2.org' }
  ]
}

ics.createEvent(event, (error, value) => {
  if (error) {
    console.log(error)
  }

  console.log(value)
  //  BEGIN:VCALENDAR
  //  VERSION:2.0
  //  CALSCALE:GREGORIAN
  //  PRODID:adamgibbons/ics
  //  BEGIN:VEVENT
  //  UID:070bbdd0-a6de-11e7-9552-4faa901a846b
  //  SUMMARY:Bolder Boulder
  //  DTSTAMP:20171002T012300Z
  //  DTSTART:20180530T125000Z
  //  DESCRIPTION:Annual 10-kilometer run in Boulder, Colorado
  //  URL:http://www.bolderboulder.com/
  //  GEO:40.0095;105.2669
  //  LOCATION:Folsom Field, University of Colorado (finish line)
  //  STATUS:CONFIRMED
  //  CATEGORIES:10k races,Memorial Day Weekend,Boulder CO
  //  ATTENDEE;RSVP=TRUE;CN=Adam Gibbons:mailto:adam@example.com
  //  ATTENDEE;RSVP=FALSE;CN=Brittany Seaton:mailto:brittany@example2.org
  //  BEGIN:VALARM
  //  ACTION:DISPLAY
  //  DESCRIPTION:Reminder
  //  TRIGGER;VALUE=DATE-TIME:20180530T020000Z
  //  END:VALARM
  //  DURATION:PT5H
  //  END:VEVENT
  //  END:VCALENDAR
})
```

2) Write an iCalendar file:
```javascript
const { writeFileSync } = require('fs')
const ics = require('ics')

ics.createEvent({
  title: 'Dinner',
  description: 'Nightly thing I do',
  start: [2018, 1, 15, 6, 30],
  duration: { minutes: 50 }
}, (error, value) => {
  if (error) {
    console.log(error)
  }

  fs.writeFileSync(`${__dirname}/event.ics`, value)
})
```

3) Create multiple iCalendar events:
```javascript
const ics = require('./dist')

const { error, value } = ics.createEvents([
  {
    title: 'Lunch',
    start: [2018, 1, 15, 12, 15],
    duration: { minutes: 45 }
  },
  {
    title: 'Dinner',
    start: [2018, 1, 15, 12, 15],
    duration: { hours: 1, minutes: 30 }
  }
])

console.log(value)
// BEGIN:VCALENDAR
// VERSION:2.0
// CALSCALE:GREGORIAN
// PRODID:adamgibbons/ics
// BEGIN:VEVENT
// UID:3c6d44e8-79a7-428d-acac-9586c9e06e5c
// SUMMARY:Lunch
// DTSTAMP:20180210T093900Z
// DTSTART:20180115T191500Z
// DURATION:PT45M
// END:VEVENT
// BEGIN:VEVENT
// UID:253cc897-fc26-4f25-9a01-b6bb57fa174d
// SUMMARY:Dinner
// DTSTAMP:20180210T093900Z
// DTSTART:20180115T191500Z
// DURATION:PT1H30M
// END:VEVENT
// END:VCALENDAR
```

4) Create iCalendar events with Audio (Mac):
```'use strict';
let ics = require("ics")
let moment = require("moment")
let events = []
let alarms = []

let start = moment().format('YYYY-M-D').split("-")
let end = moment().add({'hours':2, "minutes":30}).format("YYYY-M-D").split("-")
alarms.push({
  action: 'audio',
  trigger: {hours:2,minutes:30,before:true},
  repeat: 2,
  attachType:'VALUE=URI',
  attach: 'Glass'
})

let event = {
  productId:"myCalendarId",
  uid: "123"+"@ics.com",
  startType:"local",
  start: start,
  end: end,
  title: "test here",
  alarms: alarms
}
events.push(event)
console.log(ics.createEvents(events))

// BEGIN:VCALENDAR
// VERSION:2.0
// CALSCALE:GREGORIAN
// PRODID:MyCalendarId
// METHOD:PUBLISH
// X-PUBLISHED-TTL:PT1H
// BEGIN:VEVENT
// UID:123@MyCalendarIdics.com
// SUMMARY:test here
// DTSTAMP:20180409T072100Z
// DTSTART:20180409
// DTEND:20180409
// BEGIN:VALARM
// ACTION:DISPLAY
// DESCRIPTION:Reminder
// TRIGGER:-PT2H30M
// END:VALARM
// BEGIN:VALARM
// ACTION:AUDIO
// REPEAT:2
// ATTACH;VALUE=URI:Glass
// TRIGGER:PT2H
// END:VALARM
// END:VEVENT
// END:VCALENDAR

```
## API

### `createEvent(attributes[, callback])`

Generates an iCal-compliant VCALENDAR string with one VEVENT.
If a callback is not provided, returns an object having the form `{ error, value }`,
where `value` contains an iCal-compliant string if there are no errors.
If a callback is provided, returns a Node-style callback.

#### `attributes`

Object literal containing event information.
Only the `start` property is required.
The following properties are accepted:

| Property      | Description   | Example  |
| ------------- | ------------- | ----------
| start         | **Required**. Date and time at which the event begins. | `[2000, 1, 5, 10, 0]` (January 5, 2000 in my timezone)
| end           | Time at which event ends. *Either* `end` or `duration` is required, but *not* both. | `[2000, 1, 5, 13, 5]` (January 5, 2000 at 1pm)
| duration      | How long the event lasts. Object literal having form `{ weeks, days, hours, minutes, seconds }` *Either* `end` or `duration` is required, but *not* both. | `{ hours: 1, minutes: 45 }` (1 hour and 45 minutes)
| title         | Title of event. | `'Code review'`
| description   | Description of event. | `'A constructive roasting of those seeking to merge into master branch'`
| location      | Intended venue | `Mountain Sun Pub and Brewery`.
| geo   | Geographic coordinates (lat/lon) | `{ lat: 38.9072, lon: 77.0369 }`
| url           | URL associated with event | `'http://www.mountainsunpub.com/'`
| status        | Three statuses are allowed: `TENTATIVE, `CONFIRMED`, or `CANCELLED` | `CONFIRMED`
| organizer     | Person organizing the event | `{name: 'Adam Gibbons', email: 'adam@example.com'}`
| attendees     | Persons invited to the event | `[{ name: 'Mo', email: 'mo@foo.com', rsvp: true }, { name: 'Bo', email: 'bo@bar.biz' }]`
| categories    | Categories associated with the event | `['hacknight', 'stout month']`
| alarms        | Alerts that can be set to trigger before, during, or after the event | `{ action: 'DISPLAY', trigger: [2000, 1, 4, 18, 30] }` OR `{ action: 'DISPLAY', trigger: {hours:2,minutes:30,before:true} OR `{ action: 'DISPLAY', trigger: {hours:2,minutes:30,before:false}` OR `{action: 'audio',trigger: {hours:2,minutes:30,before:true}, repeat: 2,attachType:'VALUE=URI',attach: 'Glass'}`
| productId     | Product which created ics, `PRODID` field | `'adamgibbons/ics'`
| uid           | Universal unique id for event, produced by default with `uuid/v1`.  **Warning:** This value must be **globally unique**.  It is recommended that it follow the [RFC 822 addr-spec](https://www.w3.org/Protocols/rfc822/) (i.e. `localpart@domain`).  Including the `@domain` half is a good way to ensure uniqueness. | `'28021620-be61-11e7-be87-5f3ab42f0785'`

Alarams attach property can have these values for Mac : Basso, Blow, Bottle, Frog, Funk, Glass, Hero, Morse, Ping, Pop, Purr, Sousumi, Submarine, Tink

To create an **all-day** event, pass only three values (`year`, `month`, and `date`) to the `start` and `end` properties.
The date of the `end` property should be the day *after* your all-day event.
For example, in order to create an all-day event occuring on October 15, 2018:
```javascript
const eventAttributes = {
  start: [2018, 10, 15],
  end: [2018, 10, 16],
  /* rest of attributes */
}
```

#### `callback`

Optional. 
Node-style callback. 

```javascript
function (err, value) {
  if (err) {
    // if iCal generation fails, err is an object containing the reason
    // if iCal generation succeeds, err is null
  }

  console.log(value) // iCal-compliant text string
}
```

### `createEvents(events[, callback])`

Generates an iCal-compliant VCALENDAR string with multiple VEVENTS.

If a callback is not provided, returns an object having the form `{ error, value }`, where value is an iCal-compliant text string
if `error` is `null`.

If a callback is provided, returns a Node-style callback.

#### `events`

Array of `attributes` objects (as described in `createEvent`).

#### `callback`

Optional. 
Node-style callback.

```javascript
function (err, value) {
  if (err) {
    // if iCal generation fails, err is an object containing the reason
    // if iCal generation succeeds, err is null
  }

  console.log(value) // iCal-compliant text string
}
```

## Develop

Run mocha tests and watch for changes:
```
npm start
```

Run tests once and exit:
```
npm test
```

Build the project, compiling all ES6 files within the `src` directory into vanilla JavaScript in the `dist` directory.
```
npm run build
```

## References

- [RFC 5545: Internet Calendaring and Scheduling Core Object Specification (iCalendar)](http://tools.ietf.org/html/rfc5545)
- [iCalendar Validator](http://icalendar.org/validator.html#results)
