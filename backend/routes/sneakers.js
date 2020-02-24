const express = require("express");
const router = express.Router();
const Sneaker = require("../database/models/sneakerModel.js");
const passport = require("passport");
const validateSneakerInput = require("../validation/sneaker");

router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Sneaker.find({ owner: req.user.username })
			.then(sneakers => res.status(200).json(sneakers))
			.catch(err =>
				res.status(400).json({
					type: "global",
					text: "Не удалось получить список кроссовок"
				})
			);
	}
);
router.get(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Sneaker.find({ _id: req.params.id })
			.then(sneaker => res.status(200).json(sneaker))
			.catch(err =>
				res
					.status(400)
					.json({ type: "global", text: "Не удалось получить запись" })
			);
	}
);
router.post(
	"/add",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const model = req.body.sneaker.model;
		const brand = req.body.sneaker.brand;
		const owner = req.user.username;

		const newSneaker = new Sneaker({
			model,
			brand,
			owner
		});
		const { errors, isValid } = validateSneakerInput(newSneaker);
		if (!isValid) {
			return res.status(400).json({ ...errors, type: "local" });
		}
		newSneaker
			.save()
			.then(doc => res.status(200).json(doc))
			.catch(err =>
				res
					.status(400)
					.json({ type: "global", text: "Ошибка при добавлении кроссовок" })
			);
	}
);

router.patch(
	"/update/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const brand = req.body.brand;
		const model = req.body.model;
		const owner = req.user.username;

		const newSneaker = new Sneaker({
			model,
			brand,
			owner
		});
		const { errors, isValid } = validateSneakerInput(newSneaker);
		if (!isValid) {
			return res
				.status(400)
				.json({
					text: "Ошибка:" + errors.model + " " + errors.brand,
					type: "global"
				});
		}
		Sneaker.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: { brand, model } },
			{ new: true }
		)
			.then(doc => res.status(200).json(doc))
			.catch(err =>
				res
					.status(400)
					.json({ type: "global", text: "Ошибка при обновлении кроссовок" })
			);
	}
);

router.delete(
	"/delete/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Sneaker.findOneAndDelete({ _id: req.params.id })
			.then(doc => res.status(200).json(doc))
			.catch(err =>
				res
					.status(400)
					.json({ type: "global", text: "Ошибка при удалении кроссовок" })
			);
	}
);
module.exports = router;
