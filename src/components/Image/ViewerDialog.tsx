import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useMemo } from "react";
import { thumbnailSizes } from "~/config/image";

type ImageViewerDialogProps = {
  src: string;
  isOpen: boolean;
  onClose: (value: boolean) => void;
};

const ImageViewerDialog: React.FC<ImageViewerDialogProps> = (props) => {
  const thumbnails = useMemo(() => {
    const [fileNamePath, fileExtension] = props.src.split(`.`);
    return thumbnailSizes
      .map((size) => {
        return `${fileNamePath!}_${size}.${fileExtension}`;
      })
      .reverse();
  }, []);

  const fileName = useMemo(() => {
    return props.src.split(`/`).at(-1);
  }, [props.src]);

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      className="relative z-50"
    >
      <DialogBackdrop
        className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
        transition
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <div className="fixed inset-0 w-screen overflow-y-auto p-4">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="max-w-full w-5xl bg-[#15162c] duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 rounded-md overflow-y-auto"
            >
              <DialogTitle className="text-white p-6 flex justify-between">
                <span>{fileName}</span>
                <button
                  className="text-white bg-white/10 rounded-full size-12"
                  onClick={() => props.onClose(false)}
                >
                  ╳
                </button>
              </DialogTitle>
              <div className="p-6 flex flex-wrap gap-3 items-start justify-start">
                <img src={props.src} className="object-contain" />
                {thumbnails.map((thumbnail) => (
                  <img
                    key={thumbnail}
                    src={thumbnail}
                    className="object-contain"
                  />
                ))}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ImageViewerDialog;
