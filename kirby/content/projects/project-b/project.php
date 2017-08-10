<?php

return [
    'props' => [
        'id'       => 'projects/project-b',
        'url'      => $url . '/projects/project-b',
        'template' => 'project'
    ],
    'data' => [
        'title'    => 'Project B',
        'year'     => 2016,
        'category' => 'photography',
        'text'     => 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.'
    ],
    'files' => [
        require 'room.jpg.php',
        require 'table.jpg.php',
    ]
];
