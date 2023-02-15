<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Eteacher\InvictaAdmin\Http\Request\InvictaRequest;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CacheController extends Controller
{
    public function index(InvictaRequest $request)
    {
        $this->authorize('edit cache');

        return Inertia::render('Cache/Index');
    }

    public function clearCache(InvictaRequest $request)
    {
        $message = 'Application cache cleared';

        if (! empty($handle = $request->input('tag'))) {
            Cache::tags($handle)->flush();
            $message = Str::ucfirst($handle).' cache cleared';
        } elseif (! empty($handle = $request->input('key'))) {
            Cache::forget($handle);
            $message = Str::ucfirst(Str::replace('-', ' ', $handle)).' cache cleared';
        } else {
            Artisan::call('cache:clear');
        }

        return response()->json(['message' => $message]);
    }
}
