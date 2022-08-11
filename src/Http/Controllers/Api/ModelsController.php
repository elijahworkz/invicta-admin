<?php

namespace Eteacher\InvictaAdmin\Http\Controllers\Api;

use Eteacher\InvictaAdmin\Admin\Traits\CanEditItems;
use Eteacher\InvictaAdmin\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Str;

class ModelsController extends Controller
{
    use CanEditItems;

    private $model;

    public function list(Request $request)
    {
        $this->model = json_decode(base64_decode($request->query('class')), true);
        $query = App::make($this->model);

        return $this->itemsQuery($query);
    }

    public function create()
    {
        // We need to get blueprint for the model if it exists
    }

    public function edit()
    {
        // code...
    }

    private function handle()
    {
        return Str::of($this->model)->classBasename()->plural()->lower();
    }
}
