import React from "react";
import { useState, useEffect } from "react";
import ReactDropzone from "react-dropzone";

export default function Dropzone() {
  const [fileNames, setFileNames] = useState([]);
  const handleDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    setFileNames(acceptedFiles.map((file) => file.name));
  };

  return (
    <>
      <ReactDropzone onDrop={handleDrop} accept="image/*">
        {({ getRootProps, getInputProps, isDragAccept, isDragReject }) => (
          // <div {...getRootProps({ className: "dropzone" })} style={{backgroundImage:'url(/phone.jpg)', backgroundRepeat:'no-repeat', height:'200px', backgroundSize:'cover'}}>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Déposez une image ou cliquez pour la sélectionner</p>
            {isDragAccept ? "Relachez pour déposer" : null}
            {isDragReject
              ? "Ce type de fichier n'est pas pris en charge"
              : null}
          </div>
        )}
      </ReactDropzone>
    </>
  );
}
