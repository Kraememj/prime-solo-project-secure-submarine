const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated, rejectNonAdmin
} = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
  res.send(req.user);
});

router.get('/', (req, res) => {
  if(req.isAuthenticated() && req.user.is_admin){
  console.log('req.user:', req.user);
  pool
    .query(`SELECT * FROM "secret"
            WHERE "user_id" = $1`, [req.user.id])
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    })
    console.log(results.rows);
} else{
  res.sendStatus(403);
}});

module.exports = router;
