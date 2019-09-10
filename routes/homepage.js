const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   res.render('index', { title: 'MY express App', message: 'Hello'})
});

module.exports = router;