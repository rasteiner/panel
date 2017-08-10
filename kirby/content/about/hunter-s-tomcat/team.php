<?php

use Kirby\Data\Data;

$folder = basename(__DIR__);

return [
    'props' => [
        'id'       => $folder,
        'url'      => 'about/' . $folder,
        'template' => 'team'
    ],
    'data'  => Data::read(__DIR__ . '/team.txt'),
    'files' => [
        [
            'props' => [
                'root' => __DIR__ . '/' . $folder . '.jpg',
                'url'  => $url . '/content/about/' . $folder . '/' . $folder . '.jpg'
            ]
        ]
    ]
];

