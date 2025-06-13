<?php

require_once __DIR__ . '/Conexao.php';

class Usuario {
    private $pdo;

    public function __construct() {
        $this->pdo = Conexao::getConexao();
    }

    public function cadastrar($nome, $sobrenome, $email, $senha) {
        if (empty($nome) || empty($sobrenome) || empty($email) || empty($senha)) {
            return ["erro" => "Todos os campos são obrigatórios."];
        }

        if (strlen($senha) < 6) {
            return ["erro" => "A senha deve ter no mínimo 6 caracteres."];
        }

        $nome = htmlspecialchars(trim($nome));
        $sobrenome = htmlspecialchars(trim($sobrenome));
        $email = trim($email);

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ["erro" => "Email inválido."];
        }

        $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetchColumn() > 0) {
            return ["erro" => "Este e-mail já está cadastrado."];
        }

        try {
            $stmt = $this->pdo->prepare(
                "INSERT INTO usuarios (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)"
            );
            $stmt->execute([$nome, $sobrenome, $email, $senhaHash]);
            return ["sucesso" => true];
        } catch (PDOException $e) {
            return ["erro" => "Erro ao cadastrar: " . $e->getMessage()];
        }
    }

    public function login($email, $senha) {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
            $stmt->execute([$email]);
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($usuario && password_verify($senha, $usuario['senha'])) {
                return [
                    "sucesso" => true,
                    "nome" => $usuario['nome'],
                    "email" => $usuario['email']
                ];
            } else {
                return ["erro" => "Email ou senha incorretos."];
            }
        } catch (PDOException $e) {
            return ["erro" => "Erro no servidor: " . $e->getMessage()];
        }
    }

public function atualizar($email, $novosDados) {
    try {
        $campos = [];
        $valores = [];

        if (!empty($novosDados['nome'])) {
            $campos[] = "nome = ?";
            $valores[] = htmlspecialchars(trim($novosDados['nome']));
        }
        if (!empty($novosDados['sobrenome'])) {
            $campos[] = "sobrenome = ?";
            $valores[] = htmlspecialchars(trim($novosDados['sobrenome']));
        }
        if (!empty($novosDados['senha'])) {
            if (strlen($novosDados['senha']) < 6) {
                return ["erro" => "A senha deve ter no mínimo 6 caracteres."];
            }
            $campos[] = "senha = ?";
            $valores[] = password_hash($novosDados['senha'], PASSWORD_DEFAULT);
        }

        if (empty($campos)) {
            return ["erro" => "Nenhum dado para atualizar."];
        }

        $valores[] = $email;
        $sql = "UPDATE usuarios SET " . implode(", ", $campos) . " WHERE email = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($valores);

        return ["sucesso" => true];
    } catch (PDOException $e) {
        return ["erro" => "Erro ao atualizar: " . $e->getMessage()];
    }
}
// ...código existente...


// ...código existente...
}