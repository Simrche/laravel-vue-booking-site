<?php

namespace App\Http\Controllers\Api;

use App\Models\Bookable;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BookableReviewController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke($id, Request $request)
    {
        $bookable = Bookable::findOrFail($id);

        return $bookable->review()->latest()->get();

    }
}
