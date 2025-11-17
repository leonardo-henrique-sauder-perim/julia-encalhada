async function cadastrarturma(event) {
  event.preventDefault();
  const turma = {
      nome_turma: document.getElementById("turma-nome").value,
      codigo: document.getElementById("turma-codigo").value,
      turno: document.getElementById("turma-turno").value,
      curso: document.getElementById("turma-curso").value,
      ano: document.getElementById("turma-ano").value,
      ano_letivo: document.getElementById("turma-ano-letivo").value,
      capacidade: document.getElementById("turma-capacidade").value,
      sala: document.getElementById("turma-sala").value,
      coordenador: document.getElementById("turma-coordenador").value,
      observacao: document.getElementById("turma-observacoes").value,
  };

  try {
      const response = await fetch("/turma", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(turma),
      });

      const result = await response.json();
      if (response.ok) {
          alert("Turma cadastrada com sucesso!");
          document.getElementById('form-turma').reset();
      } else {
          alert(`Erro: ${result.error}`);
      }
  } catch (err) {
      console.error("Erro na solicitação:", err);
      alert("Erro ao cadastrar turma");
  }
}

// Função para listar todas as turmas CORRIGIDA
async function listarturma() {
  const codigo = document.getElementById("turma-codigo").value.trim();

  let url = "/turma";
  if (codigo) {
      url += `?codigo=${encodeURIComponent(codigo)}`;
  }

  try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
      const turmas = await response.json();

      const tabela = document.getElementById("tabela-turma");
      tabela.innerHTML = "";

      if (!Array.isArray(turmas) || turmas.length === 0) {
          tabela.innerHTML = '<tr><td colspan="5">Nenhuma turma encontrada.</td></tr>';
      } else {
          turmas.forEach((turmaItem) => {
              const linha = document.createElement("tr");
              linha.innerHTML = `
                  <td>${turmaItem.nome_turma || ''}</td>
                  <td>${turmaItem.codigo || ''}</td>
                  <td>${turmaItem.ano || ''}</td>
                  <td>${turmaItem.curso || ''}</td>
                  <td>${turmaItem.ano_letivo || ''}</td>
              `;
              tabela.appendChild(linha);
          });
      }
  } catch (error) {
      console.error("Erro ao listar turmas:", error);
      alert("Erro ao carregar turmas");
  }
}

// Função para atualizar as informações da turma CORRIGIDA
async function atualizarturma() {
  const codigo = document.getElementById("turma-codigo").value;

  if (!codigo) {
      alert("Informe o Código para atualizar a turma.");
      return;
  }

  const turmaAtualizado = {
      nome_turma: document.getElementById("turma-nome").value,
      turno: document.getElementById("turma-turno").value,
      curso: document.getElementById("turma-curso").value,
      ano: document.getElementById("turma-ano").value,
      ano_letivo: document.getElementById("turma-ano-letivo").value,
      capacidade: document.getElementById("turma-capacidade").value,
      sala: document.getElementById("turma-sala").value,
      coordenador: document.getElementById("turma-coordenador").value,
      observacao: document.getElementById("turma-observacoes").value
  };

  try {
      const response = await fetch(`/turma/${codigo}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(turmaAtualizado),
      });

      if (response.ok) {
          alert("Turma atualizada com sucesso!");
      } else {
          const errorMessage = await response.text();
          alert("Erro ao atualizar turma: " + errorMessage);
      }
  } catch (error) {
      console.error("Erro ao atualizar turma:", error);
      alert("Erro ao atualizar turma.");
  }
}

// Função para limpar o formulário
function limparturma() {
  document.getElementById('form-turma').reset();
}