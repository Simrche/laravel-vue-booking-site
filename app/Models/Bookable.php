<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookable extends Model
{
    use HasFactory;

    public function bookings() {
        return $this->hasMany(Booking::class);
    }

    public function availableFor($from, $to) {
        return 0 === $this->bookings()->betweenDates($from, $to)->count();
    }

    public function review() {
        return $this->hasMany(Review::class);
    }

    public function pricefor($from, $to): array {
        $days = (new Carbon($from))->diffInDays(new Carbon($to)) + 1;
        $price = $days * $this->price;

        return [
            'total' => $price,
            'breakdown' => [
                $this->price => $days
            ]
            ];
    }
}
