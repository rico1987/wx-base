import koaRouter from 'koa-router';
import fileController from '../controllers/file';

const router = koaRouter();

router.post('/api/uploadFile', fileController.uploadFile);
router.post('/api/convertFile', fileController.convertFile);

export default router;
