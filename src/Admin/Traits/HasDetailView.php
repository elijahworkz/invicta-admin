<?php

namespace Elijahworkz\InvictaAdmin\Admin\Traits;

trait HasDetailView
{
    protected function showDetail()
    {
        return true;
    }

    public function detailBlueprint($item)
    {
        return [];
    }

    public function detailTitle($item)
    {
        return <<<HTML
			<h1>{$item[$this->titleField]}</h1>
		HTML;
    }

    public function detailInfo($item)
    {
        return $item->created_at->diffForHumans();
    }
}
