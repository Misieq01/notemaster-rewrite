import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { GetAllLabels } from "../../Store/Selectors/labelsSelectors";
import { ReactComponent as ArchiveIcon } from "../../../Assets/Icons/Navigation/archive.svg";
import { ReactComponent as BinIcon } from "../../../Assets/Icons/Navigation/bin.svg";
import { ReactComponent as NotesIcon } from "../../../Assets/Icons/Navigation/home.svg";
import { ReactComponent as LabelIcon } from "../../../Assets/Icons/Navigation/label.svg";

import Element from "./SideMenuElement";

const transition = {
  transition: { duration: 0.3, ease: "easeInOut" },
};

const Variants = {
  initial: { width: 80 },
  close: { width: 80, ...transition },
  open: { width: 280, ...transition },
  hover: { width: 280, boxShadow: "2px 0 2px rgba(0,0,0,0.12)", ...transition },
};

const SideMenu = () => {
  const sideMenuDisplay = useSelector((state) => state.others.sideMenu);
  const labels = useSelector((state) => GetAllLabels(state));

  return (
    <motion.div
      className="side-menu__container"
      initial="initial"
      animate={sideMenuDisplay ? "open" : "close"}
      variants={Variants}
      whileHover={!sideMenuDisplay ? "hover" : null}
    >
      <Element Icon={NotesIcon} text="Notes" />
      {labels.map((e) => (
        <Element Icon={LabelIcon} text={e.name} key={e.name}/>
      ))}
      <Element Icon={ArchiveIcon} text="Archive" />
      <Element Icon={BinIcon} text="Bin" />
    </motion.div>
  );
};

export default SideMenu;
