import express from 'express';
import db from '../../config/database/database';

const router = express.Router();
// /message routes

router.get('/', (req, res)=>{
    if (req.session.loggedin) {
      let id = req.session.user_id;
		  db.query('SELECT * FROM rooms WHERE participant_1=? OR participant_2=?',[id, id], (err, results, fields) => {
           if (results.length > 0) {
            res.status(200).render('pages/messages', {rooms: results, user: req.session.username});
            res.end();
            } else {
              res.status(200).render('pages/messages', {rooms: [], user: req.session.username});
              res.end();
            }
       });
    } else {
      res.status(401).render('pages/login', {success: true, message: "have an account? Enter your details to login"});
      res.end();
    }
});

module.exports = router;
