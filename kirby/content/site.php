<?php

$url = 'http://localhost:8000';

return [
    'props' => [
        'url' => $url,
    ],
    'data' => [
        'title'     => 'Kirby',
        'copyright' => '2012'
    ],
    'on' => [
        'update' => function () {
            var_dump('The site has been updated');
        }
    ],
    'children' => [
        require 'home/home.php',
        require 'projects/projects.php',
        require 'blog/blog.php',
        require 'about/about.php',
        require 'contact/contact.php',
    ]
];
