import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { compressImage } from "./compressImage";
import { thumbnailSizes } from "~/config/image";

export async function writeFileToDisk(file: File) {
  const rootDir = __dirname + "/../../../..";
  const fileDir = path.resolve(`${rootDir}/public/uploads`);
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true });
  }
  console.log("Writing", file.name, "to", fileDir);
  const [fileName, extension] = file.name.split(".");
  const savedFilePath = `${fileDir}/${fileName}.${extension}`;
  const fd = fs.createWriteStream(
    path.resolve(`${fileDir}/${fileName}.${extension}`)
  );
  const fileStream = Readable.fromWeb(
    // @ts-expect-error - unsure why this is not working
    file.stream()
  );
  for await (const chunk of fileStream) {
    fd.write(chunk);
  }
  fd.end();
  const compressedThumbUrls: string[] = [];
  for (const thumbDimensionPx of thumbnailSizes) {
    await compressImage({
      inputPath: savedFilePath,
      maxDimension: thumbDimensionPx,
      outputPath: `${fileDir}/${fileName}_${thumbDimensionPx}.${extension}`,
    });
    const compressedThumbUrl = `/uploads/${fileName}_${thumbDimensionPx}.${extension}`;
    compressedThumbUrls.push(compressedThumbUrl);
  }

  return {
    url: `/uploads/${fileName}.${extension}`,
    thumbUrls: compressedThumbUrls,
    name: file.name,
  };
}
