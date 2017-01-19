const geocoder = require('../')
console.log(`
geocoder.google('Ottawa, ON')
  .then(data => console.log(data))
`)
geocoder.google('Ottawa, ON')
  .then(data => {
    console.log(data)
    console.log(JSON.stringify(data, null, 2))
  })