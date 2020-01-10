export async function uploadPic({imageHost},req,resp,next){
  if (!req.files || !req.files.file){
    return resp.json({message:"NO_FILE"});
  }
  try{
    const result = await imageHost.uploader.upload(req.files.file.path);
    return resp.json({message:'OK',url:result.url});
  }catch(err){
    return resp.json({message:"UPLOAD_FAILED"})
  }
}