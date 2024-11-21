<?php

namespace Elijahworkz\InvictaAdmin\Http\Controllers\Api;

use Elijahworkz\InvictaAdmin\Admin\Models\Asset;
use Elijahworkz\InvictaAdmin\Http\Controllers\Controller;
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
