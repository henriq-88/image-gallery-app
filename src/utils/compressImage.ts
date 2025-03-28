import sharp from "sharp";

export const compressImage = async ({
  inputPath,
  outputPath,
  maxDimension,
}: {
  inputPath: string;
  outputPath: string;
  maxDimension: number;
}) => {
  return sharp(inputPath)
    .resize(maxDimension, maxDimension, {
      fit: `inside`,
    })
    .toFile(outputPath);
};
