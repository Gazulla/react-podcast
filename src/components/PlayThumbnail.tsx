import { useState } from "react";

export default function PlayThumbnail() {
  const [order, setOrder] = useState<string>("");
  const handleChangeOrder = (newOrder: string) => {
    setOrder(newOrder);
  };
  return (
    <div className="w-full h-14 relative">
      <div className="right-0 top-[10px] absolute justify-start items-center gap-5 inline-flex">
        <div className="w-4 h-4">
          <img src="/search_1.svg" alt="Search"></img>
        </div>
        <div className="w-24 rounded-2xl justify-start items-center gap-1.5 flex">
          <select
            className="text-white text-base font-normal bg-black border-0"
            onChange={(e) => handleChangeOrder(e.target.value)}
            value={order}
          >
            <option disabled={true} value="">
              Order by
            </option>
            <option value="no_order">No order</option>
            <option value="name">Name</option>
            <option value="released">Released</option>
          </select>
          <div className="w-4 h-4 relative" />
        </div>
      </div>
    </div>
  );
}
