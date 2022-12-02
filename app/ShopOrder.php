<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShopOrder extends Model
{
    protected $guarded = [];

    protected $hidden = [
        'created_at', 'updated_at',
    ];

    protected $fillable = [ 
       'order_number','status','table_id','voucher_id'
    ];

    public function option() {
		return $this->belongsToMany('App\Option')->withPivot('id','quantity','note','status');
	}

	public function table() {

		return $this->belongsTo(Table::class);
	}

    public function voucher() {

        return $this->belongsTo(Voucher::class);
    }
}
