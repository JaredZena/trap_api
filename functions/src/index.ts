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
app.use(cors({ origin: '*' }));
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
    // cors(req, res, () => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Content-Type', 'application/json');
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
    res.setHeader('Content-Type', 'application/json');
    return response.success(res, bodyResponse)

    }catch(error){
        response.serverError(res, error)
    }

    // )}
});

// list images by ids
app.get('/images', async (req, res) => {
    console.log('Request to retrieve list of images has been received...');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const page = parseInt(req.query.page.toString());
    const limit = parseInt(req.query.limit.toString());

    const startIndex = (page-1) * limit;
    const endIndex = page * limit;

    try {
      const imageQuerySnapshot = await db.collection('images')
      .orderBy('timestamp',"desc")
      .get();
      const images:any[] = [];
      imageQuerySnapshot.forEach(
          (doc) => {
            const date = new Date(doc.data().timestamp * 1000);
            const offset = (new Date().getTimezoneOffset() / 60) * -1;
            console.log(offset)
            const imageName = new Date(date.getTime() + offset).toDateString();
            console.log(imageName);
              images.push({
                  id: doc.id,
                  image_name: imageName,
                  image_url: doc.data().image,
                  timestamp: doc.data().timestamp
              });
          }
      );

      let next = {};
      let previous = {};
      if (endIndex < images.length){
        next = {
            page: page + 1,
            limit: limit
          }
      }

      if (startIndex > 0){
        previous = {
            page: page -1,
            limit: limit
        }
      }

    //   console.log('Total queried images');
    //   console.log(images);
      const bodyResponse = {    
        method: 'GET',
        type: 'data',
        body:{
            next,
            previous,
            images
        }
    }
    res.setHeader('Content-Type', 'application/json');
    return response.success(res, bodyResponse)
  
    } catch(error){
        console.log('El servicio fallo con error desconocido');
        response.serverError(res, error)
    }
  
  });
  

// Expose Express API as a single Cloud Function:
exports[CONST.microservice] = functions.https.onRequest(app);