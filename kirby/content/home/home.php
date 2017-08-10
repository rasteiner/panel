<?php

use Kirby\Data\Data;

$id = 'home';

return [
    'props' => [
        'id'       => $id,
        'url'      => $url,
        'template' => 'home'
    ],
    'data' => Data::read(__DIR__ . '/home.txt')
];
