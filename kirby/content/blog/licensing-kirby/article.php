<?php

use Kirby\Data\Data;

$folder = basename(__DIR__);
$id     = 'blog/' . $folder;

return [
    'props' => [
        'id'       => $id,
        'url'      => $url . '/' . $id,
        'template' => 'article'
    ],
    'data'  => Data::read(__DIR__ . '/article.txt'),
    'files' => [
        [
            'props' => [
                'root' => __DIR__ . '/licensing.png',
                'url'  => $url . '/content/blog/' . $folder . '/licensing.png'
            ]
        ]
    ]
];

