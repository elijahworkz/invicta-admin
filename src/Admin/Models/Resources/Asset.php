<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Resources;

use Eteacher\InvictaAdmin\Admin\Components\Column;
use Eteacher\InvictaAdmin\Admin\Models\Asset as AssetModel;
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

    public $search = ['name', 'path'];

    public function indexResource($request)
    {
        return [
            'name' => $this->inlineAsset($this)->toHtml(),
            'dimensions' => $this->width.' x '.$this->height,
            'size' => $this->size_human,
            'type' => $this->type,
            'created_at' => $this->created_at->toFormattedDateString(),
            'src' => $this->src(),
            'path' => $this->path,
            'img_name' => $this->name,
            'id' => $this->id,
            'width' => $this->width,
            'height' => $this->height,
            'alt' => $this->alt,
        ];
    }

    public function inlineAsset($item)
    {
        return new HtmlString(<<<HTML
            <div class="asset-inline">
                <img class="thumbnail" src="{$item->src()}"/> {$item->name}
            </div>
        HTML);
    }

    private function assetPreview($item)
    {
        return new HtmlString(<<<HTML
            <div class="text-center">
                <div class="image-transparent-back">
                    <img src="{$item->src()}" :alt="{$item->alt}" />
                </div>
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
            'created_at' => Column::make('Uploaded')->sortable(),
        ];
    }

    public function blueprint($item = null)
    {
        return [
            'fields' => [
                [
                    'id' => 'alt',
                    'type' => 'text',
                    'props' => [
                        'placeholder' => 'Specify Alt attribute for the image',
                    ],
                ],
                [
                    'type' => 'infoPanel',
                    'content' => $this->assetPreview($item)->toHtml(),
                ],
            ],
        ];
    }

    public function actions()
    {
        return AssetModel::$resourceActions;
    }
}
