@extends('master')

@section('title','Employee Details')

@section('content')

<div class="row page-titles">
    <div class="col-md-5 col-8 align-self-center">
        <h3 class="text-themecolor m-b-0 m-t-0">Employee Details</h3>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{route('index')}}">Back to Dashborad</a></li>
            <li class="breadcrumb-item active">Employee Details</li>
        </ol>
    </div>

    <div class="col-md-7 col-4 align-self-center">
        <div class="d-flex m-t-10 justify-content-end">
            <div class="d-flex m-r-20 m-l-10 hidden-md-down">
                <div class="chart-text m-r-10">
                    <h6 class="m-b-0"><small>THIS MONTH</small></h6>
                    <h4 class="m-t-0 text-info">58,356 MMk</h4></div>
                <div class="spark-chart">
                    <div id="monthchart"></div>
                </div>
            </div>
            <div class="d-flex m-r-20 m-l-10 hidden-md-down">
                <div class="chart-text m-r-10">
                    <h6 class="m-b-0"><small>LAST MONTH</small></h6>
                    <h4 class="m-t-0 text-primary">48,356 MMK</h4></div>
                <div class="spark-chart">
                    <div id="lastmonthchart"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <!-- Column -->
    <div class="col-lg-4 col-xlg-3 col-md-5">
        <div class="card">
            <div class="card-body">
                <center class="m-t-30"> <img src="{{asset('image/'. $employee->user->photo_path)}}" class="img-circle" width="150" />
                    <h4 class="card-title m-t-10">{{$employee->user->name}}</h4>
                    <h6 class="card-subtitle">{{$employee->user->role}}</h6>
                    <div class="row text-center justify-content-md-center">
                        <div class="col-4">
                        	<a href="#" class="link">
                        		<i class="mdi mdi-account-card-details"></i> 
                        		<font class="font-medium">{{$employee->user->user_code}}</font>
                        	</a>
                        </div>
                    </div>
                </center>
            </div>
            <div>
                <hr> </div>
            <div class="card-body"> 
            	<small class="text-muted">Email address </small>
                <h6>{{$employee->user->email}} </h6> 
                <small class="text-muted p-t-30 db">Phone</small>
                <h6>{{$employee->phone}}</h6>                
                <br/>
                <button class="btn btn-circle btn-secondary"><i class="mdi mdi-facebook"></i></button>
                <button class="btn btn-circle btn-secondary"><i class="mdi mdi-youtube-play"></i></button>
            </div>
        </div>
    </div>
    <!-- Column -->
    <!-- Column -->
    <div class="col-lg-8 col-xlg-9 col-md-7">
        <div class="card">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs profile-tab" role="tablist">
                <li class="nav-item"> <a class="nav-link active" data-toggle="tab" href="#settings" role="tab">Settings</a> </li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
                <div class="tab-pane active" id="settings" role="tabpanel">
                    <div class="card-body">
                        <form class="form-horizontal form-material">
                            <div class="form-group">
                                <label class="col-md-12">Employee Name</label>
                                <div class="col-md-12">
                                    <input type="text" class="form-control form-control-line" name="name" value="{{$employee->user->name}}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="example-email" class="col-md-12">Email</label>
                                <div class="col-md-12">
                                    <input type="email" class="form-control form-control-line" name="email" value="{{$employee->user->email}}">
                                </div>
                            </div>
                       
                            <div class="form-group">
                                <label class="col-md-12">Phone No</label>
                                <div class="col-md-12">
                                    <input type="text"  class="form-control form-control-line" name="phone" value="{{$employee->phone}}">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-12">
                                    <button class="btn btn-success">Update Profile</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Column -->
</div>

@endsection