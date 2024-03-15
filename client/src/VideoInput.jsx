import React, { useState } from "react";

const VideoInput = () => {
  const inputRef = React.useRef();

  const [source, setSource] = useState();
  const [value, setValue] = useState(10);

  const handleFileChange = (event) => {
    const File = event.target.files[0];

    const FileSize = File.size;
    const MaxInputSize = 400 * 1024 * 1024; // Limitation of Upload on Video - 200MB

    if (FileSize > MaxInputSize) {
      alert("File size exceeds the limit. Please select a smaller file");
      if (!File || !File.type.includes("video")) {
        alert("Please select a video file");
      }
      return false;
    } else {
      const url = URL.createObjectURL(File);
      setSource(url);
    }
  };

  const handleRangeSlider = (event) => {
    setValue(parseInt(event.target.value));
  };

  // const handleChoose = (event) => {
  //   inputRef.current.click();
  // };

  return (
    <>
      <div className="border-8 text-center grid place-content-center h-screen ">
        <h1 className="text-[50px] p-8">
          <b>Traffic Violation Management</b>
        </h1>
        <div className="border border-black rounded-md p-8">
          {source && (
            <video className="w-full h-[250px]" controls src={source} />
          )}

          {!source ? (
            <div className="pl-12">
              <input
                ref={inputRef}
                type="file"
                accept=".mov, .mp4"
                onChange={handleFileChange}
                className=""
              />
            </div>
          ) : (
            <></>
          )}
          {/* {!source && <button onClick={handleChoose}>Choose File</button>} */}

          <div className="flex flex-col items-center mt-4">
            <p>Sequence Number:{value}</p>
            <input
              type="range"
              min={10}
              max={100}
              step={10}
              value={value}
              className="size-64 h-3"
              onChange={handleRangeSlider}
            />
            <button className="p-1 mt-6 w-36  bg-purple-600 rounded-md border">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoInput;
