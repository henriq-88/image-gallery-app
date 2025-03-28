import fs from "node:fs";
import { thumbnailSizes } from "~/config/image";

export const deleteFileFromDisk = async (filePath: string) => {
  try {
    const [fileName, fileExtension] = filePath.split(".");
    const rootDir = __dirname + "/../../../..";
    fs.unlinkSync(`${rootDir}/public/${fileName}.${fileExtension}`);
    for (const thumbnailSize of thumbnailSizes) {
      fs.unlinkSync(
        `${rootDir}/public/${fileName}_${thumbnailSize}.${fileExtension}`
      );
    }
  } catch (error) {
    console.error(error);
  }
};
