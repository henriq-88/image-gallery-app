import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useDropzone } from "react-dropzone";
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ComponentRef,
} from "react";
import { api } from "~/utils/api";
import { cn } from "~/utils/className";

type ImagePickerPopoverProps = {};

const ImagePickerPopover: React.FC<ImagePickerPopoverProps> = (props) => {
  const uploadImageFormRef = useRef<ComponentRef<`form`>>(null);
  const imageInputRef = useRef<ComponentRef<`input`>>(null);
  const [selectedImage, setSelectedImage] = useState<File>();
  const selectedImagePreviewUrl = useMemo(() => {
    if (!selectedImage) return undefined;
    return URL.createObjectURL(selectedImage);
  }, [selectedImage]);

  const onDrop = useCallback((files: File[]) => {
    if (!files) {
      return;
    }
    const image = files[0];
    if (!image) {
      return;
    }
    if (!image.type.startsWith(`image/`)) {
      return;
    }
    setSelectedImage(image);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  const apiUtils = api.useUtils();

  const uploadImage = api.image.upload.useMutation({
    onSuccess: () => {
      uploadImageFormRef.current?.reset();
      setSelectedImage(undefined);
      apiUtils.image.getAll.invalidate();
    },
  });

  const handleUploadImage: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    if (!e.currentTarget) {
      return;
    }
    const formData = new FormData(e.currentTarget);
    uploadImage.mutate(formData);
    e.preventDefault();
  };

  const onRemovePreviewImageClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async (e) => {
    if (imageInputRef.current?.value) {
      imageInputRef.current.value = ``;
    }
    setSelectedImage(undefined);
  };

  return (
    <Popover className="relative">
      <PopoverButton className="text-white bg-purple-500 rounded-full px-6 py-3">
        Upload Image
      </PopoverButton>
      <PopoverPanel
        anchor="bottom end"
        transition
        className="flex origin-top-right duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 flex-col bg-[#15162c]/75 backdrop-blur-2xl p-6 mt-6 mr-6 rounded-sm max-w-full w-sm"
      >
        <form
          ref={uploadImageFormRef}
          method="post"
          action={`/api/trpc/${uploadImage.trpc.path}`}
          encType="multipart/form-data"
          onSubmit={handleUploadImage}
          className="flex flex-col gap-3"
        >
          <div {...getRootProps()}>
            <input {...getInputProps()} name="image" />
            <div className="w-full aspect-square">
              {selectedImagePreviewUrl ? (
                <div className="relative">
                  <img
                    src={selectedImagePreviewUrl}
                    alt="Image to upload"
                    className="w-full h-full aspect-square object-contain bg-black/50"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  className={cn(
                    "p-12 border-dashed border-purple-500 border-2 rounded-sm bg-purple-500/10 text-center flex items-center justify-center w-full h-full",
                    {
                      "border-solid bg-purple-500/25": isDragActive,
                    }
                  )}
                >
                  {isDragActive ? (
                    <p className="text-white">Drop the image here...</p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <p className="text-white">
                        Drag and drop an image here, or click to choose an image
                      </p>
                      <div className="text-white bg-purple-500 rounded-full px-6 py-3">
                        Choose File
                      </div>
                    </div>
                  )}
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-3">
            <button
              type="reset"
              disabled={!selectedImage}
              className="border-purple-500 border-2 text-white rounded-full px-6 py-3 disabled:border-gray-500 disabled:text-gray-500 disabled:cursor-not-allowed"
              onClick={onRemovePreviewImageClick}
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={!selectedImage}
              className="text-white bg-purple-500 rounded-full px-6 py-3 disabled:bg-purple-900 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              Upload Image
            </button>
          </div>
        </form>
      </PopoverPanel>
    </Popover>
  );
};

export default ImagePickerPopover;
