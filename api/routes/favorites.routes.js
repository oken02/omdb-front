const express = require("express");
const User = require("../models/User");
const Favorite = require("../models/Favorite.model");

const { validateToken } = require("../utils/jwt");

// Este router esta ya montado en /useres en server/app.js
const router = express.Router();

/* 
  /api/favorites 
*/

// router.get("/", async (req, res) => {
//   res.send(await Favorite.findAll());
// });

// router.get("/:key/:value", async (req, res) => {
//   const { key, value } = req.params;
//   const r = await Favorite.findAll({ where: { [key]: value } });
//   res.send({ len: r.length, ...r });
// });

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.sendStatus(404);
    }

    const favs = await user.getFavorites({
      attributes: ["id", "Title", "Poster", "imdbID"],
    });

    res.json(favs);
  } catch (error) {
    res.send({ ok: false, msg: "server error" });
  }
});

router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const body = req.body;
  try {
    const user = await User.findByPk(userId);

    if (user) {
      const favDB = await Favorite.findOne({
        where: { imdbID: req.body.imdbID },
        attributes: ["id", "Title", "Poster", "imdbID"],
      });

      if (favDB) {
        const favorite = await user.addFavorite(favDB);
        if (!favorite) {
          // No se pudo agregar o ya lo tiene
        }
        res.status(201).json(favDB);
      } else {
        // const fav = await Favorite.create(body);
        //  user.addFavorite(fav);

        const favorite = await user.createFavorite(body, {
          // attributes: [ "Title", "Poster", "imdbID"],
        });

        console.log("FAVORITE", favorite.toJSON());

        res.status(201).json(favorite);
      }
    } else res.status(404).json({ ok: false, msg: "user no exists" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "server error" });
  }
});

router.delete("/:userId/:favId", (req, res) => {
  const { userId, favId } = req.params;
  console.log("DELETE USER", userId, "FAV ID", favId);

  const user = User.build({ id: userId });

  user.removeFavorite(favId).then((r) => {
    console.log("RESSSS", r);
    res.send("ok");
  });

  // Favorite.destroy({where:})
  // res.send("ok");
});

module.exports = router;
