<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class LocaleController extends Controller
{
    /**
     * Switch application language
     */
    public function switch(Request $request, string $locale): RedirectResponse
    {
        $supported = ['id', 'ja', 'en'];

        if (in_array($locale, $supported)) {
            App::setLocale($locale);
            $request->session()->put('locale', $locale);
            cookie()->queue('app_locale', $locale, 60 * 24 * 365);
        }

        return redirect()->back();
    }
}
