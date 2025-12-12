import { PiChalkboardTeacherFill } from "react-icons/pi";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import { BsWallet2, BsPerson } from "react-icons/bs";
import MenuItem from "./MenuItem";

const TutorMenu = () => {
  return (
    <>
      {/* Tutor Dashboard menu items */}
      <MenuItem
        icon={PiChalkboardTeacherFill}
        label="My Applications"
        address="my-applications"
      />
      <MenuItem
        icon={MdHomeWork}
        label="Tutor Ongoing Tuitions"
        address="ongoing-tuitions"
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Revenue History"
        address="revenue-history"
      />
    </>
  );
};

export default TutorMenu;
