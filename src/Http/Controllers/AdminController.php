<?php

namespace Elijahworkz\InvictaAdmin\Http\Controllers;

use Carbon\Carbon;
use Elijahworkz\InvictaAdmin\Admin\Resources\ResourceRegistrar;
use Elijahworkz\InvictaAdmin\InvictaAdmin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function home()
    {
        return Inertia::render('Home', []);
    }

    public function user()
    {
        return InvictaAdmin::user();
    }

    public function impersonateLeave()
    {
        if (! $user = \App\Models\User::find(session('impersonator_id'))) {
            return false;
        }

        Auth::loginUsingId($user->getAuthIdentifier());

        session()->forget('impersonate_guard');
        session()->forget('impersonator_id');
        session()->forget('impersonated_id');

        return redirect(route('invicta.home'));
    }

    /**
     * generate list of sitemaps.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function sitemap()
    {
        $resources = ResourceRegistrar::all();

        $sitemaps = [];

        foreach ($resources as $resource) {
            if (method_exists($resource, 'navTitle')) {
                $sitemaps[] = [
                    'loc' => route('subSitemap', ['resource' => $resource->handle()]),
                ];
            }
        }

        $content = View::file(
            public_path('vendor/invicta/views/sitemap/index.blade.php'),
            ['sitemaps' => $sitemaps]
        )->render();

        return response($content)->header('Content-Type', 'text/xml');
    }

    /**
     * generate resource sitemap.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function subSitemap($resource)
    {
        $currentResource = ResourceRegistrar::get($resource);

        $items = [];
        $data = $currentResource->model()->get();

        foreach ($data as $model) {
            if (empty($model->seo['noindex']) && ! empty($model->uri)) {
                if (! empty($model->origin_id)) {
                    $items[$model->origin_id]['localization'][] = [
                        'uri' => url($model->uri),
                        'locale' => $model->site,
                    ];

                    continue;
                }
                $items[$model->id]['uri'] = url($model->uri);
                $items[$model->id]['lastmod'] = Carbon::parse($model->updated_at)->format('Y-m-d');
                $items[$model->id]['locale'] = $model->site;
            }
        }

        $content = View::file(
            public_path('vendor/invicta/views/sitemap/item.blade.php'),
            ['items' => $items]
        )->render();

        return response($content)->header('Content-Type', 'text/xml');
    }
}
