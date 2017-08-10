<?php

require 'vendor/autoload.php';

use Kirby\Cms\Site;

$site = new Site(require 'content/site.php');

var_dump($site->children()->find('about')->children()->nth(2)->files());
