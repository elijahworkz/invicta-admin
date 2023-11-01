<?php

namespace Eteacher\InvictaAdmin\Http\Controllers\Api;

use Eteacher\InvictaAdmin\Admin\Models\Asset;
use Eteacher\InvictaAdmin\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AssetController extends Controller
{
    public function store(Request $request)
    {
        $this->authorize('create new assets');

        sleep(3);

        if ($request->hasFile('file')) {
            return Asset::saveFile($request->file('file'));
        }

        abort(413, 'File exceeds allowed size limit');
    }
}
