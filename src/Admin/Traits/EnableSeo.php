<?php

namespace Eteacher\InvictaAdmin\Admin\Traits;

trait EnableSeo
{
    public function getSeoSectionBlueprint()
    {
        $seoTitleSeparator = global_set('seo', 'title_separator');
        $seoSiteName = global_set('seo', 'site_name');

        return [
            'id' => 'seo',
            'title' => 'SEO',
            'fields' => [
                [
                    'id' => 'seo',
                    'type' => 'json',
                    'fields' => [
                        [
                            'id' => 'base',
                            'type' => 'divider',
                            'section' => true,
                            'content' => [
                                'title' => 'BASE',
                                'description' => 'Basic SEO settings',
                            ],
                        ],
                        [
                            'id' => 'title',
                            'type' => 'meta',
                            'props'=> [
                                'postfix' => $seoTitleSeparator.$seoSiteName,
                                'source' => $this->titleField,
                            ],
                        ],
                        [
                            'id' => 'description',
                            'type' => 'meta',
                            'props'=> [
                                'length_normal' => '50',
                                'length_max' => '300',
                            ],
                        ],
                        [
                            'id' => 'google_preview',
                            'type' => 'googlePreview',
                        ],
                    ],
                ],
                [
                    'fieldset' => 'seo',
                ],
            ],
        ];
    }
}