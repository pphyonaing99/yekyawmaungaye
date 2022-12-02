<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Voucher extends Model
{
    use SoftDeletes;

    protected $guarded = [];

    protected $fillable = [
    	'voucher_code',
    	'total_price',
    	'total_quantity',
    	'sale_by',
    	'type',
    	'voucher_date',
    	'status',
    	'deleted_at'
    ];

    public function option() {
        return $this->belongsToMany(Option::class)->withPivot('quantity','price');
    }

    public function user()
    {
        return $this->belongsTo('App\User','sale_by');
    }
}
