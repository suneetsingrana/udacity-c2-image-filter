import { Router, Request, Response, NextFunction } from 'express';
import {filterImageFromURL, deleteLocalFiles} from '../../../util/util';


const router: Router = Router();
router.get('/filteredimage', validateQuery(['image_url']),
    async (req: Request, res: Response) => {
    let imgUrl  = req.query.image_url;
    console.log(req.query.image_url);
    filterImageFromURL(imgUrl).then((filteredpath) =>{        
        res.sendFile(filteredpath);
        res.on('finish', function() {
            try {
                deleteLocalFiles([filteredpath]);
            } catch(e) {
              console.log("error removing ", filteredpath); 
            }
        });
    });   
    
   
});

function validateQuery(fields:string[]) {

    return (req: Request, res: Response, next: NextFunction) => {

        for(const field of fields) {
            if(!req.query[field]) { // Field isn't present, end request
                return res
                    .status(400)
                    .send(`${field} is missing`);
            }
        }

        next(); // All fields are present, proceed

    };

}
export const FilterRouter: Router = router;