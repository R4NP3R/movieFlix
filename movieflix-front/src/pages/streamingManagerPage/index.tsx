import { X } from "lucide-react";
import { useEffect, useState } from "react";

type StreamingPreview = {
  name: string;
  imageUrl: string;
};

export const StreamingManagerPage = () => {
  const [newStreamingPreview, setNewStreamingPreview] =
    useState<StreamingPreview>({
      name: "New Category",
      imageUrl: "https://placehold.co/32",
    });


    useEffect(() => {
      if (newStreamingPreview.imageUrl === "") {
        setNewStreamingPreview({...newStreamingPreview, 
          imageUrl: "https://placehold.co/32"
        });
      }

    }, [newStreamingPreview.imageUrl])

  return (
    <div className="grid grid-cols-3 mt-19">
      <form className="flex flex-col gap-4 w-full col-span-1 bg-slate-800 p-8 rounded-lg text-slate-200">
        <h2 className="text-4xl font-semibold text-slate-200 mb-4 text-center">
          Create Streaming
        </h2>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-slate-200 text-[20px]">
            Name:
          </label>
          <input
            onChange={(e) => setNewStreamingPreview({...newStreamingPreview, name: e.target.value})}
            type="text"
            className="border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-slate-200 text-[20px]">
            ImageUrl:
          </label>
          <input
            onChange={(e) => setNewStreamingPreview({...newStreamingPreview, imageUrl: e.target.value})}
            type="text"
            className="border-2 px-4 py-1 text-slate-200 border-slate-400 rounded-lg focus:outline-0"
          />
        </div>
        <button className="w-full h-8 bg-slate-600 rounded-2xl text-slate-200 cursor-pointer">
          Create Streaming
        </button>
      </form>
      <div></div>
      <div className="flex gap-4 mt-2">
        <div className="text-white px-4 py-1 h-10 rounded-lg bg-slate-500 flex items-center gap-2 relative group">
          <img className="w-8" src={newStreamingPreview.imageUrl} alt="" />
          <p className="cursor-default">{newStreamingPreview.name}</p>
          {/* <X
            // onClick={() => removeSelectedStreaming(i)}
            className="absolute right-0 top-2.25 w-4 hidden group-hover:block cursor-pointer"
          /> */}
        </div>
      </div>
    </div>
  );
};
