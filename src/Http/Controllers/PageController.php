<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Inertia\Inertia;

class PageController extends Controller
{
    public function home()
    {
        return Inertia::render('Invicta.Home', []);
    }
}
