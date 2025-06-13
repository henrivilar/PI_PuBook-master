<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once __DIR__ . '/classes/usuario.php';

// Recebe os dados enviados pelo frontend
$dados = json_decode(file_get_contents('php://input'), true);

if (
    !$dados ||
    !isset($dados['email']) ||
    (!isset($dados['nome']) && !isset($dados['sobrenome']) && !isset($dados['senha']))
) {
    echo json_encode(["erro" => "Dados insuficientes."]);
    exit;
}

// Monta apenas os campos permitidos
$novosDados = [];
if (isset($dados['nome'])) $novosDados['nome'] = $dados['nome'];
if (isset($dados['sobrenome'])) $novosDados['sobrenome'] = $dados['sobrenome'];
if (isset($dados['senha'])) $novosDados['senha'] = $dados['senha'];

$usuario = new Usuario();
$resposta = $usuario->atualizar($dados['email'], $novosDados);

echo json_encode($resposta);