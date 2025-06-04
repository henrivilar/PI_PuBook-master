<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once __DIR__ . '/classes/Usuario.php';

$data = json_decode(file_get_contents("php://input"), true);

if (
    empty($data['nome']) ||
    empty($data['sobrenome']) ||
    empty($data['email']) ||
    empty($data['senha']) ||
    empty($data['confirmar_senha'])
) {
    echo json_encode(["erro" => "Todos os campos são obrigatórios."]);
    exit();
}

if ($data['senha'] !== $data['confirmar_senha']) {
    echo json_encode(["erro" => "As senhas não coincidem."]);
    exit();
}

$usuario = new Usuario();
$resultado = $usuario->cadastrar(
    $data['nome'],
    $data['sobrenome'],
    $data['email'],
    $data['senha']
);

echo json_encode($resultado);
exit();