<?php

namespace Elijahworkz\InvictaAdmin\Admin\Traits;

use Elijahworkz\InvictaAdmin\Facades\Blueprint;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

trait CanEditItems
{
    /**
     * Enables edit links to open in index view instead of separate page.
     *
     * @var bool
     */
    public $indexEdit = true;

    /**
     * Enable/Disable blueprint caching on individual resource.
     *
     * @var bool
     */
    public $cacheBlueprint = true;

    /**
     * Resource can have multiple blueprints for different models
     *
     * @var bool
     */
    public $canChangeBlueprints = false;

    /**
     * Set blueprint from function.
     *
     * @param  Illuminate\Database\Eloquent\Model  $item
     * @return array
     */
    public function blueprint($item = null)
    {
        //
    }

    public function availableBlueprints()
    {
        if (! $this->canChangeBlueprints) {
            return false;
        }

        $folder = resource_path('blueprints/'.$this->handle());

        return collect(File::files($folder))->map(function ($file) {
            $blueprint = Str::of($file->getPathname())->basename()->remove('.php');

            return [
                'value' => $blueprint,
                'label' => Str::headline($blueprint),
            ];
        })->push(['value' => 'default', 'label' => 'Default']);
    }

    public function modifyBlueprint($blueprint)
    {
        return $blueprint;
    }

    public function createItem($data, $item)
    {
        return false;
    }

    public function updateItem($data, $item)
    {
        return false;
    }

    public function beforeSave($item, $action)
    {
        return $item;
    }

    public function afterSave($item, $action)
    {
        return true;
    }
}
