<?php

return [
    [
        'id' => 'seo',
        'type' => 'json',
        'prepopulate' => true,
        'fields' => [
            [
                'id' => 'advanced',
                'type' => 'divider',
                'section' => true,
                'content' => [
                    'title' => 'ADVANCED',
                    'description' => 'Advanced SEO settings',
                ],
            ],
            [
                'id' => 'advanced_row',
                'type' => 'row',
                'fields' => [
                    [
                        'id' => 'noindex',
                        'type' => 'toggle',
                        'info' => 'Instruct crawlers not to index this entry, also excludes it from the sitemap.xml.',
                        'width' => '1/2',
                        'defaultValue' => false,
                    ],
                    [
                        'id' => 'nofollow',
                        'type' => 'toggle',
                        'info' => 'Instruct crawlers not to follow links on this page.',
                        'width' => '1/2',
                        'defaultValue' => false,
                    ],
                ],
            ],
            [
                'id' => 'canonical',
                'type' => 'link',
                'info' => 'If this is a page with duplicate content. Choose the original page for this content.',
                'props' => [
                    'placeholder' => 'Start typing...',
                ],
                'defaultValue' => null,
            ],
            [
                'id' => 'open_graph',
                'type' => 'divider',
                'section' => true,
                'content' => [
                    'title' => 'OPEN GRAPH',
                    'description' => 'Open Graph meta tags for social sharing',
                ],
            ],
            [
                'id' => 'og_title',
                'type' => 'text',
                'label' => 'Social title',
                'info' => 'This entries OG title, defaults to custom SEO title and title.',
            ],
            [
                'id' => 'og_description',
                'type' => 'textarea',
                'label' => 'Social description',
                'info' => 'This entries OG description, defaults to meta description.',
            ],
            [
                'id' => 'social_images',
                'type' => 'row',
                'fields' => [
                    [
                        'id' => 'og_image',
                        'type' => 'asset',
                        'label' => 'Social image',
                        'info' => 'This entries OG image. Defaults to global site OG image. The recommended size is 1200px x 630px.',
                        'width' => '1/2',
                    ],
                    [
                        'id' => 'twitter_image',
                        'type' => 'asset',
                        'label' => 'Twitter image',
                        'info' => 'This entries Twitter image. Defaults to global site Twitter image. Images should have an aspect ratio of 2:1 with minimum dimensions of 300x157.',
                        'width' => '1/2',
                    ],
                ],
            ],
        ],
    ],
];
