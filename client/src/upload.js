import { makeRequest } from "./axios";

const upload = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await makeRequest.post("/upload", formData);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export default upload;
