import { useState } from "react";
import { FiltersType } from "../types";

type FilterTextModalProps = {
  filters: FiltersType;
  changeFilters: ({ newFilters }: { newFilters: FiltersType }) => void;
};

export default function FilterTextModal({ filters, changeFilters }: FilterTextModalProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleCloseModal();
    changeFilters({ newFilters: { ...filters, word: modalText } });
  };

  const handleTextChange = (newValue: string) => {
    setModalText(newValue);
  };

  const handleClearFilter = () => {
    setModalText("");
    changeFilters({ newFilters: { ...filters, word: "" } });
  };

  const handleOpenModal = () => {
    setShowModal(true);
    document.body.classList.add("overflow-hidden");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <>
      {filters.word !== "" && (
        <div
          className="rounded bg-neutral-600 px-3 cursor-pointer md:hover:bg-neutral-500 duration-300"
          onClick={() => handleClearFilter()}
        >
          <span className="font-bold mr-2">X</span>
          {filters.word.length > 9 ? filters.word.substring(0, 8).trim() + "..." : filters.word}
        </div>
      )}
      <button type="button" onClick={() => handleOpenModal()} className="w-4 h-4">
        <img className="cursor-pointer" src="/search_1.svg" alt="Search"></img>
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative w-auto my-6 mx-auto max-w-3xl border border-neutral-600 bg-black p-8">
              {/*content*/}
              <div className="relative flex flex-col w-full">
                <div className="flex items-start justify-between">
                  <h4 className="text-base text-neutral-400 ">Filter by title</h4>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <input
                    autoFocus={true}
                    className="w-full h-12 pl-5 bg-zinc-900 rounded-lg justify-start items-center gap-4 inline-flex my-2"
                    type="text"
                    value={modalText}
                    placeholder="Podcast title..."
                    onChange={(e) => handleTextChange(e.target.value)}
                  ></input>
                </form>
                <div className="flex justify-between place-items-center mt-2">
                  <button
                    className="bg-indigo-500 text-white md:hover:bg-indigo-600 active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded duration-300"
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Filter
                  </button>
                  <button
                    className="text-neutral-500 background-transparent font-bold uppercase px-6 py-3 text-sm duration-300"
                    type="button"
                    onClick={() => handleCloseModal()}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
