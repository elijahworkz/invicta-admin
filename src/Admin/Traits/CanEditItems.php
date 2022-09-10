<?php

namespace Eteacher\InvictaAdmin\Admin\Traits;

use Eteacher\InvictaAdmin\Facades\Blueprint;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

trait CanEditItems
{
    public $canChangeBlueprints = false;

    /**
     * Set blueprint from function.
     *
     * @param Illuminate\Database\Eloquent\Model $item
     * @return array
     */
    public function blueprint($item = null)
    {
        //
    }

    // public function getBlueprint($item = null)
    // {
    //     return $this->postProcessBlueprint(Blueprint::findForResource($this, $item));
    // }

    // public function findBlueprint($handle)
    // {
    //     return $this->postProcessBlueprint(Blueprint::findByHandle($this, $handle));
    // }

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
                'label' => Str::of($blueprint)->ucfirst(),
            ];
        })->push(['value' => 'default', 'label' => 'Default']);
    }

    public function postProcessBlueprint($blueprint)
    {
        return $blueprint;
    }

    public function beforeSave($item)
    {
        return $item;
    }
}
