<?php

use Kirby\Data\Data;

$id = 'blog';

return [
    'props' => [
        'id'       => $id,
        'url'      => $url . '/' . $id,
        'template' => 'blog'
    ],
    'data' => Data::read(__DIR__ . '/blog.txt'),
    'children' => [
        require 'content-in-kirby/article.php',
        require 'extending-kirby/article.php',
        require 'licensing-kirby/article.php',
    ]
];
