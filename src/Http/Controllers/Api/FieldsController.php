<?php

namespace Elijahworkz\InvictaAdmin\Http\Controllers\Api;

use Elijahworkz\InvictaAdmin\Admin\Models\Asset;
use Elijahworkz\InvictaAdmin\Admin\Resources\ResourceRegistrar;
use Elijahworkz\InvictaAdmin\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Str;

class FieldsController extends Controller
{
    /**
     * @return array<int,array>
     */
    public function linkableResources(Request $request): array
    {
        $resources = ResourceRegistrar::all();

        $result = [];

        foreach ($resources as $resource) {
            if (method_exists($resource, 'navTitle')) {
                $result[] = [
                    'handle' => $resource->handle(),
                    'label' => $resource->menuTitle(),
                    'titleField' => $resource->titleField,
                ];
            }
        }

        return $result;
    }

    public function filterOptions(Request $request)
    {
        return App::make($request->handle)::remoteOptions($request->search);
    }

    /**
     * @return array<int,array<string,mixed>>
     */
    public function linkableResourcesOptions(Request $request): array
    {
        $resources = ResourceRegistrar::all();
        $resourcesToList = $request->has('resources')
            ? (is_array($request->resources)
                ? $request->resources
                : [$request->resources])
            : null;

        $result = [];

        foreach ($resources as $resource) {
            // First we check for all linkable resources - ie those that have AvailableForNavigation Trait
            if (method_exists($resource, 'navTitle')) {
                $handle = $resource->handle();

                if ($resourcesToList && ! in_array($handle, $resourcesToList)) {
                    continue;
                }

                $itemsQuery = $resource
                    ->model()
                    ->select('id', $resource->titleField);

                if ($resource->localizable()) {
                    $itemsQuery->locale();
                }

                $items = $itemsQuery->get();
                $options = [];

                foreach ($items as $item) {
                    $options[] = [
                        'value' => $handle.'::'.$item->id,
                        'label' => $item[$resource->titleField],
                        'group' => $handle,
                    ];
                }

                $result[] = [
                    'handle' => $handle,
                    'label' => Str::ucfirst($handle),
                    'options' => $options,
                ];
            }
        }

        return $result;
    }

    public function assetFieldActions()
    {
        return Asset::$fieldActions;
    }
}
