import imageDownloader from "image-downloader";
import path from 'path';
import fs from "fs";
 
export const uploadByLink = async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  const dirName = path.resolve();
  await imageDownloader.image({
    url: link,
    dest: `${dirName}/uploads/${newName}`,
  });
  res.json(`${newName}`);
};

export const upload = (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; ++i) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
};