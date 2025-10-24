import express from 'express';
import { chatController } from '../controllers/chat';

const router = express.Router();

// POST /api/chat - Send message to chatbot
router.post('/', chatController.processMessage);

export default router;