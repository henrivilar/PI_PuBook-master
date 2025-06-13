import { useState, FormEvent } from "react";

import { useEffect } from "react";
import { useRouter } from "next/router";

// ...restante do código...

export function EditarPerfilAuth() {
  const router = useRouter();

  useEffect(() => {
    const logado = localStorage.getItem('usuarioLogado')
    if (logado !== 'true') {
      router.push('/login')
    }
   }, []);
  // ...restante do componente...
}

export default function EditarPerfil() {
  const [email, setEmail] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [mensagem, setMensagem] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const resposta = await fetch("http://localhost/PI_PuBook-master/backend/atualizar.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, nome, sobrenome, senha }),
    });

    const dados = await resposta.json();
    if (dados.sucesso) {
      setMensagem("Dados atualizados com sucesso!");
    } else {
      setMensagem(dados.erro || "Erro ao atualizar.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Editar Perfil</h2>
      <input
        type="email"
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />
      <input
        type="text"
        placeholder="Novo nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />
      <input
        type="text"
        placeholder="Novo sobrenome"
        value={sobrenome}
        onChange={(e) => setSobrenome(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />
      <input
        type="password"
        placeholder="Nova senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />
      <button type="submit" style={{ width: "100%" }}>Atualizar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
}