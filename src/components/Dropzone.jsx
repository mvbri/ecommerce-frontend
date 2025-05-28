import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Dropzone = ({ className,files, setFiles, maxfiles = false }) => {
  const [rejected, setRejected] = useState([]);
  const [error, setError] = useState(false);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      if (!maxfiles) {
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
        return;
      }

      console.log(files.length, acceptedFiles.length);
      if (files.length + acceptedFiles.length > 1) {
        setError("Solo se permite subir una imagen."); // Establece el mensaje de error
        return; // Detiene el proceso de subida
      }

      setError(null); // Limpia el error si la subida es válida
      // Almacena solo el primer archivo aceptado, reemplazando cualquier archivo anterior.
      const newFiles = acceptedFiles
        .slice(0, 1)
        .map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
      setFiles(newFiles);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  return (
    <div>
      {error && (
        <div
          role="alert"
          className="relative flex w-full items-start rounded-md border border-red-400 bg-red-400 p-2 text-slate-50"
        >
          <div className="m-1.5 w-full font-sans text-base leading-none">
            {error}
          </div>
        </div>
      )}
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
          <p>Suelta los archivos aquí ...</p>
        ) : (
          <p>Arrastre y suelte algunos archivos aquí, o haga clic para seleccionar archivos</p>
        )}
      </div>
      <ul className="flex gap-2">
        {files && files.map((file) => (
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
    </div>
  );
};

export default Dropzone;
