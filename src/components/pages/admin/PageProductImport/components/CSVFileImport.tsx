import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { Button } from "@mui/material";

type CSVFileImportProps = {
  url: string;
  title: string;
  onSuccess: () => void;
};

export default function CSVFileImport({ url, title, onSuccess }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.info("uploadFile to", url);
    if (!file) return;

    // Get the presigned URL
    const response = await axios({
      method: "GET",
      url,
      params: {
        name: encodeURIComponent(file.name),
      },
      headers: {
        "Content-Type": "text/csv", // Make sure this type matches type in signedUrl.
      },
    });

    console.info("File to upload: ", file.name);
    console.info("Uploading to: ", response.data);

    const result = await fetch(response.data, {
      method: "PUT",
      body: file,
    });

    console.info("Result: ", result);

    setFile(undefined);

    onSuccess();
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            size="small"
            onClick={removeFile}
            sx={{ mr: 1 }}
          >
            Remove file
          </Button>
          <Button
            type="button"
            variant="contained"
            size="small"
            color="secondary"
            onClick={uploadFile}
          >
            Upload file
          </Button>
        </div>
      )}
    </Box>
  );
}
