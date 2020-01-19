import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
// import { Validations } from './utils/validations';
import { Response } from './utils/response';
import { Path } from './utils/path';
import { Const } from './utils/const';
//import { HtppRequest } from './utils/http';

// init express
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.options('*',cors());
app.use(bodyParser.json())


// Utils
// const validations: Validations = new Validations();
const response: Response = new Response()
const path: Path = new Path();
const CONST = new Const()
//const http: HtppRequest = new HtppRequest();


admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// Upload image
app.post(path.upload, async (req, res) =>{
    try{

    const { image, id, lat, lon, timestamp } = req.body;
    const data = {
      image,
      id,
      lat,
      lon,
      timestamp
    }

    const imgRef = await db.collection('images').add(data);
    const imgObj = await imgRef.get();

    const bodyResponse = {
        method: 'POST',
        type: 'info',
        body:{
            id: imgRef.id,
            data: imgObj.data
        }
    }
    
    return response.success(res, bodyResponse)

}catch(error){
    response.serverError(res, error)
}
})

// get image by ID
app.get('/images/:id', async (req, res) =>{
    try{

    const imgId = req.params.id;

    if (!imgId) throw new Error('Image ID is required');

    const imgObj = await db.collection('images').doc(imgId).get();

    if (!imgObj.exists) throw new Error('Image does not exist.');

    const bodyResponse = {
        method: 'GET',
        type: 'data',
        body:{
            id: imgObj.id,
            data: imgObj.data()
        }
    }
    
    return response.success(res, bodyResponse)

}catch(error){
    response.serverError(res, error)
}
})

// list images by ids
app.get('/images', async (req, res) => {
    try {
  
      const imageQuerySnapshot = await db.collection('images').get();
      const images:any[] = [];
      imageQuerySnapshot.forEach(
          (doc) => {
              images.push({
                  id: doc.id,
                  timestamp: doc.data().timestamp
              });
          }
      );

      const bodyResponse = {
        method: 'GET',
        type: 'data',
        body:{
            images
        }
    }
    
    return response.success(res, bodyResponse)
  
    } catch(error){
        response.serverError(res, error)
    }
  
  });
  

// Expose Express API as a single Cloud Function:
exports[CONST.microservice] = functions.https.onRequest(app);