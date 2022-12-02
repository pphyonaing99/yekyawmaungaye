@extends('master')

@section('title','Shop Order Voucher')

@section('place')

<div class="col-md-5 col-8 align-self-center">
    <h3 class="text-themecolor m-b-0 m-t-0">Shop Order Voucher</h3>
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{route('index')}}">Back to Dashborad</a></li>
        <li class="breadcrumb-item active">Shop Order Voucher</li>
    </ol>
</div>

@endsection

@section('content')

<style>

    td{
        text-align:left;
        font-size:15px;
    }

    th{
        text-align:left;
        font-size:15px;
    }

    h6{
        font-size:15px;
        font-weight:500;
    }
</style>

<div class="page-wrapper">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-5 printableArea" style="width:45%;">
                <div class="card card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="text-center">
                                <address>
                                    <h5> &nbsp;<b class="text-center">ရေကျော်မောင်အေး - ကဖေး</b></h5>
                                        <h6>Restaurant</h6>
                                        <h6>No 113. (3) Ward, Waizayantar Road</h6>
                                        <h6>South Oakkalapa Township, Yangon</h6>
                                        <h6><i class="fas fa-mobile-alt"></i> 09 775 775842</h6>
                                </address>
                            </div>
                            <div class="pull-right text-left">
                                    <h6>Date : <i class="fa fa-calendar"></i> {{$voucher->voucher_date}}</h6>
                                    <h6>Voucher Number : {{$voucher->voucher_code}}</h6>
                                </font> 
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="table-responsive" style="clear: both;">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Menu Name</th>
                                            <th>Option & Size</th>
                                            <th >Price & Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($voucher->option as $option)
                                        <tr>
                                            <td>{{$option->menu_item->item_name}}</td>
                                                @if($option->size == 1)
                                            <td>{{$option->name}} & Small</td>
                                                @elseif($option->size == 2)
                                            <td>{{$option->name}} & Normal</td>
                                                @else
                                            <td>{{$option->name}} & Large</td>
                                                @endif 
                                            <td>{{$option->pivot->price}} * {{$option->pivot->quantity}}</td>
                                            <td>{{$option->pivot->price * $option->pivot->quantity}}</td>   
                                        </tr> 
                                        @endforeach
                                    </tbody>   
                                </table>
                                <div class="text-right mr-2">
                                     <h5 class="font-weight-bold">Total - {{$voucher->total_price}}</h5>
                                </div>

                                <h6 class="text-center font-weight-bold">**ကျေးဇူးတင်ပါသည်***</h6>
                        </div>
                    </div>
                </div>
             </div>
                
            </div>

            <div class="col-md-12">
                <div class="text-center">
                    <button id="print" class="btn btn-info" type="button"> 
                        <span><i class="fa fa-print"></i> Print</span> 
                    </button>                                   
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('js')

<script src="{{asset('js/jquery.PrintArea.js')}}" type="text/JavaScript"></script>

<script>
    $(document).ready(function() {
        $("#print").click(function() {
            var mode = 'iframe'; //popup
            var close = mode == "popup";
            var options = {
                mode: mode,
                popClose: close
            };
            $("div.printableArea").printArea(options);
        });
    });
    </script>


@endsection