const Associados = require("../models/Associados");
const Clientes = require("../models/Clientes");
const Motoboys = require("../models/Motoboys");
const Entregas = require("../models/Entregas");
const Sequelize = require("sequelize");

module.exports = {

    async newCliente(req, res) {
        const { name, cnpj, address } = req.body;
        if (!name || !cnpj || !address) {
            res.status(400).json({
                msg: "Dados obrigatórios não foram preenchidos.",
            });
        }

        const isClienteNew = await Clientes.findOne({
            where: { cnpj },
        });

        if (isClienteNew)
            res.status(403).json({ msg: "Cliente já foi cadastrado." });
        else {
            const cliente = await Clientes.create({
                name,
                cnpj,
                address,
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possível inserir os dados." });
            });
            if (cliente)
                res.status(201).json({ msg: "Novo motoboy foi adicionado." });
            else
                res.status(404).json({ msg: "Não foi possível cadastrar novo cliente." });
        }
    },

    async listAllCliente(req, res) {
        const cliente = await Associados.findAll({
            order: [["name", "ASC"]],
        }).catch((error) => {
            res.status(500).json({ msg: "Falha na conexão." });
        });
        if (cliente)
            res.status(200).json({ cliente });
        else
            res.status(404).json({ msg: "Não foi possível encontrar clientes." });
    },

    async searchClienteByCNPJ(req, res) {
        const cnpj = req.body.cnpj;
        if (!cnpj)
            res.status(400).json({ msg: "Parâmetro CNPJ está vazio." });
        const cliente = await Clientes.findOne({
            where: { cnpj },
        });
        console.log(cliente);
        if (cliente) {
            if (cliente == "")
                res.status(404).json({ msg: "Cliente não encontrado." });
            else 
                res.status(200).json({ cliente });
        } else
            res.status(404).json({ msg: "Cliente não encontrado." });
    },

    async updateCliente(req, res) {
        const clienteId = req.body.id;
        const cliente = req.body;
        if (!clienteId)
            res.status(400).json({ msg: "ID do cliente vazio." });
        else {
            const clienteExists = await Clientes.findByPk(clienteId);
            if (!clienteExists)
                res.status(404).json({ msg: "Cliente não encontrado." });
            else {
                if (cliente.name || cliente.cnpj || cliente.address) {
                    await Clientes.update(cliente, {
                        where: { id: clienteId },
                    });
                    return res.status(200).json({ msg: "Cliente atualizado com sucesso." });
                } else 
                    res.status(400).json({ msg: "Campos obrigatórios não preenchidos." });
            }
        }
    },

    async deleteCliente(req, res) {
        const clienteId = req.body.id;
        const deleteCliente = await Clientes.destroy({
            where: { id: clienteId },
        });
        if (deleteCliente != 0)
            res.status(200).json({ msg: "Cliente excluido com sucesso." });
        else
            res.status(404).json({ msg: "Cliente não encontrado." });
    },
}