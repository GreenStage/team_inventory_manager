import cloudinary from 'cloudinary';
import fs from 'fs';

export async function uploadPic(config,req,resp,next){
  if (!req.files || !req.files.file){
    return resp.json({message:"NO_FILE"});
  }
  try{
    const result = await cloudinary.uploader.upload(req.files.file.path);
    return resp.json({message:'OK',url:result.url});
  }catch(err){
    console.log(err);
    return resp.json({message:"UPLOAD_FAILED"})
  }
}