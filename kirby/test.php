<?php

require 'vendor/autoload.php';

use Kirby\Cms\Site;

$url  = 'http://localhost:8000';
$site = new Site(require 'content/site.php');

var_dump($site->children()->find('projects/project-a')->parents());
