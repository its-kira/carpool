module.exports = (app, port) => {
  app.listen(port, () =>
    console.log(
      `\x1b[32mServeur en cours d'exécution sur http://localhost:${port}\x1b[0m`
    )
  );
};
