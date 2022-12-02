@extends('master')

@section('title','Shop Order Details')

@section('place')

<div class="col-md-5 col-8 align-self-center">
<h3 class="text-themecolor m-b-0 m-t-0">Pending Order Details</h3>
<ol class="breadcrumb">
<li class="breadcrumb-item"><a href="{{route('index')}}">Back to Dashborad</a></li>
<li class="breadcrumb-item active">Pending Order Details</li>
</ol>
</div>

@endsection


@section('content')


<div class="row">
	<div class="col-md-12">
		<div class="card shadow">
		    <div class="card-header">
		        <h4 class="font-weight-bold mt-2">Pending Order Details</h4>
		    </div>
		    <div class="card-body">
		    	
		    	<div class="row">

		    		<div class="col-md-6">
		    			<div class="row">				           
			              	<div class="font-weight-bold text-primary col-md-4">Order Number</div>
			              	<h5 class="font-weight-bold col-md-4 mt-1">{{$pending_order_details->order_number}}</h5>
				        </div>

				        <div class="row mt-1">				           
			              	<div class="font-weight-bold text-primary col-md-4">Order Total Quantity</div>
			              	<h5 class="font-weight-bold col-md-4 mt-1">{{$total_qty}}</h5>
				        </div> 

				        <div class="row mt-1">				           
			              	<div class="font-weight-bold text-primary col-md-4">Order Total Price</div>
			              	<h5 class="font-weight-bold col-md-4 mt-1">{{$total_price}}</h5>
				        </div> 

				        <div class="row mt-1">				           
			              	<div class="font-weight-bold text-primary col-md-4">Table Name</div>
			              	<h5 class="font-weight-bold col-md-4 mt-1">{{$pending_order_details->table->table_number??"Take Away"}}</h5>
				        </div>
		    		</div>

		    		<div class="col-md-6">
		    			<h4 class="font-weight-bold mt-2 text-primary text-center">Pending Order Option's List</h4>
		    			<div class="table-responsive">
		                    <table class="table">
		                        <thead>
		                            <tr>
		                                <th>Item Name</th>
		                                <th>Counting Unit Name</th>
		                                <th>Order Quantity</th>
		                                <th>Note</th>
		                                <th>Status</th>
		                            </tr>
		                        </thead>
		                        <tbody>
		                            @foreach($pending_order_details->option as $option)
		                                <tr>
		                                	<td>{{$option->menu_item->item_name}}</td>
		                                	<td>{{$option->name}}</td>
		                                	<td>{{$option->pivot->quantity}}</td>
		                                	<td>{{$option->pivot->note}}</td>
		                                	@if($option->status == 0)			                                   
		                                	<td>
		                                		<span class="badge-pill badge-danger">Cooking</span>
		                                	</td>
		                                	@else
		                                	<td>
		                                		<span class="badge-pill badge-danger">Finished</span>
		                                	</td>
		                                	@endif			                                   
		                                </tr>                                   
		                            @endforeach
		                        </tbody>
		                    </table>
		                </div>
		    		</div>

		    	</div>                
		    </div>
		</div>
	</div>
</div>

<div class="row justify-content-center">

	<a href="{{route('add_more_item', $pending_order_details->id)}}" class="btn btn-outline-info text-center"> Add More Item</a>

</div>
@endsection