module.exports = (mongoose, url) => {
  mongoose
    .connect(url)
    .then(() =>
      console.log("\x1b[32mConnecté avec succès à la base de données\x1b[0m")
    )
    .catch((error) => console.error(error));
};
