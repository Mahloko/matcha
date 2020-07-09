import express from 'express';
import db from '../../config/database/connection';
import query from '../utils/dbqueries';

const detailsRouter = express.Router();

detailsRouter.route('/')
  .get(async (req, res) => {
    if (req.session.loggedin) {
      try {
        const details = await query.getUserDetails(req.query.user);
        res.status(200).render('pages/details', {
          username: req.session.username,
          users: details
        });
      } catch (error) {
        res.status(401).render('pages/login', {
          success: true,
          message: 'to login to continue...'
        });
      }
    } else {
      res.status(401).render('pages/login', {
        success: true,
        message: 'have an account?... Enter your details to login'
      });
    }
  })

module.exports = detailsRouter;
