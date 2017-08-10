<?php

use Kirby\Data\Data;

$id = 'about';

return [
    'props' => [
        'id'       => $id,
        'url'      => $url . '/' . $id,
        'template' => 'about'
    ],
    'data' => Data::read(__DIR__ . '/about.txt'),
    'children' => [
        require 'bob-meowerly/team.php',
        require 'brad-kitt/team.php',
        require 'cat-winslet/team.php',
        require 'hunter-s-tomcat/team.php',
    ]
];
