const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateSignUpInput = require("../validation/signup");
const validateLoginInput = require("../validation/login");
const User = require("../database/models/userModel.js");
const passport = require("passport");

router.post("/signup", (req, res) => {
	const { errors, isValid } = validateSignUpInput(req.body);

	if (!isValid) {
		return res.status(400).json({ ...errors, type: "local" });
	}
	const { username, password } = req.body;
	User.findOne({ username }).then(user => {
		if (user) {
			if (user.username === username)
				return res
					.status(400)
					.json({ type: "global", text: "Пользователь уже существует" });
		} else {
			const newUser = new User({ username, password });

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err =>
							res
								.status(400)
								.json({
									type: "global",
									text: "Ошибка при создании пользователя"
								})
						);
				});
			});
		}
	});
});
router.post("/login", (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	if (!isValid) {
		return res.status(400).json({ ...errors, type: "local" });
	}
	const { username, password } = req.body;
	User.findOne({ username }).then(user => {
		if (!user) {
			return res
				.status(404)
				.json({ type: "global", text: "Пользователь не найден" });
		}
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				const payload = {
					id: user.id,
					username: user.username
				};
				jwt.sign(
					payload,
					process.env.SECRET,
					{ expiresIn: 3600 },
					(err, token) => {
						if (err) {
							console.log(err);
						}
						return res.json({
							user: payload,
							token: "Bearer " + token
						});
					}
				);
			} else {
				return res
					.status(400)
					.json({ type: "global", text: "Неверные имя или пароль" });
			}
		});
	});
});
router.get("/relogin", function(req, res, next) {
	let token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({ message: "Отсутствует jwt" });
	}
	token = token.split(" ")[1];
	jwt.verify(token, process.env.SECRET, function(err, user) {
		if (err) throw err;
		User.findById(
			{
				_id: user.id
			},
			function(err, user) {
				if (err) throw err;
				res.json({
					user: user,
					token: token
				});
			}
		);
	});
});

module.exports = router;
