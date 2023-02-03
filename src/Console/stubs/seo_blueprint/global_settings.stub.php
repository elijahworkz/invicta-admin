<?php

return [
    'settings' => [],
    'sections' => [
        [
            'id' => 'title',
            'title' => 'Title',
            'fields' => [
                [
                    'id' => 'data',
                    'type' => 'json',
                    'fields' => [
                        [
                            'id' => 'title_separator',
                            'type' => 'select',
                            'label' => 'Separator',
                            'options' => [
                                ['value' => ' | ', 'label' => '|'],
                                ['value' => ' - ', 'label' => '-'],
                                ['value' => ' / ', 'label' => '/'],
                                ['value' => ' :: ', 'label' => '::'],
                                ['value' => ' ~ ', 'label' => '~'],
                            ],
                            'info' => 'Select the character to separate the page title and site title.',
                        ],
                        [
                            'id' => 'site_name',
                            'type' => 'text',
                            'label' => 'Website title',
                            'info' => 'The title for the website. Defaults to Laravel\'s App Name.',
                        ],
                    ],
                ],
            ],
        ],
        [
            'id' => 'social',
            'title' => 'Social',
            'fields' => [
                [
                    'id' => 'data',
                    'type' => 'json',
                    'fields' => [
                        [
                            'id' => 'social_images',
                            'type' => 'row',
                            'fields' => [
                                [
                                    'id' => 'og_image',
                                    'type' => 'asset',
                                    'label' => 'Social image',
                                    'info' => 'The default OG image. Can be overridden per entry. The recommended size is 1200px x 630px.',
                                ],
                                [
                                    'id' => 'twitter_image',
                                    'type' => 'asset',
                                    'label' => 'Twitter image',
                                    'info' => 'The default Twitter image. Can be overridden per entry. Images should have an aspect ratio of 2:1 with minimum dimensions of 300x157.',
                                ],
                            ],
                        ],
                        [
                            'id' => 'twitter_handle',
                            'type' => 'text',
                            'label' => 'Twitter handle',
                            'info' => 'The Twitter user name that should be included with Twitter Card tags.',
                        ],
                    ],
                ],
            ],
        ],
        [
            'id' => 'trackers',
            'title' => 'Trackers',
            'fields' => [
                [
                    'id' => 'data',
                    'type' => 'json',
                    'fields' => [
                        [
                            'id' => 'google_tag_manager_script',
                            'type' => 'textarea',
                            'label' => 'Google Tag Manager Script',
                            'info' => 'Add a google tag manager script to your head.',
                        ],
                        [
                            'id' => 'google_tag_manager_noscript',
                            'type' => 'textarea',
                            'label' => 'Google Tag Manager Noscript',
                            'info' => 'Add a google tag manager to your body.',
                        ],
                    ],
                ],
            ],
        ],
    ],
];
