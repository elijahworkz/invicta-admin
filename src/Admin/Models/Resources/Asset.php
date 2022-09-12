<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Resources;

use Eteacher\InvictaAdmin\Admin\Components\Column;
use Eteacher\InvictaAdmin\Admin\Resources\Resource;
use Illuminate\Support\HtmlString;

class Asset extends Resource
{
    public $model = 'Eteacher\InvictaAdmin\Admin\Models\Asset';

    /**
     * The column name that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public $titleField = 'name';

    public $indexWith;

    public $editWith;

    public $icon = 'images';

    public $search = ['name'];

    protected $routePrefix = '/';

    public function indexResource($request)
    {
        return [
            'name' => $this->inlineAsset()->toHtml(),
            'dimensions' => $this->width.' x '.$this->height,
            'size' => $this->size_human,
            'type' => $this->type,
            'created' => $this->created_at->toFormattedDateString(),
            'src' => asset($this->path),
            'img_name' => $this->name,
            'id' => $this->id,
            'width' => $this->width,
            'height' => $this->height,
            'alt' => $this->alt,
        ];
    }

    public function inlineAsset()
    {
        $url = asset($this->path);

        return new HtmlString(<<<HTML
                    <div class="asset-inline">
                        <img class="thumbnail" src="{$url}"/> {$this->name}
                    </div>
                HTML);
    }

    public function indexColumns()
    {
        return [
            'name' => Column::make('Asset')->sortable()->editLink(),
            'dimensions' => Column::make('Dimensions'),
            'size' => Column::make('Size')->sortable(),
            'alt' => Column::make('Alt'),
            'type' => Column::make('Type')->align('center'),
            'created' => Column::make('Uploaded')->sortable(),
        ];
    }
}
