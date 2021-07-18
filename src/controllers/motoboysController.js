const Associados = require("../models/Associados");
const Clientes = require("../models/Clientes");
const Motoboys = require("../models/Motoboys");
const Entregas = require("../models/Entregas");
const Sequelize = require("sequelize");

module.exports = {

    async newMotoboy(req, res) {
        const { name, cpf, password, phone } = req.body;
        if (!name || !cpf || !password || !phone) {
            res.status(400).json({
                msg: "Dados obrigatórios não foram preenchidos.",
            });
        }

        const isMotoboyNew = await Motoboys.findOne({
            where: { cpf },
        });

        if (isMotoboyNew)
            res.status(403).json({ msg: "Motoboy já foi cadastrado." });
        else {
            const motoboy = await Motoboys.create({
                name,
                cpf,
                password,
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
}