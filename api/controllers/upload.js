export const addFile = async (req, res) => {
  try {
    const file = req.file;
    res.status(200).json(file.filename);
  } catch (error) {
    console.error(error);
  }
};
