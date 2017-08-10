<?php

return [
    'props' => [
        'id'       => 'projects',
        'url'      => '/projects',
        'template' => 'projects'
    ],
    'data' => [
        'title' => 'Projects',
        'text'  => 'This portfolio layout might be used to showcase your latest design work, a collection of your favorite recipes or maybe something completely different? All projects are subpages of the <mark>projects</mark> page and are fetched by a snippet file called <mark>showcase.php</mark>.'
    ],
    'children' => [
        require 'project-a/project.php',
        require 'project-b/project.php',
        require 'project-c/project.php',
        require 'project-d/project.php',
        require 'project-e/project.php',
    ]
];
