<?php

namespace Eteacher\InvictaAdmin\Admin\Traits;

use Eteacher\InvictaAdmin\Http\Resources\ResourceCollection;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

trait CanEditItems
{
    public function blueprint()
    {
        //
    }

    public function getBlueprint()
    {
        // Check for PHP blueprint first
        if ($blueprint = $this->blueprint()) {
            return $blueprint;
        }

        // check for json blueprint
        $folder = app_path('Invicta/Resources/blueprints');
        $name = Str::of($this->model)->classBasename();

        $path = $folder.'/'.$name.'.json';

        if (File::exists($path)) {
            return json_decode(File::get($path), true);
        }

        return null;
    }

    public function validationRules()
    {
        //
    }

    public function relatedQuery($relationship)
    {
        $paginate = request()->query('paginate', false);

        $title = request()->query('title', 'title');
        $related = App::make($this->model)->$relationship()->getRelated();

        if ($search = request()->query('search', false)) {
            $related = $related->where($title, 'like', '%'.$search.'%');
        }

        if (! $paginate) {
            return $related->pluck($title, 'id');
        }

        $perPage = request()->query('per_page', 10);
        $sortBy = request()->query('sort_by', 'id');
        $sortBy = $sortBy == 'title' ? $title : $sortBy;
        $sortOrder = request()->query('sort_order', 'desc');
        $exclude = request()->query('exclude', []);

        $result = $related
            ->select('id', "{$title} as title", 'created_at')
            ->whereNotIn('id', $exclude)
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage)
            ->withQueryString();

        return ResourceCollection::collection($result)
            ->additional([
                'params' => [
                    'paginate' => true,
                    'title' => $title,
                    'exclude' => $exclude,
                ],
                'handle' => $this->handle(),
            ]);
    }
}
