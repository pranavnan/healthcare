import express from 'express';
import { getSlotRouter } from '.';

const router = express.Router();

router.use(getSlotRouter);

export { router as slotRouter };
