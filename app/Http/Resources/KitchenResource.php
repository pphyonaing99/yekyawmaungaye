<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class KitchenResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //return parent::toArray($request);

        $table = $this->table;

        if ($this->table_id == 0) {
            
            $table_number = "Take Away";

        } else {

            $table_number = $table->table_number;
        }

        $option_lits = array();

        foreach($this->option as $opt){

            if ($opt->pivot->status == 0) {
                
                $status = "Ordered" ;

            } elseif ($opt->pivot->status == 1) {
                
                $status = "Cooking" ;

            } else{

                $status = "Finished" ;

            }            

            $collection = collect(['option_id','name', 'menu_item_name','status','quantity','note']);

            $combined = $collection->combine([$opt->id,$opt->name,$opt->menu_item->item_name,$status,$opt->pivot->quantity,$opt->pivot->note]);

            array_push($option_lits, $combined);

        }

        return [
            'order_id' => $this->id,
            'order_number' => $this->order_number,
            'table' => $table_number,
            'option_lists' => $option_lits,
        ];
    }
}
