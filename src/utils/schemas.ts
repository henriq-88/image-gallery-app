import { zfd } from "zod-form-data";

export const uploadFileSchema = zfd.formData({
  image: zfd.file(),
});
