@extends('master')

@section('title','Shop Order Sale Page')

@section('place')

<div class="col-md-5 col-8 align-self-center">
    <h3 class="text-themecolor m-b-0 m-t-0">Order Sale Page</h3>
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{route('index')}}">Back to Dashborad</a></li>
        <li class="breadcrumb-item active">Order Sale Page</li>
    </ol>
</div>

@endsection

@section('content')

<div class="row">

    <div class="card col-md-6">

        <form action="{{route('store_shop_order')}}" method="post" id="vourcher_page">
            @csrf

            <input type="hidden" id="item" name="option_lists">

            <input type="hidden" name="table_id" value="{{$table_number}}">

        </form>

        <form action="{{route('add_item')}}" method="post" id="add_more_item">
            @csrf

            <input type="hidden" id="option_lists" name="option_lists">

            <input type="hidden" id="order_id" name="order_id">

        </form>

        <ul class="nav nav-tabs customtab" role="tablist">
            @foreach($meal_types as $meal)
            <li class="nav-item"> 
                <a class="nav-link" data-toggle="tab" href="#{{$meal->id}}" role="tab">
                    <span class="hidden-sm-up">
                        <i class="ti-home"></i>
                    </span> 
                    <span class="hidden-xs-down">
                        {{$meal->name}}
                    </span>
                </a> 
            </li>
            @endforeach
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
            <div class="tab-pane active" id="1" role="tabpanel">
                <div class="row mt-2">
                    <div class="col-md-5">
                        <label class="font-weight-bold">Filter By Cuisine Type</label>
                        <select class="form-control mr-2" style="width: 100%" onchange="searchByCuisineOne(this.value)">
                            @foreach($cuisine_types as $cuisine)
                                @if($cuisine->meal_id == 1)
                                    <option value="{{$cuisine->id}}">{{$cuisine->name}}</option>
                                @endif
                            @endforeach
                        </select>
                    </div>                    
                </div>
                <table class="table mt-2" id="table_1">
                    <thead>
                        <tr>
                            <th>Menu Item Name</th>
                            <th>Item Photo</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($items as $item)
                            @if($item->cuisine_type->meal_id == 1)
                            <tr>
                                <td>{{$item->item_name}}</td>
                                <td>
                                    <img src="{{asset('/photo/Item/'. $item->photo_path)}}" class="img-rounded" width="100" height="70" />
                                </td>
                                <td class="text-center">
                                    <i class="btn btn-success" onclick="getCountingUnit({{$item->id}})"><i class="fas fa-plus"></i>Sale</i>
                                </td>                                    
                            </tr>
                            @endif
                        @endforeach
                    </tbody>
                </table>
            </div>

            <div class="tab-pane" id="2" role="tabpanel">
                <div class="row mt-2">
                    <div class="col-md-5">
                        <label class="font-weight-bold">Filter By Cuisine Type</label>
                        <select class="form-control mr-2" style="width: 100%" onchange="searchByCuisineTwo(this.value)">
                            @foreach($cuisine_types as $cuisine)
                                @if($cuisine->meal_id == 2)
                                    <option value="{{$cuisine->id}}">{{$cuisine->name}}</option>
                                @endif
                            @endforeach
                        </select>
                    </div>                    
                </div>
               
                <table class="table" id="table_2">
                    <thead>
                        <tr>
                            <th>Menu Item Name</th>
                            <th>Item Photo</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($items as $item)
                            @if($item->cuisine_type->meal_id == 2)
                            <tr>
                                <td>{{$item->item_name}}</td>
                                <td>
                                    <img src="{{asset('/photo/Item/'. $item->photo_path)}}" class="img-rounded" width="100" height="70" />
                                </td>
                                <td class="text-center">
                                    <i class="btn btn-success" onclick="getCountingUnit({{$item->id}})"><i class="fas fa-plus"></i>Sale</i>
                                </td>                                    
                            </tr>
                            @endif
                        @endforeach
                    </tbody>                   
                </table>
            </div>

            <div class="tab-pane" id="3" role="tabpanel">
                <div class="row mt-2">
                    <div class="col-md-5">
                        <label class="font-weight-bold">Filter By Cuisine Type</label>
                        <select class="form-control mr-2" style="width: 100%" onchange="searchByCuisineThree(this.value)">
                            @foreach($cuisine_types as $cuisine)
                                @if($cuisine->meal_id == 3)
                                    <option value="{{$cuisine->id}}">{{$cuisine->name}}</option>
                                @endif
                            @endforeach
                        </select>
                    </div>                    
                </div>
                <table class="table mt-5" id="table_3">
                    <thead>
                        <tr>
                            <th>Menu Item Name</th>
                            <th>Item Photo</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($items as $item)
                            @if($item->cuisine_type->meal_id == 3)
                            <tr>
                                <td>{{$item->item_name}}</td>
                                <td>
                                    <img src="{{asset('/photo/Item/'. $item->photo_path)}}" class="img-rounded" width="100" height="70" />
                                </td>
                                <td class="text-center">
                                    <i class="btn btn-success" onclick="getCountingUnit({{$item->id}})"><i class="fas fa-plus"></i>Sale</i>
                                </td>                                    
                            </tr>
                            @endif
                        @endforeach
                    </tbody>
                </table>
            </div>

            <div class="modal fade" id="unit_table_modal" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Choose Option Infomation</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="#close_modal">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body" id="checkout_modal_body">                                           
                            <table class="table">
                                <thead>
                                    <tr class="text-center">
                                        <th>Item Name</th>
                                        <th>Unit Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="count_unit">
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-6">
        <div class="card">
            <div class="card-title">
                <a href="" class="float-right" onclick="deleteItems()">Refresh Here &nbsp<i class="fas fa-sync"></i></a>
            </div>
            <div class="card-body">
                <div class="row justify-content-center">                    
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="font-weight-bold text-info">Menu Item</th>
                                <th class="font-weight-bold text-info">Option</th>
                                <th class="font-weight-bold text-info">Quantity</th>
                                <th class="font-weight-bold text-info">Note</th>
                            </tr>
                        </thead>
                        <tbody id="sale">
                           <tr>

                           </tr>
                        </tbody>
                        <tfoot>
                            <tr class="text-center">
                                <td class="font-weight-bold text-info" colspan="3">Total Quantity</td>
                                <td class="font-weight-bold text-info" id="total_quantity">0</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                 <div class="row ml-2 justify-content-center">
                    @if(isset($order))
                    <div class="col-md-2">
                        <i class="btn btn-success mr-2" onclick="AddMoreItem({{$order->id}})"><i class="fas fa-plus"></i> Add More Item </i>   
                    </div>                    
                    @else
                    <div class="col-md-2">
                        <i class="btn btn-success mr-2" onclick="showCheckOut()"><i class="fas fa-calendar-check"></i> Check Out </i>   
                    </div>
                    @endif                    
                </div>
            </div>
        </div>
    </div>
</div>

@endsection


@section('js')

<script type="text/javascript">

    $(document).ready(function() {

        $('#table_1').DataTable( {
    
            "paging":   false,
            "ordering": false,
            "info":     false,

        });

        $('#table_2').DataTable( {
    
            "paging":   false,
            "ordering": false,
            "info":     false,

        });

        $('#table_3').DataTable( {
    
            "paging":   false,
            "ordering": false,
            "info":     false,

        });
    });

    function deleteItems() {
        
      localStorage.clear();
    }

    function searchByCuisineOne(value){
        
         $('#table_1').empty();
        
         $.ajax({

           type:'POST',

           url:'/searchByCuisine',
           
           data:{
            "_token":"{{csrf_token()}}",
            "cuisine_id":value,
           },

            success:function(data){
                
                var html = "";
                
                $.each(data,function(i, v){
                    
                    var id = v.id;
                    
                    var item = v.item_name;
                    
                    var photo_path =  '{{asset('/photo/Item/')}}'+ "/" + v.photo_path;

                    html+=`<tr>
                                <td>${item}</td>
                                <td>
                                    <img src="${photo_path}" class="img-rounded" width="100" height="70" />
                                </td>
                                <td class="text-center">
                                    <i class="btn btn-success" onclick="getCountingUnit(${id})"><i class="fas fa-plus"></i>Sale</i>
                                </td>                                    
                            </tr>`
                });
                
                $("#table_1").html(html);
            }

        });
        
    }

    function searchByCuisineTwo(value){

        $('#table_2').empty();
        
         $.ajax({

           type:'POST',

           url:'/searchByCuisine',
           
           data:{
            "_token":"{{csrf_token()}}",
            "cuisine_id":value,
           },

            success:function(data){
                
                var html = "";
                
                $.each(data,function(i, v){
                    
                    var id = v.id;
                    
                    var item = v.item_name;
                    
                    var photo_path =  '{{asset('/photo/Item/')}}'+ "/" + v.photo_path;

                    html+=`<tr>
                                <td>${item}</td>
                                <td>
                                    <img src="${photo_path}" class="img-rounded" width="100" height="70" />
                                </td>
                                <td class="text-center">
                                    <i class="btn btn-success" onclick="getCountingUnit(${id})"><i class="fas fa-plus"></i>Sale</i>
                                </td>                                    
                            </tr>`
                });
                
                $("#table_2").html(html);
            }

        });
        
    }

    function searchByCuisineThree(value){

         $('#table_3').empty();
        
         $.ajax({

           type:'POST',

           url:'/searchByCuisine',
           
           data:{
            "_token":"{{csrf_token()}}",
            "cuisine_id":value,
           },

            success:function(data){
                
                var html = "";
                
                $.each(data,function(i, v){
                    
                    var id = v.id;
                    
                    var item = v.item_name;
                    
                    var photo_path =  '{{asset('/photo/Item/')}}'+ "/" + v.photo_path;

                    html+=`<tr>
                                <td>${item}</td>
                                <td>
                                    <img src="${photo_path}" class="img-rounded" width="100" height="70" />
                                </td>
                                <td class="text-center">
                                    <i class="btn btn-success" onclick="getCountingUnit(${id})"><i class="fas fa-plus"></i>Sale</i>
                                </td>                                    
                            </tr>`
                });
                
                $("#table_3").html(html);
            }

        });
    }

    function getCountingUnit(item_id){

        var html = "";
        
        $.ajax({

           type:'POST',

           url:'/getCountingUnitsByItemId',
           
           data:{
            "_token":"{{csrf_token()}}",
            "item_id":item_id,
            
           },

            success:function(data){

                $.each(data, function(i, unit) {
                    
                    html+=`<tr class="text-center">
                            <input type="hidden" id="item_name" value="${unit.menu_item.item_name}">
                            <input type="hidden" id="price_${unit.id}" value="${unit.sale_price}">
                            <td>${unit.menu_item.item_name}</td>
                            <td id="name_${unit.id}">${unit.name}</td>                            
                            <td><i class="btn btn-primary" onclick="tgPanel(${unit.id})" ><i class="fas fa-plus"></i> Add</i></td>
                      </tr>`;
                });
                
                $("#count_unit").html(html);

                $("#unit_table_modal").modal('show');
            }

        });
    }

    function tgPanel(id){

        var item_name = $('#item_name').val();
            
        var item_price_check = $('#price_' + id).val();
        
        var name = $('#name_' + id).text();

        var price = parseInt(item_price_check);       
        
        swal("Please Enter Note:", {
            content: "input",
        })

        .then((value) => {

            if (!value) {

                swal({
                    title:"Something Wrong",
                    text:"Please Enter Note!",
                    icon:"info",
                });

            }else{

                var item={id:id,item_name:item_name,unit_name:name,order_qty:1,note:value,selling_price:price};

                var total_amount = {total_qty:1};

                var mycart = localStorage.getItem('mycart');

                var grand_total = localStorage.getItem('grandTotal');

                //console.log(item);

                if(mycart == null ){
                
                    mycart = '[]';

                    var mycartobj = JSON.parse(mycart);

                    mycartobj.push(item);

                    localStorage.setItem('mycart',JSON.stringify(mycartobj));
                
                }else{

                    var mycartobj = JSON.parse(mycart);
                
                    var hasid = false;
                
                    $.each(mycartobj,function(i,v){
                    
                        if(v.id == id ){

                            hasid = true;

                            v.order_qty ++;
                        }
                    })
                
                    if(!hasid){

                        mycartobj.push(item);
                    }
                
                    localStorage.setItem('mycart',JSON.stringify(mycartobj));
                }
                
                if(grand_total == null ){
                    
                    localStorage.setItem('grandTotal',JSON.stringify(total_amount));
                    
                }else{
                    
                    var grand_total_obj = JSON.parse(grand_total);
                    
                    grand_total_obj.total_qty ++;
                    
                    localStorage.setItem('grandTotal',JSON.stringify(grand_total_obj));
                }

                $("#unit_table_modal").modal('hide');
                    
                showmodal();
            }
        })
    }
    
    function showmodal(){
        
        var mycart = localStorage.getItem('mycart');
        
        var grandTotal = localStorage.getItem('grandTotal');
        
        var grandTotal_obj = JSON.parse(grandTotal);
        
        if(mycart){
            
            var mycartobj = JSON.parse(mycart);
          
            var html='';

            if(mycartobj.length>0){

                $.each(mycartobj,function(i,v){

                    var id=v.id;

                    var item=v.item_name;

                    var qty=v.order_qty;

                    var count_name = v.unit_name

                    html+=`<tr>
                            <td class="text-success font-weight-bold">${item}</td>

                            <td class="text-success font-weight-bold">${count_name}</td>

                            <td>
                                <i class="fa fa-plus-circle btnplus" onclick="plus(${id})" id="${id}"></i>  
                                ${qty}  
                                <i class="fa fa-minus-circle btnminus"  onclick="minus(${id})" id="${id}"></i>
                            </td>

                            <td class="text-success font-weight-bold">${v.note}</td>
                            </tr>`;
                            
                });
            }

            $("#total_quantity").text(grandTotal_obj.total_qty);

            $("#sale").html(html);
        }
    }

    function plus(id){

        swal("Please Enter Note:", {
            content: "input",
        })

        .then((value) => {

            count_change(id,value,'plus');

        })        
    }

    function minus(id){

        swal("Please Enter Note:", {
            content: "input",
        })

        .then((value) => {

            count_change(id,value,'minus');

        }) 
    }

    function count_change(id,note,action){
                
        var grand_total = localStorage.getItem('grandTotal');
        
        var mycart=localStorage.getItem('mycart');
        
        var mycartobj=JSON.parse(mycart);
        
        var grand_total_obj = JSON.parse(grand_total);

        var item = mycartobj.filter(item =>item.id == id);

        if( action == 'plus'){

            item[0].order_qty++;

            if (note !== "") {
                
                item[0].note = note;
            }           
            
            grand_total_obj.total_qty ++;

            localStorage.setItem('mycart',JSON.stringify(mycartobj));
        
            localStorage.setItem('grandTotal',JSON.stringify(grand_total_obj));

            showmodal();                      
        }
        else if (action == 'minus') {

            if(item[0].order_qty == 1){
              
                var ans=confirm('Are you sure');
            
                if(ans){
                
                    let item_cart = mycartobj.filter(item =>item.id !== id );
            
                    grand_total_obj.total_qty -- ;

                    localStorage.setItem('mycart',JSON.stringify(item_cart));

                    localStorage.setItem('grandTotal',JSON.stringify(grand_total_obj));

                    showmodal();
              
                }else{
                
                    item[0].order_qty;

                    localStorage.setItem('mycart',JSON.stringify(mycartobj));
            
                    localStorage.setItem('grandTotal',JSON.stringify(grand_total_obj));

                    showmodal(); 
                }
            
            }else{

                item[0].order_qty--;

                if (note !== "") {
                
                    item[0].note = note;
                }
            
                grand_total_obj.total_qty -- ;

                localStorage.setItem('mycart',JSON.stringify(mycartobj));
            
                localStorage.setItem('grandTotal',JSON.stringify(grand_total_obj));

                showmodal();
            }
        }
    }

    function showCheckOut(){
         
        var mycart = localStorage.getItem('mycart');
        
        if(!mycart){
            
            swal({
                title:"Please Check",
                text:"Menu Item Cannot be Empty to Check Out",
                icon:"info",
            });
            
        }else{

            $("#item").attr('value', mycart);

            $("#vourcher_page").submit();

            localStorage.clear();

        }
    }

    function AddMoreItem(order){

        var mycart = localStorage.getItem('mycart');
        
        if(!mycart){
            
            swal({
                title:"Please Check",
                text:"Menu Item Cannot be Empty to Check Out",
                icon:"info",
            });
            
        }else{

            $("#option_lists").attr('value', mycart);

            $("#order_id").attr('value', order);

            $("#add_more_item").submit();

            localStorage.clear();

        }

    }

</script>

@endsection