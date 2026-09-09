import { useEffect, useRef } from "react";

function ImageUpload({ onUpload }) {

  const widgetRef = useRef(null);
  const onUploadRef = useRef(onUpload);

  // Always keep the latest callback
  onUploadRef.current = onUpload;

  useEffect(() => {

    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "dusfuobv",
        uploadPreset: "clothify",

        sources: [
          "local",
          "camera"
        ],

        multiple: false,

        clientAllowedFormats: [
          "jpg",
          "jpeg",
          "png",
          "webp"
        ],

        maxFileSize: 5000000
      },

      (error, result) => {

        if (!error && result.event === "success") {

          console.log(
            "Image uploaded:",
            result.info.secure_url
          );

          onUploadRef.current(result.info.secure_url);
        }

      }
    );

    return () => {
      widgetRef.current = null;
    };

  }, []);


  const openWidget = () => {

    if (widgetRef.current) {
      widgetRef.current.open();
    }

  };


  return (
    <button
      type="button"
      onClick={openWidget}
    >
      Upload Image
    </button>
  );
}

export default ImageUpload;