<?php

namespace Eteacher\InvictaAdmin\Admin\Traits;

trait EnableSeo
{
    public $enableSeo = true;

    public function getSeoBlueprintForResource()
    {
        return [
            'id' => 'seo',
            'title' => 'SEO',
            'fields' => [
                [
                    'fieldset' => 'seo',
                ],
            ],
        ];
    }
}
