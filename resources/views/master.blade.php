<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="../assets/images/favicon.png">
    
    <title>@yield('title')</title>
    <!-- Bootstrap Core CSS -->
    <link href="{{asset('assets/plugins/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
    

    <link href="{{asset('assets/plugins/c3-master/c3.min.css')}}" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="{{asset('css/style.css')}}" rel="stylesheet">
    <!-- You can change the theme colors from here -->
    <link href="{{asset('css/colors/blue.css')}}" id="theme" rel="stylesheet">

    <link href="{{asset('assets/plugins/select2/dist/css/select2.min.css')}}" rel="stylesheet" type="text/css">

    <link rel="stylesheet" href="{{asset('assets/plugins/dropify/dist/css/dropify.min.css')}}">
    
    <link rel="stylesheet" href="{{asset('js/dist/css/qrcode-reader.min.css')}}">

    <link href="{{asset('assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css')}}" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.css">

    <script src="https://unpkg.com/sweetalert@2.1.2/dist/sweetalert.min.js"></script>
</head>

<body class="fix-header fix-sidebar card-no-border logo-center">


    @include('sweet::alert')

    <!-- ============================================================== -->
    <!-- Preloader - style you can find in spinners.css -->
    <!-- ============================================================== -->
    
    <!-- ============================================================== -->
    <!-- Main wrapper - style you can find in pages.scss -->
    <!-- ============================================================== -->
    <div id="main-wrapper">
        <!-- ============================================================== -->
        <!-- Topbar header - style you can find in pages.scss -->
        <!-- ============================================================== -->
        <header class="topbar">
            <nav class="navbar top-navbar navbar-expand-md navbar-light">
                <!-- ============================================================== -->
                <!-- Logo -->
                <!-- ============================================================== -->
              
                <!-- ============================================================== -->
                <!-- End Logo -->
                <!-- ============================================================== -->
                <div class="navbar-collapse">
                    <!-- ============================================================== -->
                    <!-- toggle and nav items -->
                    <!-- ============================================================== -->
                    <ul class="navbar-nav mr-auto mt-md-0">
    
                        <!-- ============================================================== -->
                        <!-- Search -->
                        <!-- ============================================================== -->
                        
                            <h2 class="text-white font-weight-bold font-italic">ရေကျော်မောင်အေး ကဖေး</h2>
                            
                        <!-- ============================================================== -->
                        <!-- End Messages -->
                        <!-- ============================================================== -->
                    </ul>
                    <!-- ============================================================== -->
                    <!-- User profile and search -->
                    <!-- ============================================================== -->
                    <ul class="navbar-nav my-lg-0">
                        <!-- ============================================================== -->
                        <!-- Comment -->
                        <!-- ============================================================== -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-muted text-muted waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="mdi mdi-message"></i>
                                <div class="notify"> <span class="heartbit"></span> <span class="point"></span> </div>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right mailbox scale-up">
                                <ul>
                                    <li>
                                        <div class="drop-title">Notifications</div>
                                    </li>
                                    <li>
                                        <div class="message-center">
                                            <!-- Message -->
                                            <a href="#">
                                                <div class="btn btn-danger btn-circle"><i class="fa fa-link"></i></div>
                                                <div class="mail-contnet">
                                                    <h5>Stock Check<span class="badge badge-danger float-right" id="stockNoti"></span></h5>
                                                    <small>Updated Item</small>
                                                </div>
                                            </a>
                                            
                                            <a href="#">
                                                <div class="btn btn-danger btn-circle"><i class="fa fa-link"></i></div>
                                                <div class="mail-contnet">
                                                    <h5>Voucher<span class="badge badge-danger float-right" id="stockNoti"></span></h5>
                                                    <small>Check Voucher</small>
                                                </div>
                                            </a>
                                            
                                            <a href="#">
                                                <div class="btn btn-danger btn-circle"><i class="fa fa-link"></i></div>
                                                <div class="mail-contnet">
                                                    <h5>Reorder<span class="badge badge-danger float-right" id="stockNoti"></span></h5>
                                                    <small>Check Reorder Item</small>
                                                </div>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-muted waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="{{asset('image/user.jpg')}}" alt="user" class="profile-pic" />
                            </a>
                            <div class="dropdown-menu dropdown-menu-right scale-up">
                                <ul class="dropdown-user">
                                    <li>
                                        <div class="dw-user-box">
                                            <div class="u-img"><img src="{{asset('image/user.jpg')}}" alt="user"></div>
                                            <div class="u-text">
                                                <h4>{{session()->get('user')->name}}</h4>
                                                <p class="text-muted">{{session()->get('user')->email}}</p>
                                                <a href="#" class="btn btn-rounded btn-danger btn-sm">View Profile</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="{{route('change_password_ui')}}"><i class="mdi mdi-account-key"></i> Change Password </a></li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="{{route('logoutprocess')}}"><i class="mdi mdi-power"></i> Logout</a></li>
                                </ul>
                            </div>
                        </li>

                        <li class="nav-item dropdown">
                            <a href="{{ url()->previous() }}" class="nav-link waves-effect waves-dark pt-2"><i class="fa fa-arrow-left"></i> Back</a>                            
                        </li>                        
                    </ul>
                </div>
            </nav>
        </header>
        <!-- ============================================================== -->
        <!-- End Topbar header -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Left Sidebar - style you can find in sidebar.scss  -->
        <!-- ============================================================== -->
        <aside class="left-sidebar">
        
            <div class="scroll-sidebar">
                <!-- Sidebar navigation-->
                <nav class="sidebar-nav">
                    <ul id="sidebarnav">
                       
                        <li>
                            <a href="{{route('index')}}">
                                <i class="mdi mdi-home"></i>
                                <span>Home</span>
                            </a>
                        </li>
                        
                        <li>
                            <a class="has-arrow " href="#" aria-expanded="false">
                                <i class="mdi mdi-store"></i>
                                <span class="hide-menu">
                                    Inventory
                                </span>
                            </a>
                            <ul aria-expanded="false" class="collapse">
                                
                                <li><a href="{{route('inven_dashboard')}}">Inventory Dashboard</a></li>
                                <li><a href="{{route('meal_list')}}">Meal List</a></li>
                                <li><a href="{{route('cuisine_type_list')}}">Cuisine Type List</a></li>
                                <li><a href="{{route('menu_item_list')}}">Menu Item List</a></li>
                                <li><a href="{{route('ingredient_list')}}">Ingredient List</a></li>
                                <li><a href="{{route('reorder_list')}}">Reorder List</a></li>
                                <li><a href="{{route('stock_update')}}">Stock Count Update</a></li>
                                   
                            </ul>
                        </li>
                        @if(session()->get('user')->role_flag != 4)
                        <li>
                            <a class="has-arrow " href="#" aria-expanded="false">
                                <i class="mdi mdi-clipboard-text"></i>
                                <span class="hide-menu">
                                    Delivery Order
                                </span>
                            </a>
                            <ul aria-expanded="false" class="collapse">
                                <li><a href="{{route('order_panel')}}">Delivery Order Panel</a></li>                                
                                <li><a href="{{route('order_page','1')}}">Incoming Order</a></li>
                                <li><a href="{{route('order_page','2')}}">Confirm Order</a></li>
                                <li><a href="{{route('order_page','3')}}">Delivered Order</a></li>
                                <li><a href="{{route('order_page','4')}}">Accepted Order</a></li>
                                <!-- <li><a href="{{route('order_history')}}">Order Voucher History</a></li>    -->                                 
                            </ul>
                        </li>

                        <li>
                            <a class="has-arrow " href="#" aria-expanded="false">
                                <i class="mdi mdi-clipboard-text"></i>
                                <span class="hide-menu">
                                    Shop Order
                                </span>
                            </a>
                            <ul aria-expanded="false" class="collapse">
                                <li><a href="{{route('shop_order_panel')}}">Shop Order Panel</a></li>
                                <li><a href="{{route('sale_page')}}">Shop Order</a></li>
                                <li><a href="{{route('pending_lists')}}">Pending Shop Order List</a></li>                                    
                                <li><a href="{{route('finished_lists')}}">Shop Order Voucher List</a></li>                                    
                            </ul>
                        </li>                       

                        <li>
                            <a class="has-arrow " href="#" aria-expanded="false">
                                <i class="mdi mdi-account-multiple-outline"></i>
                                <span class="hide-menu">
                                    Admin
                                </span>
                            </a>
                            <ul aria-expanded="false" class="collapse">
                                <li><a href="{{route('admin_dashboard')}}">Admin Panel</a></li>
                                <li><a href="{{route('purchase_list')}}">Purchase History</a></li>
                                <li><a href="{{route('employee_list')}}">Employee List</a></li>
                                <li><a href="{{route('table_list')}}">Manage Table List</a></li> 
                            </ul>
                        </li>
                        @endif

                        <li>
                            <a href="{{route('logoutprocess')}}"><i class="mdi mdi-power"></i> <span>Logout</span></a>
                        </li>
                    </ul>
                </nav>
                <!-- End Sidebar navigation -->
            </div>
        
        </aside>
        <!-- ============================================================== -->
        <!-- End Left Sidebar - style you can find in sidebar.scss  -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Page wrapper  -->
        <!-- ============================================================== -->
        <div class="page-wrapper">
            <!-- ============================================================== -->
            <!-- Container fluid  -->
            <!-- ============================================================== -->
            <div class="container-fluid">

                <div class="row page-titles">
                    
                    @yield('place')

                    <div class="col-md-7 col-4 align-self-center">
                        <div class="d-flex m-t-10 justify-content-end">
                            <div class="d-flex m-r-20 m-l-10 hidden-md-down">
                                <div class="chart-text m-r-10">
                                    <h6 class="m-b-0"><small>Today Sale</small></h6>
                                    <h4 class="m-t-0 text-info">{{number_format(session()->get('today_sale')) }} MMK</h4></div>
                                <div class="spark-chart">
                                    <div id="monthchart"></div>
                                </div>
                            </div>
                            <div class="d-flex m-r-20 m-l-10 hidden-md-down">
                                <div class="chart-text m-r-10">
                                    <h6 class="m-b-0"><small>Yesterday Sale</small></h6>
                                    <h4 class="m-t-0 text-primary">{{number_format(session()->get('last_day_sale')) }} MMK</h4></div>
                                <div class="spark-chart">
                                    <div id="lastmonthchart"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                @yield('content')

            </div>
            <!-- ============================================================== -->
            <!-- End Container fluid  -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- footer -->
            <!-- ============================================================== -->
            <footer class="footer"> © 2020 KwinTechnology  Co.td </footer>
            <!-- ============================================================== -->
            <!-- End footer -->
            <!-- ============================================================== -->
        </div>
        <!-- ============================================================== -->
        <!-- End Page wrapper  -->
        <!-- ============================================================== -->
    </div>
    <!-- ============================================================== -->
    <!-- End Wrapper -->
    <!-- ============================================================== -->
    <!-- ============================================================== -->
    <!-- All Jquery -->
    <!-- ============================================================== -->
    <script src="{{asset('assets/plugins/jquery/jquery.min.js')}}"></script>
    <!-- Bootstrap tether Core JavaScript -->
    <script src="{{asset('assets/plugins/popper/popper.min.js')}}"></script>
    <script src="{{asset('assets/plugins/bootstrap/js/bootstrap.min.js')}}"></script>
    <!-- slimscrollbar scrollbar JavaScript -->
    <script src="{{asset('js/jquery.slimscroll.js')}}"></script>
    <!--Wave Effects -->
    <script src="{{asset('js/waves.js')}}"></script>
    <!--Menu sidebar -->
    <script src="{{asset('js/sidebarmenu.js')}}"></script>
    <!--stickey kit -->
    <script src="{{asset('assets/plugins/sticky-kit-master/dist/sticky-kit.min.js')}}"></script>
    <script src="{{asset('assets/plugins/sparkline/jquery.sparkline.min.js')}}"></script>
    <script src="{{asset('assets/plugins/sparkline/jquery.sparkline.min.js')}}"></script>
    <!--Custom JavaScript -->
    <script src="{{asset('js/custom.min.js')}}"></script>

    <!--c3 JavaScript -->
    <script src="{{asset('assets/plugins/d3/d3.min.js')}}"></script>
    
    <script src="{{asset('assets/plugins/c3-master/c3.min.js')}}"></script>

    <script src="{{asset('assets/plugins/dropify/dist/js/dropify.min.js')}}"></script>
    
    <script src="{{asset('assets/plugins/popper/popper.min.js')}}"></script>
    
    <script src="{{asset('assets/plugins/multiselect/js/jquery.multi-select.js')}}" type="text/javascript"></script>
    
    <script src="{{asset('assets/plugins/select2/dist/js/select2.full.min.js')}}" type="text/javascript"></script>
    
    <script src="{{asset('js/validation.js')}}"></script>
    
    <script src="{{ asset('js/dist/js/qrcode-reader.min.js')}}"></script>

    <script src="{{asset('assets/plugins/moment/moment.js')}}"></script>

    <script src="{{asset('assets/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js')}}"></script>

    <script src="{{asset('assets/plugins/datatables/jquery.dataTables.min.js')}}"></script>

    @yield('js')

    
    
</body>

</html>
