const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const dsaRoutes = require('./routes/dsaRoutes');
const cnRoutes = require('./routes/cnRoutes');
require('events').EventEmitter.defaultMaxListeners = 20;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.use('/dsa', dsaRoutes);
app.use('/cn',cnRoutes);
app.get('/', (req, res) => {
    res.render('index', { title: 'Graphify CS' });
});

// Sync DB and start server
sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
});
