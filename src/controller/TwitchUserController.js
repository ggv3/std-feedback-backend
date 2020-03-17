const express = require('express');

const TwitchUsers = require('../model/TwitchUsers');

const router = express.Router();

router.post('/adduser', (req, res) => {
  try {
    TwitchUsers.create({
      userId: req.body.userId,
      username: req.body.username,
    });
    res.status(200).send('User info added');
  } catch (error) {
    res.status(500).send('Unexpected error');
  }
});

router.get('/getuserids', (req, res) => {
  try {
    TwitchUsers.findAll({
      order: [['id', 'ASC']],
    }).then(users => {
      res.status(200).send(users);
    });
  } catch (error) {
    res.status(500).send('Unexpected error');
  }
});

router.post('/updatestreamstatus', (req, res) => {
  try {
    TwitchUsers.findAll({
      where: {
        userId: req.body.userId,
      },
    }).then(users => {
      users.forEach(u => {
        u.update({
          isOnline: !u.isOnline,
        });
      });
      res.status(200).send('Stream status updated');
    });
  } catch (error) {
    res.status(500).send('Unexpected error');
  }
});

module.exports = router;
