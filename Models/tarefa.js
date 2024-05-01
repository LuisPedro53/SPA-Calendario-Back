const { poolPromise } = require("../db.js");
const sql = require("mssql");

async function getTarefas(filter) {
  try {
    const pool = await poolPromise;

    if (!pool) {
      throw new Error("Erro: pool é undefined");
    }

    const databaseCheckQuery = `
      IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'Tarefas')
      BEGIN
        CREATE DATABASE Tarefas;
      END
      `;

    await pool.request().query(databaseCheckQuery);
    await pool.request().query("USE Tarefas");

    const tableCheckQuery = `
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Tarefas')
    BEGIN
        CREATE TABLE [dbo].Tarefas (
            [cdTarefa] int IDENTITY(1,1) PRIMARY KEY NOT NULL,
            [nmTitulo] varchar(250) NOT NULL,
            [nmDescricao] varchar(250) NOT NULL,
            [dtTarefa] date NOT NULL,
            [horaTarefa] time NOT NULL,
            [tempoTarefa] int NOT NULL
        );
    END`;
    await pool.request().query(tableCheckQuery);

    let query = "SELECT * FROM Tarefas WHERE 1=1";
    const parameters = {};

    if (filter.nmTitulo) {
      query += " AND nmTitulo LIKE @nmTitulo";
      parameters.nmTitulo = "%" + filter.nmTitulo + "%";
    }

    const request = pool.request();
    for (const [key, value] of Object.entries(parameters)) {
      request.input(key, sql.VarChar, value);
    }

    const result = await request.query(query);

    if (!result || !result.recordset) {
      throw new Error("Nenhuma tarefa encontrada na consulta");
    }

    return result.recordset;
  } catch (err) {
    console.error("Erro ao obter tarefas", err);
    throw err;
  }
}

async function createTarefa(tarefa) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("nmTitulo", sql.VarChar, tarefa.nmTitulo)
      .input("nmDescricao", sql.VarChar, tarefa.nmDescricao)
      .input("dtTarefa", sql.Date, tarefa.dtTarefa)
      .input("horaTarefa", sql.Time, tarefa.horaTarefa)
      .input("tempoTarefa", sql.Int, tarefa.tempoTarefa)
      .query(
        "INSERT INTO Tarefas (nmTitulo, nmDescricao, dtTarefa, horaTarefa, tempoTarefa) VALUES (@nmTitulo, @nmDescricao, @dtTarefa, @horaTarefa, @tempoTarefa)"
      );

    const queryResult = await pool
      .request()
      .query("SELECT TOP 1 * FROM Tarefas ORDER BY cdTarefa DESC");

    return queryResult.recordset[0];
  } catch (err) {
    console.error("Erro ao criar tarefa", err.message);
    throw new Error("Falha ao criar tarefa: " + err.message);
  }
}

async function updateTarefa(cdTarefa, tarefa) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("cdTarefa", sql.VarChar, cdTarefa)
      .input("nmTitulo", sql.VarChar, tarefa.nmTitulo)
      .input("nmDescricao", sql.VarChar, tarefa.nmDescricao)
      .input("dtTarefa", sql.Date, tarefa.dtTarefa)
      .input("horaTarefa", sql.Time, tarefa.horaTarefa)
      .input("tempoTarefa", sql.Int, tarefa.tempoTarefa)
      .query(
        "UPDATE Tarefas SET nmTitulo = @nmTitulo, nmDescricao = @nmDescricao, dtTarefa = @dtTarefa, horaTarefa = @horaTarefa, tempoTarefa = @tempoTarefa WHERE cdTarefa = @cdTarefa"
      );

    const queryResult = await pool
      .request()
      .input("cdTarefa", sql.VarChar, cdTarefa)
      .query("SELECT * FROM Tarefas WHERE cdTarefa = @cdTarefa");

    return queryResult.recordset[0];
  } catch (err) {
    console.error("Erro ao atualizar tarefa", err.message);
    throw new Error("Falha ao atualizar tarefa: " + err.message);
  }
}

async function deleteTarefa(cdTarefa) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("cdTarefa", sql.VarChar, cdTarefa)
      .query("DELETE FROM Tarefas WHERE cdTarefa = @cdTarefa");

    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error("Erro ao deletar tarefa", err.message);
    throw new Error("Falha ao deletar tarefa: " + err.message);
  }
}

module.exports = { getTarefas, createTarefa, updateTarefa, deleteTarefa };
