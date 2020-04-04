import express from 'express';
import Knex from 'knex';
import knexfile from '../../knexfile';

const knex = Knex(knexfile);

const router = express.Router();

router.post('/add', (req, res) => {
  knex('feedbacks')
    .insert({ text: req.body.text })
    .then(() => {
      res.status(200).send('Feedback added');
    })
    .catch((e) => {
      res.status(500).send(`Unexpected error: ${e}`);
    });
});

router.get('/printunread', (req, res) => {
  knex('feedbacks')
    .where({ new: 1 })
    .orderBy('id', 'asc')
    .then((feedbacks) => {
      feedbacks.forEach((f) => {
        knex('feedbacks').where({ id: f.id }).update({ new: false }).then();
      });
      res.status(200).send(feedbacks);
    })
    .catch((e) => {
      res.status(500).send(`Unexpected error: ${e}`);
    });
});
module.exports = router;
