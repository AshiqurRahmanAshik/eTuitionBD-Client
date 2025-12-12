import {
  BsFingerprint,
  BsPlusSquare,
  BsCardList,
  BsPersonCheck,
  BsWallet2,
  BsPerson,
} from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from "./MenuItem";
import { useState } from "react";
import BecomeSellerModal from "../../../Modal/BecomeSellerModal";

const StudentMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Existing dashboard */}
      <MenuItem icon={BsFingerprint} label="My Tuition" address="my-orders" />

      {/* Added missing menu items based on requirements */}
      <MenuItem
        icon={BsPlusSquare}
        label="Post New Tuition"
        address="post-new-tuition"
      />

      <MenuItem icon={BsWallet2} label="Payments" address="payments" />

      {/* Become a tutor modal */}
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform text-gray-600 hover:bg-gray-300 hover:text-gray-700 cursor-pointer"
      >
        <GrUserAdmin className="w-5 h-5" />
        <span className="mx-4 font-medium">Become A Tutor</span>
      </div>

      <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};

export default StudentMenu;
