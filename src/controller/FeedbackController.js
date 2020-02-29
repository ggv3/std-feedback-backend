const express = require('express');

const Feedback = require('../model/Feedback');

const router = express.Router();

router.post('/add', (req, res) => {
  try {
    Feedback.create({
      text: req.body.text,
    });
    res.status(200).send('Feedback added');
  } catch (error) {
    console.log(error);
    res.status(500).send('Unexpected error');
  }
});

router.get('/printunread', (req, res) => {
  try {
    Feedback.findAll({
      order: [['id', 'ASC']],
      where: {
        read: [false],
      },
    }).then(feedbacks => {
      feedbacks.forEach(f => {
        f.update({
          read: true,
        });
      });
      res.status(200).send(feedbacks);
    });
  } catch (error) {
    res.status(500).send('Unexpected error');
  }
});

router.get('/printall', (req, res) => {
  try {
    Feedback.findAll({
      order: [['id', 'ASC']],
    }).then(feedbacks => {
      res.status(200).send(feedbacks);
    });
  } catch (error) {
    res.status(500).send('Unexpected error');
  }
});

module.exports = router;
