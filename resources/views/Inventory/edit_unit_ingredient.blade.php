@extends('master')

@section('title','Update Option Ingredients')

@section('place')

<div class="col-md-5 col-8 align-self-center">
    <h3 class="text-themecolor m-b-0 m-t-0">Update Option Ingredients</h3>
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="{{route('index')}}">Back to Dashborad</a></li>
        <li class="breadcrumb-item active">Update Option Ingredients</li>
    </ol>
</div>

@endsection

@section('content')

<div class="row">
    <div class="col-md-8">
    	<div class="card shadow">

    		<div class="card-header">

	    		<a href="#" class="btn btn-info float-right" data-toggle="modal" data-target="#add_item">
			        <i class="fa fa-plus"></i> Add More Ingredient 
			    </a>

			    <div class="modal fade" id="add_item" role="dialog" aria-hidden="true">
			        <div class="modal-dialog" role="document">
			            <div class="modal-content">
			                <div class="modal-header">
			                  <h4 class="modal-title">Add Ingredient</h4>
			                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="#close_modal">
			                      <span aria-hidden="true">&times;</span>
			                    </button>
			                </div>

			                <div class="modal-body">

			                    <label>Amount</label>
			                    <input class="form-control" type="number" placeholder="Enter Amount" id="amount" >

			                    <label>Ingredient</label>
                                <select class="form-control select2 m-b-10" style="width: 100%" id="ingredient">
                                    @foreach($ingredient_lists as $list)
                                    <option value="{{ $list->id}} - {{$list->name}}">{{$list->name}}</option>
                                    @endforeach
                                </select>

			                    <div class="form-actions mt-3">
			                      <button type="submit" class="btn btn-success" id="add"> <i class="fa fa-check"></i> Save</button>
			                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
			                    </div>
			                </div>
			             
			            </div>
			        </div>
			    </div>
			</div>

            <div class="card-body">
                <h4 class="card-title">Update Option Ingredients</h4>

                <form class="form-material" method="post" action="{{route('update_unit_ingredient',$id)}}">
                    @csrf

                    @foreach($ingredients as $ingre)
	                    <div class="form-group" id="removeclass2_{{$ingre->id}}">
	                        <div class="row">
	                            <div class="col-sm-2">
	                                <div class="form-group">
	                                    <input type="text" class="form-control" name="amount[]" value="{{$ingre->pivot->amount}}">
	                                </div>
	                            </div>
	                            <div class="col-sm-8">
	                                <div class="form-group">
	                                    <input type="hidden" name="ingredient[]" value="{{$ingre->id}}">
	                                    <input type="text" class="form-control" value="{{$ingre->name}}">
	                                </div>
	                            </div>
	                            <div class="col-sm-2">
	                                <button class="btn-outline-danger" type="button" onclick="remove_update_education_fields({{$ingre->id}});"> 
	                                    <i class="fa fa-minus"></i> 
	                                </button>
	                            </div>
	                        </div>
	                   </div>
	                @endforeach

	                <div id="education_fields"></div>

	                <input type="submit" name="btnsubmit" class="btnsubmit float-right btn btn-primary" value="Update">
                </form>
                
            </div>
        </div>
    </div>
</div>
@endsection

@section('js')
<script>

    $(document).ready(function(){

        $(".select2").select2();

    });

    var count = 0;

    $('#add').click(function(event){

        event.preventDefault();

        var html = "";
        
        count = count + 1;
   
        var item_price = $('#amount').val();

        var item_currency = $('#ingredient').val();

        var item = item_currency.split("-");


        if($.trim(item_price) == '' || $.trim(item_currency) == '' )
        {
            swal({

                title:"Failed!",
                text:"Please fill all basic unit field",
                icon:"info",
                timer: 3000,
            });
            
        }else{

            html+=`<div class="form-group" id="removeclass_${count}">
                        <div class="row">
                            <div class="col-sm-2">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="amount[]" value="${item_price}">
                                </div>
                            </div>
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <input type="hidden" name="ingredient[]" value="${item[0]}">
                                    <input type="text" class="form-control" value="${item[1]}">
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <button class="btn-outline-danger" type="button" onclick="remove_education_fields(${count});"> 
                                    <i class="fa fa-minus"></i> 
                                </button>
                            </div>
                        </div>
                   </div>`

            $("#education_fields").append(html);

            formClear();     
        }
   
   });
 
    function remove_update_education_fields(rid) {

        console.log(rid);
        
        $('#removeclass2_' + rid).remove();
    }

    function remove_education_fields(rid) {

        console.log(rid);
        
        $('#removeclass_' + rid).remove();
    }

    function formClear() {

        $("#amount").val("");

        $('#add_item').modal('hide');
    }


</script>

@endsection