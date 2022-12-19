import Pusher from 'pusher';
import dotenv from 'dotenv';

dotenv.config();

const pusher = new Pusher({
  appId: process.env.PUSHER_API_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUHSER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
});
