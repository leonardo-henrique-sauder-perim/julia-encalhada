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
            alert("turma cadastrado com sucesso!");
            //document.getElementById('turma').reset();
        } else {
            alert(`Erro: ${result.message}`);
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao cadastrar turma");
    }
}

// Função para listar todos as turmas
async function listarturma() {
    const nome_turma = document.getElementById("turma-nome").value.trim();
    const codigo = document.getElementById("turma-codigo").value.trim();
    const turno = document.getElementById("turma-turno").value.trim();
    const curso = document.getElementById("turma-curso").value.trim();
    const ano = document.getElementById("turma-ano").value.trim();
    const ano_letivo = document.getElementById("turma-ano-letivo").value.trim();
    const capacidade = document.getElementById("turma-capacidade").value.trim();
    const sala = document.getElementById("turma-sala").value.trim();
    const coordenador = document.getElementById("turma-coordenador").value.trim();
    const observacao = document.getElementById("turma-observacoes").value.trim();

    let url = "/turma"; // URL padrão

    if (codigo) {
        url += `?codigo=${codigo}`;
    }

    try {
        const response = await fetch(url);
        if (!respo.ok) throw new Error(`Erro HTTP: ${respo.status}`);
        const turma = await respo.json();

        const tabela = document.getElementById("tabela-turma");
        tabela.innerHTML = "";

        if (!Array.isArray(turma) || turma.length === 0) {
            tabela.innerHTML =
                '<tr><td colspan="8">Nenhum turma encontrado.</td></tr>';
        } else {
            turma.forEach((turmaItem) => {
                const linha = document.createElement("tr");
                linha.innerHTML = `
                    <td>${turmaItem.nome_turma}</td>
                    <td>${turmaItem.codigo}</td>
                    <td>${turmaItem.curso}</td>
                    <td>${turmaItem.ano}</td>
                    <td>${turmaItem.sala}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error("Erro ao listar ata:", error);
    }
}

// Função para atualizar as informações da ata
async function atualizarturma() {
    const codigo = document.getElementById("turma-codigo").value;
     const ano = document.getElementById("turma-ano").value;
    
    if (!codigo) {
        alert("Informe o Codigo para atualizar a turma.");
        return;
    }

    const turmaAtualizado = {
        nome_turma,
        codigo,
        turno,
        curso,
        ano,
        ano_letivo,
        capacidade,
        sala,
        coordenador
    };

    try {
        const response = await fetch(`/turma/codigo/${codigo}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(turmaAtualizado),
        });

        if (respo.ok) {
            alert("turma atualizada com sucesso!");
        } else {
            const errorMessage = await respo.text();
            alert("Erro ao atualizar turma: " + errorMessage);
        }
    } catch (error) {
        console.error("Erro ao atualizar turma:", error);
        alert("Erro ao atualizar turma.");
    }
}
