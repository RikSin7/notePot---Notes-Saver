import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CanvasEffect from "./CanvasSpiderWebEffect";

function ViewPaste() {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  // Use find instead of filter to get the paste object directly
  const paste = allPastes.find((uniquePaste) => uniquePaste._id === id);

  // Handle the case where the paste is not found
  if (!paste) {
    return <div className="mt-16">Paste not found!</div>;
  }

  return (
    <div className="mt-16 flex flex-col items-center max-w-[98vw]  min-h-screen transition-bg duration-300 text-wrap">
      <CanvasEffect />
      <h1 className="sm:my-[10vh] my-[5vh] font-[rancho] font-bold sm:text-5xl text-3xl text-[#ffffff] dark:text-[#646464] transition-all duration-300 text-center">
        You write Awesome notes.
      </h1>
      <div className="mb-4">
        <div className="title flex min-w-[50vw]  max-w-[98vw]">
          <h1 className=" xss:w-full text-center dark:bg-[#121212] dark:border-black border-none sm:p-4 p-2 rounded-full justify-center  bg-inputBg outline-none hover:outline-[#825a5a] sm:transition-all sm:duration-300 sm:ease-in-out sm:hover:scale-[0.98] sm:active:scale-[1.02] active:scale-[1.05] active:duration-300 transition-all duration-300 w-full">
            {paste.title}
          </h1>
        </div>
      </div>
      <div className="desc flex min-w-[50vw]  max-w-[98vw]">
        <p
          className="text-center dark:bg-[#121212] dark:border-black border-none sm:p-4 p-2 rounded-2xl justify-center  bg-inputBg outline-none hover:outline-[#825a5a] sm:transition-all sm:duration-300 sm:ease-in-out sm:hover:scale-[0.98] sm:active:scale-[1.02] active:scale-[1.05] active:duration-300 transition-all duration-300 w-full"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {paste.description}
        </p>
      </div>
    </div>
  );
}

export default ViewPaste;
