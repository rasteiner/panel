<?php

require 'vendor/autoload.php';

use Kirby\Api\Api;
use Kirby\Cms\Site;
use Kirby\Http\Request;
use Kirby\Http\Response\Json;

$request = new Request;
$site    = new Site(require 'content/site.php');
$api     = new Api($site, $request->body()->toArray());

header('Access-Control-Allow-Origin: *');

echo (new Json($api->result()));
