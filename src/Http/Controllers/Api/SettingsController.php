<?php

namespace Elijahworkz\InvictaAdmin\Http\Controllers\Api;

use Elijahworkz\InvictaAdmin\Admin\Models\Setting;
use Elijahworkz\InvictaAdmin\Facades\Blueprint;
use Elijahworkz\InvictaAdmin\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SettingsController extends Controller
{
    public function edit()
    {
        $this->authorize('edit settings');

        return [
            'actionUrl' => route('invicta.api.settings.update'),
            'item' => Setting::pluck('data', 'handle'),
            'blueprint' => Blueprint::settingsBlueprint(),
            'meta' => [
                'pageTitle' => 'Settings',
            ],
        ];
    }

    public function update(Request $request)
    {
        $validated = Validator::make($request->fields, $request->validation)->validate();
        $upsert = [];
        foreach ($validated as $handle => $data) {
            $upsert[] = [
                'handle' => $handle,
                'data' => json_encode($data),
            ];
        }

        Setting::upsert($upsert, uniqueBy: ['handle'], update: ['data']);

        return response()->json(['message' => [
            'type' => 'success',
            'title' => 'Settings updated',
        ]]);
    }
}
