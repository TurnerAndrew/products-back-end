module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
    const {name, description, price, image_url} = req.body

    db.create_product(name, description, price, image_url)
      .then((product) => {
        res.status(200).send(product);
      })
      .catch((err) => {
        res.status(500).send(`Oh no!  Something went wrong! ${err}`);
      });
  },

  getAll: (req, res) => {
    const db = req.app.get("db");
    db.read_products()
      .then((product) => {
        res.status(200).send(product);
      })
      .catch((err) => {
        res.status(500).send(`Oh no!  Something went wrong! ${err}`);
      });
  },

  getOne: (req, res) => {
    const db = req.app.get("db");
    const { product_id } = req.params;

    db.read_product(product_id)
      .then((product) => {
        res.status(200).send(product);
      })
      .catch((err) => {
        res.status(500).send(`Oh no!  Something went wrong! ${err}`);
      });
  },

  update: (req, res) => {
    const db = req.app.get("db");
    const { product_id } = req.params;
    const { description } = req.body;

    db.update_product(product_id, description)
      .then((product) => {
        res.status(200).send(product);
      })
      .catch((err) => {
        res.status(500).send(`Oh no!  Something went wrong! ${err}`);
      });
  },

  delete: (req, res) => {
    const db = req.app.get("db");
    const { product_id } = req.params;

    db.delete_product(product_id)
      .then((product) => {
        res.status(200).send(product);
      })
      .catch((err) => {
        res.status(500).send(`Oh no!  Something went wrong! ${err}`);
      });
  },
};
