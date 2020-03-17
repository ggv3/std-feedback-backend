const express = require('express');

const TwitchUsers = require('../model/TwitchUsers');

const router = express.Router();

router.post('/adduser', (req, res) => {
  try {
    TwitchUsers.create({
      userId: req.body.userId,
    });
    res.status(200).send('User id added');
  } catch (error) {
    res.status(500).send('Unexpected error');
  }
});

router.get('/getusers', (req, res) => {
  try {
    TwitchUsers.findAll({
      order: [['id', 'ASC']],
    }).then(userIds => {
      res.status(200).send(userIds);
    });
  } catch (error) {
    res.status(500).send('Unexpected error');
  }
});

module.exports = router;
