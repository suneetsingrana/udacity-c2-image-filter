import { Router, Request, Response } from 'express';
import { FilterRouter } from './filter/filter.router';


const router: Router = Router();

router.use('/img', FilterRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send(`V0`);
});

export const IndexRouter: Router = router;