import express from 'express';
import Knex from 'knex';
import knexfile from '../../knexfile';

const knex = Knex(knexfile);

const router = express.Router();

router.post('/adduser', (req, res) => {
  knex('twitch_users')
    .insert({ user_id: req.body.userId, username: req.body.username })
    .then(() => {
      res.status(200).send(`User ${req.body.username} added`);
    })
    .catch((e) => {
      res.status(500).send(`Unexpected error: ${e}`);
    });
});

router.get('/getuserids', (req, res) => {
  knex('twitch_users')
    .orderBy('id', 'asc')
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((e) => {
      res.status(500).send(`Unexpected error: ${e}`);
    });
});

router.post('/updatestreamstatus', (req, res) => {
  knex('twitch_users')
    .where({ user_id: req.body.userId })
    .then((users) => {
      users.forEach((u) => {
        knex('twitch_users')
          .where({ user_id: u.id })
          .update({ is_online: !u.is_online })
          .then(() => {
            res
              .status(200)
              .send(`Stream status updated for user ${u.username}`);
          });
      });
    });
});

module.exports = router;
