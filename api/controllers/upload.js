export const addFile = (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
  };