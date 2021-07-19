const Associados = require("../models/Associados");
const Clientes = require("../models/Clientes");
const Motoboys = require("../models/Motoboys");
const Entregas = require("../models/Entregas");
const Sequelize = require("sequelize");

module.exports = {
  async newEntrega(req, res) {
    const { description, clienteId, motoboyId } = req.body;
    if (!description || !clienteId || !motoboyId) {
      res.status(400).json({ msg: "Dados obrigatórios não foram preenchidos." });
    }

    const isEntregaNew = await isEntregaNew.findOne({
      where: { description },
    });

    if (isEntregaNew)
      res.status(403).json({ msg: "Entrega já foi cadastrada." });
    else {
      const entrega = await Entregas.create({
        description,
        clienteId,
        motoboyId,
      }).catch((error) => {
        res.status(500).json({ msg: "Não foi possível inserir os dados." });
      });
      if (entrega)
        res.status(201).json({ msg: "Nova entrega foi adicionada." });
      else
        res.status(404).json({ msg: "Não foi possível cadastrar nova entrega." });
    }
  },

  async listAllEntrega(req, res) {
    const entrega = await Entregas.findAll({
      order: [["id", "ASC"]],
    }).catch((error) => {
      res.status(500).json({ msg: "Falha na conexão." });
    });
    if (entrega)
      res.status(200).json({ entrega });
    else
      res.status(404).json({ msg: "Não foi possível encontrar entregas." });
  },

  async listEntregaReal(req, res) {
    const entrega = await Entregas.findAll({
      order: [["status"]],
    });
    if (entrega) {
      if (entrega == "Realizado")
        res.status(404).json({ msg: "Entrega não encontrada" });
      else
        res.status(200).json({ entrega });
    } else
      res.status(404).json({ msg: "Entrega não encontrada." });
  },

  async listEntregaPend(req, res) {
    const entrega = await Entregas.findAll({
      order: [["status"]],
    });
    if (entrega) {
      if (entrega == "Pendente")
        res.status(404).json({ msg: "Entrega não encontrada" });
      else
        res.status(200).json({ entrega });
    } else
      res.status(404).json({ msg: "Entrega não encontrada." });
  },

  async searchEntregaByMotoboy(req, res) {
    const motoboyId = req.params.motoboyId;
    if (!motoboyId)
      res.status(400).json({ msg: "Campo vendedor vazio." });
    const entregas = await Motoboys.findAll({
      where: { motoboyId },
    }).catch((error) =>
      res.status(500).json({ msg: "Falha na conexão." }));
    if (entregas) {
      if (entregas == "")
        res.status(404).json({ msg: "Não há vendas para este motoboy." });
      else
        res.status(200).json({ entregas });
    } else
      res.status(404).json({ msg: "Não foi possível encontrar entregas." });
  },

  async updateEntregaPend(req, res) {
    const entregaId = req.body.id;
    const entrega = req.body;
    const status = req.body.status;
    if (!entregaId)
        res.status(400).json({ msg: "ID da entrega vazia." });
    else if (status != "Pendente")
        res.status(404).json({ msg: "Não existe entregas pendentes." })
    else {
        const associadoExists = await Entregas.findByPk(entregaId);
        if (!associadoExists)
            res.status(404).json({ msg: "Entrega não encontrada." });
        else {
            if (entrega.entregaDate || entrega.description || entrega.motoboyId || entrega.clienteId || entrega.associadoId) {
                await Entregas.update(entrega, {
                    where: { id: entregaId },
                });
                return res.status(200).json({ msg: "Entrega atualizada com sucesso." });
            } else 
                res.status(400).json({ msg: "Campos obrigatórios não preenchidos." });
        }
    }
   },
  
  async deleteEntrega(req, res) {
    const entregaId = req.params.id;
    const deleteEntrega = await Entregas.destroy({
      where: { id: entregaId },
    });
    if (deleteEntrega != 0)
      res.status(200).json({ msg: "Entrega excluido com sucesso." });
    else
      res.status(404).json({ msg: "Entrega não encontrado." });
  },
};
