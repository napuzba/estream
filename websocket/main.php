<?php
require dirname(__FILE__) . '/vendor/autoload.php';

use App\events\EventStream;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new EventStream()
        )
    ),
    8080
);

$server->run();
