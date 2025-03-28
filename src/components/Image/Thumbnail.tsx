import { useMemo, useState } from "react";
import { cn } from "~/utils/className";
import ImageViewerDialog from "./ViewerDialog";
import { thumbnailSizes } from "~/config/image";

type ImageThumbnailProps = {
  src: string;
  name: string;
  onRemoveClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const ImageThumbnail: React.FC<ImageThumbnailProps> = (props) => {
  const fileName = useMemo(() => {
    return props.src.split(`/`).at(-1);
  }, [props.src]);

  const [isViewerDialogOpen, setIsViewerDialogOpen] = useState(false);

  const srcSet = useMemo(() => {
    const [fileNamePath, fileExtension] = props.src.split(`.`);
    return `${thumbnailSizes
      .map((size) => {
        return `${encodeURI(fileNamePath!)}_${size}.${fileExtension} ${size}w`;
      })
      .join(", ")}, ${encodeURI(props.src)} 1024w`;
  }, [props.src]);

  const onImageClick = () => {
    setIsViewerDialogOpen(true);
  };

  const onImageViewerDialogClose = () => {
    setIsViewerDialogOpen(false);
  };

  return (
    <>
      <ImageViewerDialog
        isOpen={isViewerDialogOpen}
        src={props.src}
        onClose={onImageViewerDialogClose}
      />
      <div className="relative group">
        <button
          className="bg-black/50 rounded-sm aspect-square relative"
          onClick={onImageClick}
        >
          <img
            src={props.src}
            srcSet={srcSet}
            sizes="(max-width: 256px) 128px, (max-width: 512px) 256px, 1024px"
            alt={props.name}
            className="w-full h-full object-contain"
          />
          <div className="w-full bg-black/75 absolute bottom-0 text-white text-left p-3 rounded-b-[inherit] text-sm">
            {fileName}
          </div>
        </button>
        <button
          className="absolute hidden group-hover:block top-0 right-0 m-3 text-white bg-red-500 rounded-full size-12"
          onClick={(e) => {
            e.stopPropagation();
            props.onRemoveClick(e);
          }}
        >
          ╳
        </button>
      </div>
    </>
  );
};

export default ImageThumbnail;
