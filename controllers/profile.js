const handleProfile = (req, res, db) => {
  const { id } = req.params;
  let found = false;
  db.select("*")
    .from("usuario")
    .where({
      id: id
    })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Não encontrado");
      }
    })
    .catch(err => res.status(400).json("não encontrado"));
};

module.exports = {
  handleProfile: handleProfile
};
