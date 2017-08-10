<?php

return [
    'props' => [
        'id'       => 'projects/project-a',
        'url'      => $url . '/projects/project-a',
        'template' => 'project'
    ],
    'data' => [
        'title'    => 'Project A',
        'year'     => 2017,
        'category' => 'architecture',
        'text'     => 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.'
    ],
    'files' => [
        require 'closeup.jpg.php',
        require 'creative-tools.jpg.php',
        require 'folding-rule.jpg.php',
    ]
];
