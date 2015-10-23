var db = require('./models');

// db.link.create({ url: 'http://google.com', hash: '' }).then(function(link) {
//   console.log(link)
// });

db.link.find({where: {id: 1}}).then(function(link) {
	console.log(link.url);
});