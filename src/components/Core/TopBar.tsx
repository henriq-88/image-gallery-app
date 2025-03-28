import ImagePickerPopover from "../Image/PickerPopover";

type TopBarProps = {};

const TopBar: React.FC<TopBarProps> = (props) => {
  return (
    <nav className="flex flex-row justify-between bg-[#15162c] backdrop-blur-2xl px-6 py-2 items-center">
      <h2 className="flex text-white">Image Gallery App</h2>
      <ImagePickerPopover />
    </nav>
  );
};

export default TopBar;
