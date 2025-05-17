import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { XMarkIcon } from "@heroicons/react/24/solid";

const Dropzone = ({ className, files, setFiles }) => {
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone(
    {
      onDrop,
      accept: {
        "image/*": [],
      },
    },
    {
      maxFiles: 1,
    }
  );

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  return (
    <>
      <div
        {...getRootProps({
          className: className,
        })}
      >
        <input
          {...getInputProps({
            name: "image",
            id: "image",
          })}
        />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop some files here, or click to select files</p>
        )}
      </div>
      <ul className="flex">
        {files.map((file) => (
          <li key={file.name} className="mb-4">
            <div className="relative size-24">
              <img
                className="size-full mr-3"
                alt={file.name}
                src={file.preview}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
              <button
                className="bg-transparent absolute top-0 right-0"
                onClick={() => removeFile(file.name)}
              >
                <XMarkIcon className="size-5 text-blue-500" />
              </button>
            </div>
            <p className="text-[12px] text-neutral-500">{file.name}</p>
          </li>
        ))}
      </ul>
      <ul className="flex">
        {rejected.map(({ file, errors }) => (
          <li key={file.name} className="mb-4">
            <div className="relative size-24">
              <p className="text-[12px] text-neutral-500">
                {file.name} - (Archivo rechazado)
              </p>
              <ul className="text-[12px] text-red-400">
                {errors.map((error) => (
                  <li key={error.code}>{error.message}</li>
                ))}
              </ul>
            </div>
            <button
              className="bg-slate-500 px-3 text-[25px]"
              onClick={() => removeRejected(file.name)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dropzone;
