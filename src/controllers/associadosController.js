const Associados = require("../models/Associados");
const Clientes = require("../models/Clientes");
const Motoboys = require("../models/Motoboys");
const Entregas = require("../models/Entregas");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
// const { search } = require("../routes/associadosRouter");
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
		const cnpj = req.body.cnpj;
		const password = req.body.password;
		if (!cnpj || !password)
			return res.status(400).json({ msg: "Campos obrigatórios vazios!" });
		try {
			const associado = await Associados.findOne({
				where: { cnpj },
			});
			if (!associado)
				return res.status(404).json({ msg: "Usuário ou senha inválidos." });
			else {
				if (bcrypt.compareSync(password, associado.password)) {
					const token = generateToken(associado.id);
					return res.status(200).json({ msg: "Autenticado com sucesso", token });
				} else
					return res.status(404).json({ msg: "Usuário ou senha inválidos." });
			}
		} catch (error) { 
            res.status(500).json({error});
		}
	},
    async newAssociado(req, res) {
        const { name, cnpj, password, address } = req.body;
        if (!name || !cnpj || !password) {
            res.status(400).json({
                msg: "Dados obrigatórios não foram preenchidos.",
            });
        }

        const passwordValid = passwordValidation(password);
        if (password !== "OK")
            return res.status(400).json({ passwordValid });

        const isAssociadosNew = await Associados.findOne({
            where: { cnpj },
        });

        if (isAssociadosNew)
            res.status(403).json({ msg: "Associado já foi cadastrado." });
        else {
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(password, salt);

            const associado = await Associados.create({
                name,
                cnpj,
                password: hash,
                address,
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possível inserir os dados." });
            });
            if (associado)
                res.status(201).json({ msg: "Novo associado foi adicionado." });
            else
                res.status(404).json({ msg: "Não foi possível cadastrar novo associado." });
        }
    },

    async listAllAssociados(req, res) {
        const associado = await Associados.findAll({
            order: [["name", "ASC"]],
        }).catch((error) => {
            res.status(500).json({ msg: "Falha na conexão." });
        });
        if (associado)
            res.status(200).json({ associado });
        else
            res.status(404).json({ msg: "Não foi possível encontrar associados." });
    },

    async searchAssociadoByCNPJ(req, res) {
        const cnpj = req.body.cnpj;
        if (!cnpj)
            res.status(400).json({ msg: "Parâmetro CNPJ está vazio." });
        const associado = await Associados.findOne({
            where: { cnpj },
        });
        console.log(associado);
        if (associado) {
            if (associado == "")
                res.status(404).json({ msg: "Associado não encontrado." });
            else 
                res.status(200).json({ associado });
        } else
            res.status(404).json({ msg: "Associado não encontrado." });    
    },

    async updateAssociado(req, res) {
        const associadoId = req.body.id;
        const associado = req.body;
        if (!associadoId)
            res.status(400).json({ msg: "ID do associado vazio." });
        else {
            const associadoExists = await Associados.findByPk(associadoId);
            if (!associadoExists)
                res.status(404).json({ msg: "Associado não encontrado." });
            else {
                if (associado.name || associado.cnpj || associado.password) {
                    await Associados.update(associado, {
                        where: { id: associadoId },
                    });
                    return res.status(200).json({ msg: "Associado atualizado com sucesso." });
                } else 
                    res.status(400).json({ msg: "Campos obrigatórios não preenchidos." });
            }
        }
    },

    async deleteAssociado(res, req) {
        const associadoId = req.params.id;
        const deleteAssociado = await Associados.destroy({
            where: { id: associadoId },
        });
        if (deleteAssociado != 0)
            res.status(200).json({ msg: "Associado excluido com sucesso." });
        else
            res.status(404).json({ msg: "Associado não encontrado." });
    },

    logout(req, res) {
		process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
		res.sendStatus(200);
	},
};