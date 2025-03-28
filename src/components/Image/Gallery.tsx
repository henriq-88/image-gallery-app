import { useAutoAnimate } from "@formkit/auto-animate/react";
import { api } from "~/utils/api";
import ImageThumbnail from "./Thumbnail";

type ImageGalleryProps = {};

const ImageGallary: React.FC<ImageGalleryProps> = (props) => {
  const apiUtils = api.useUtils();
  const [uploadedImagesRef] = useAutoAnimate();
  const uploadedImages = api.image.getAll.useQuery();
  const deleteImage = api.image.deleteById.useMutation({
    onSuccess: () => {
      apiUtils.image.getAll.invalidate();
    },
  });

  const onRemoveUploadedImageClick: (
    imageId: string
  ) => React.MouseEventHandler<HTMLButtonElement> =
    (imageId: string) => async (e) => {
      deleteImage.mutate({ id: imageId });
    };

  return (
    <div
      ref={uploadedImagesRef}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 flex-wrap p-6"
    >
      {uploadedImages.data?.map((image) => (
        <ImageThumbnail
          key={image.id}
          src={image.path ?? undefined}
          name={image.name ?? undefined}
          onRemoveClick={onRemoveUploadedImageClick(image.id)}
        ></ImageThumbnail>
      ))}
    </div>
  );
};

export default ImageGallary;
