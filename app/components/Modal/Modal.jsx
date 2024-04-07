import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Modal.scss"

export default function Modal({ isOpen, setIsOpen, children }) {
  return (
    <AnimatePresence initial={false}>
    {isOpen &&
      <div className="modal">
        <motion.div
          key={"modal"}
          className={"content"}
          initial={{top: "-100%"}}
          animate={{top: "10%"}}
          exit={{ top: "100%" }}
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 33
          }}
        >
          <div className="body">
            { children }
          </div>
        </motion.div>
      </div>
    }
    </AnimatePresence>
  );
}
