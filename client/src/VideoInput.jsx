// import  { useState } from "react";
// import axios from "axios";
// import { useRef } from "react";

const VideoInput = () => {
  // const inputRef = useRef();
  // const [source, setSource] = useState();

  const handleFileChange = () => {
    // const file = event.target.files[0];
    // // console.log("Selected file:", file);

    // const fileSize = file.size;
    // const maxInputSize = 400 * 1024 * 1024; // Limitation of Upload on Video - 200MB

    // if (fileSize > maxInputSize) {
    //   alert("File size exceeds the limit. Please select a smaller file");
    //   return;
    // }

    // const url = URL.createObjectURL(file);
    // setSource(url);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // console.log("Form submitted: ", inputRef.current.files[0]);

    // Access the file input element using ref
    // const file = inputRef.current.files[0];

    // instead of using ref, you can also use event.target.elements to access the file input element
    const file2 = event.target.elements.video.files[0];

    // if (!file) {
    //   console.error("No file selected");
    //   return;
    // }

    console.log("Selected file:", file2);

    // Create FormData object and append the file
    const formData = new FormData();
    formData.append("video", file2);
    console.log("Form data:", formData);

    // instead of using FormData, you can also use the File object directly
    // const formData = new FormData();
    // formData.append("video", file);


    try {
      // Send a POST request to the server
      const response = await fetch("http://localhost:5050/record", {
        method: "POST",
        // send the file as form data
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Video uploaded successfully.");
    } catch (error) {
      console.error("A problem occurred with your fetch operation: ", error);
    }
  };



  return (
    <>
      <div className="border-8 text-center grid place-content-center h-screen ">
        <h1 className="text-[50px] p-8">
          <b>Traffic Violation Detection</b>
        </h1>
        <div className="border border-black rounded-md p-8">
          {/* {source && ( */}
            {/* <video className="w-full h-[250px]" controls src={source} />
          )} */}

          
            <form
              onSubmit={onSubmit}
              className="pl-12"
              encType="multipart/form-data"
          >
            {/* {!source && ( */}
              <input
                type="file"
                name="video"
                accept=".mov, .mp4"
                onChange={handleFileChange}
                className=""
            /> 
              {/* )} */}
              <button
                type="submit"
                className="p-1 mt-6 w-36 bg-purple-600 rounded-md border"
              >
                Submit
              </button>
            </form>
         
        </div>
      </div>
    </>
  );
};

export default VideoInput;
