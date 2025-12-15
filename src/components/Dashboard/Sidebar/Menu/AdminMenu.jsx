import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { GiTeacher } from "react-icons/gi";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem
        icon={GiTeacher}
        label="Tutor Request"
        address="tutor-request"
      />
    </>
  );
};

export default AdminMenu;
