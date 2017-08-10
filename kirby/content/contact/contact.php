<?php

use Kirby\Data\Data;

$id = 'contact';

return [
    'props' => [
        'id'       => $id,
        'url'      => $url . '/' . $id,
        'template' => 'contact'
    ],
    'data' => Data::read(__DIR__ . '/contact.txt'),
];
