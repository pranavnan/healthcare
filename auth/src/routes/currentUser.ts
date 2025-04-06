import express from 'express';
import { currentUser, requireAuth } from '@phntickets/common';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser, // it will set currentUser on the request object
  requireAuth, // it will check if currentUser is present in the request object or not
  async (req: express.Request, res: express.Response) => {
    res.send({
      currentUser: req.currentUser
        ? {
            id: req.currentUser?.id,
            email: req.currentUser?.email,
            role: req.currentUser?.role,
          }
        : null,
    });
  }
);

export { router as currentUserRouter };
