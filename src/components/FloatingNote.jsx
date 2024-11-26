import  { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CanvasEffect from "./CanvasSpiderWebEffect";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  addSticky,
  removeSticky,
  resetSticky,
  updateSticky,
} from "../redux/stickySlice";
import Foreground from "./Foreground";

function FloatingNote() {
  const [renderStickyNote, setRenderStickyNote] = useState(false);
  const [newNoteColor, setNewNoteColor] = useState("#ffffff");
  const [newNoteText, setNewNoteText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const stickies = useSelector((state) => state.sticky.stickies);

  const ref = useRef(null);

  useEffect(() => {
    setRenderStickyNote(location.pathname === "/pastes/stickynotes");
  }, [location.pathname]);

  const handleNavigation = () => {
    const newPath = renderStickyNote ? "/pastes" : "/pastes/stickynotes";
    setRenderStickyNote(!renderStickyNote);
    navigate(newPath);
  };

  const handleCreate = () => {
    const note = {
      text: newNoteText,
      color: newNoteColor,
      _id: Date.now().toString(36),
    };
    dispatch(addSticky(note));
    setNewNoteText("");
    setNewNoteColor("#ffffff");
  };

  const handleRemove = (id) => {
    dispatch(removeSticky(id));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all notes?")) {
      dispatch(resetSticky());
    }
  };

  const handleNoteChange = (id, field, value) => {
    const updatedNote = { _id: id, [field]: value };
    dispatch(updateSticky(updatedNote));
  };

  return (
    <motion.div
      className={`${
        renderStickyNote &&
        "min-w-[100vw] bg-white max-h-screen  dark:bg-[#1B1C1E]"
      } overflow-hidden`}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {renderStickyNote && <Foreground />}
      <div className="w-full">
        <div
          className={`flex w-full  gap-2 justify-center  ${
            renderStickyNote && "my-4 mt-5"
          }`}
        >
          <button
            className={`exit min-w-[20vw]  rounded-full animate-float  px-4 text-nowrap flex  items-center  cursor-pointer  md:py-4 py-2 dark:bg-[#121212] transition-all duration-300  sm:p-4 p-2  my-4 mt-10 justify-center text-center   bg-inputBg outline-none hover:outline-[#825a5a]  ml-1  sm:text-base text-[#9e5959] sm:transition-all sm:duration-300 text-[14px]  ${
              !renderStickyNote && "xs:text-[10px] mr-2 xs:mr-8"
            } `}
            onClick={handleNavigation}
          >
            {renderStickyNote ? "Exit" : "Sticky Notes"}
          </button>
          {renderStickyNote && stickies.length > 2 && (
            <button
              className="reset min-w-[20vw]  rounded-full animate-float  px-4 text-nowrap flex  items-center  cursor-pointer  md:py-4 py-2 dark:bg-[#121212] transition-all duration-300  sm:p-4 p-2  my-4 mt-10 justify-center text-center   bg-inputBg outline-none hover:outline-[#825a5a] sm:text-base text-[#9e5959] sm:transition-all sm:duration-300 text-[14px]"
              onClick={handleReset}
            >
              Reset
            </button>
          )}
        </div>
        <CanvasEffect />
        {renderStickyNote && (
          <div className="flex flex-wrap max-w-[100vw] justify-center h-screen gap-1">
            <div className="colorPanel bg-[#dcdcdc] absolute sm:left-10 flex items-center justify-around rounded-3xl h-12 min-w-[100px] my-2 sm:top-8 top-0 left-2 dark:bg-[#121212]">
              <input
                type="color"
                id="color-picker"
                value={newNoteColor}
                onChange={(e) => setNewNoteColor(e.target.value)}
                className="absolute w-0 h-0 opacity-0"
              />
              <label
                htmlFor="color-picker"
                className="w-8 h-8 rounded-full cursor-pointer"
                style={{
                  backgroundColor: newNoteColor,
                  boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.2)",
                  border: "black",
                }}
              ></label>
              <button
                className="text-black font-bold outline-none"
                onClick={handleCreate}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 dark:fill-white"
                >
                  <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                </svg>
              </button>
            </div>
            <AnimatePresence mode={"popLayout"}>
              {stickies.map((note) => (
                <motion.div key={note._id}>
                  <motion.div
                    drag
                    dragConstraints={ref}
                    className="relative"
                    key={note._id}
                    layout
                    initial={{ opacity: 0, y: 50, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      y: -50,
                      transition: { duration: 0.2, ease: "easeInOut" },
                    }}
                  >
                    <textarea
                      className="box sm:h-[250px] sm:w-[230px] h-[200px] w-[200px] dark:bg-[#121212] bg-[#F0F4F7] sm:rounded-[30px] rounded-[15px] border-1 sm:border-t-[50px] border-t-[32px] border-black outline-none py-1 px-2 dark:text-white text-black flex flex-grow-0 resize-none "
                      value={note.text}
                      placeholder="Write anything..."
                      onChange={(e) =>
                        handleNoteChange(note._id, "text", e.target.value)
                      }
                      style={{ borderTopColor: note.color }}
                    ></textarea>
                    <button
                      className="close absolute p-1 top-1 sm:top-3 right-2 bg-[#131313] w-6 h-6 rounded-full flex justify-center items-center"
                      onClick={() => handleRemove(note._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                      </svg>
                    </button>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default FloatingNote;
