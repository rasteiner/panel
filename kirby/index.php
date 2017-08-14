<?php

require 'vendor/autoload.php';

use Kirby\Api\Api;
use Kirby\Cms\Site;
use Kirby\Http\Request;
use Kirby\Http\Response\Json;
use Kirby\Users\Users;
use Kirby\Users\User;

$url = 'http://localhost:8000';

// load all users
$users = new Users([
    new User(require __DIR__ . '/site/accounts/bastian.php'),
    new User(require __DIR__ . '/site/accounts/lukas.php'),
    new User(require __DIR__ . '/site/accounts/fabian.php'),
    new User(require __DIR__ . '/site/accounts/nico.php'),
    new User(require __DIR__ . '/site/accounts/sonja.php')
]);

$request = new Request;
$site    = new Site(require 'content/site.php');
$api     = new Api([
    'query' => $request->body()->get('query'),
    'variables' => $request->body()->get('variables'),
    'data'      => [
        'site'  => $site,
        'users' => $users
    ]
]);

header('Access-Control-Allow-Origin: *');

echo (new Json($api->result()));
