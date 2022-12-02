@extends('master')

@section('title','Shop Order Pending Page')

@section('place')

<div class="col-md-5 col-8 align-self-center">
    <h3 class="text-themecolor m-b-0 m-t-0">Shop Order Page</h3>
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{route('index')}}">Back to Dashborad</a></li>
        <li class="breadcrumb-item active">Shop Order Page</li>
    </ol>
</div>

@endsection

@section('content')
<div class="row">
    <div class="col-md-8">
        <div class="card shadow">
            <div class="card-header">
                <h4 class="font-weight-bold mt-2">Pending Shop Order List</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table" id="example23">
                        <thead>
                            <tr>
                                <th>Order Number</th>
                                <th>Table Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($pending_lists as $order)
                                <tr>
                                	<td>{{$order->order_number}}</td>
                                    @if($order->table_id == 0)
                                    <td>Take Away</td>
                                    @else
                                    <td>{{$order->table->table_number}}</td>
                                    @endif
                                    <td>
                                    	<a href="{{route('pending_order_details', $order->id)}}" class="btn btn-outline-info">Check Order Details</a>

                                    	<a href="{{route('add_more_item', $order->id)}}" class="btn btn-outline-success">Add More Item</a>

                                        <a href="#" class="btn btn-outline-primary" onclick="storeVoucher({{$order->id}})">Store Voucher</a>
                                    </td>

                                </tr>                                   
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('js')

<script>
    
    function storeVoucher(order_id){
        
        $.ajax({

           type:'POST',

           url:'/ShopVoucherStore',
           
           data:{
            "_token":"{{csrf_token()}}",
            "order_id":order_id,
           },

            success:function(data){

                swal({
                    title: "Success!",
                    text : "Successfully Stored!",
                    icon : "success",
                });

                var url = '{{ route("shop_order_voucher", ":order_id") }}';

                url = url.replace(':order_id', data.id);

                setTimeout(function(){

                    window.location.href= url;

                }, 1000);
                
            }

        });
    }
</script>


@endsection