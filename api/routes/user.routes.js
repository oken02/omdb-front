const express = require("express");
const User = require("../models/User");
const Favorite = require("../models/Favorite.model");

const { validateToken } = require("../utils/jwt");

// Este router esta ya montado en /useres en server/app.js
const router = express.Router();

// /api/users

router.get("/", (req, res) => {
  User.findAll({
    include: Favorite,
    attributes: ["id", "firstName", "lastName", "username"],
  }).then((users) => {
    res.json(users);
  });
});

router.get("/:username", async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({
    where: { username },
    include: Favorite,
    attributes: ["id", "firstName", "lastName", "username"],
  });

  if (!user) {
    return res.sendStatus(404);
  } else {
    console.log("USER", user);
    res.json(user);
  }
});

router.put("/:username", async (req, res) => {
  const { username } = req.params;

  const [cant, [userUpdated]] = await User.update(req.body, {
    where: { username },
    returning: true,
    fields: ["firstName", "lastName", "username", "password"],
  });

  if (cant === 0) {
    return res.sendStatus(404);
  }

  console.log("UPDATE", [cant, userUpdated]);

  res.send(userUpdated);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      const createdUser = await User.create(req.body, {
        fields: ["firstName", "lastName", "username", "password"],
      });

      res.status(201).json(createdUser);
    } else res.status(404).json({ msg: "username no valid" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "server error" });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const createdUser = await User.create(req.body, {
//       fields: ["firstName", "lastName", "username", "password"],
//     }).catch(err =>{
//       // unique error
//     })

//     res.status(201).json(createdUser);
//     // res.status(404).json({ msg: "username no valid" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ ok: false, msg: "server error" });
//   }
// });

module.exports = router;
