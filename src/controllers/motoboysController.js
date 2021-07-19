const Associados = require("../models/Associados");
const Clientes = require("../models/Clientes");
const Motoboys = require("../models/Motoboys");
const Entregas = require("../models/Entregas");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function passwordValidation(password) {
	if (password.length < 8) return "Senha deve ter no mínimo 8 caracteres.";
	else if (!password.match(/[a-zA-Z]/g))
		return "Senha deve ter no mínimo uma letra.";
	else if (!password.match(/[0-9]+/))
		return "Senha deve ter no mínimo um número.";
    else if (!password.match(/[@$!%*?&]/))
        return "Senha deve ter no mínimo um caractere especial."
	else return "OK";
}

function generateToken(id) {
	process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
	const token = jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: 18000, // Token expira em 5 horas
	});
	return token;
}

module.exports = {
    async authentication(req, res) {
		const cpf = req.body.cpf;
		const password = req.body.password;
		if (!cpf || !password)
			return res.status(400).json({ msg: "Campos obrigatórios vazios!" });
		try {
			const motoboy = await Motoboys.findOne({
				where: { cpf },
			});
			if (!motoboy)
				return res.status(404).json({ msg: "Usuário ou senha inválidos." });
			else {
				if (bcrypt.compareSync(password, motoboy.password)) {
					const token = generateToken(motoboy.id);
					return res.status(200).json({ msg: "Autenticado com sucesso", token });
				} else
					return res.status(404).json({ msg: "Usuário ou senha inválidos." });
			}
		} catch (error) { 
            res.status(500).json(error);
		}
	},

    async newMotoboy(req, res) {
        const { name, cpf, password, phone } = req.body;
        if (!name || !cpf || !password || !phone) {
            res.status(400).json({
                msg: "Dados obrigatórios não foram preenchidos.",
            });
        }

        const passwordValid = passwordValidation(password);
        if (password !== "OK")
            return res.status(400).json({ passwordValid });

        const isMotoboyNew = await Motoboys.findOne({
            where: { cpf },
        });

        if (isMotoboyNew)
            res.status(403).json({ msg: "Motoboy já foi cadastrado." });
        else {
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(password, salt);

            const motoboy = await Motoboys.create({
                name,
                cpf,
                password: hash,
                phone,
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possível inserir os dados." });
            });
            if (motoboy)
                res.status(201).json({ msg: "Novo associado foi adicionado." });
            else
                res.status(404).json({ msg: "Não foi possível cadastrar novo motoboy." });
        }
    },

    async listAllMotoboy(req, res) {
        const motoboy = await Motoboys.findAll({
            order: [["name", "ASC"]],
        }).catch((error) => {
            res.status(500).json({ msg: "Falha na conexão." });
        });
        if (motoboy)
            res.status(200).json({ motoboy });
        else
            res.status(404).json({ msg: "Não foi possível encontrar motoboy." });
    },

    async searchMotoboyByCPF(req, res) {
        const cpf = req.body.cpf;
        if (!cpf)
            res.status(400).json({ msg: "Parâmetro CPF está vazio." });
        const motoboy = await Motoboys.findOne({
            where: { cpf },
        });
        console.log(motoboy);
        if (motoboy) {
            if (motoboy == "")
                res.status(404).json({ msg: "Motoboy não encontrado." });
            else 
                res.status(200).json({ motoboy });
        } else
            res.status(404).json({ msg: "Motoboy não encontrado." });
    },

    async updateMotoboy(req, res) {
        const motoboyId = req.body.id;
        const motoboy = req.body;
        if (!motoboyId)
            res.status(400).json({ msg: "ID do motoboy vazio." });
        else {
            const motoboyExists = await Motoboys.findByPk(motoboyId);
            if (!motoboyExists)
                res.status(404).json({ msg: "Motoboy não encontrado." });
            else {
                if (motoboy.name || motoboy.cpf || motoboy.password || motoboy.phone) {
                    await Motoboys.update(motoboy, {
                        where: { id: motoboyId },
                    });
                    return res.status(200).json({ msg: "Motoboy atualizado com sucesso." });
                } else 
                    res.status(400).json({ msg: "Campos obrigatórios não preenchidos." });
            }
        }
    },

    async deleteMotoboy(req, res) {
        const motoboyId = req.params.id;
        const deleteMotoboy = await Motoboys.destroy({
            where: { id: motoboyId },
        });
        if (deleteMotoboy != 0)
            res.status(200).json({ msg: "Motoboy excluido com sucesso." });
        else
            res.status(404).json({ msg: "Motoboy não encontrado." });
    },

    logout(req, res) {
		process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
		res.sendStatus(200);
	},
}