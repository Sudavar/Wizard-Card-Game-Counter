<!DOCTYPE html>
<html>
    <head>
        <title>Counter for Card Game Wizard</title>
        <meta name="keywords" content="HTML5, CSS3, Jquery, Wizard Game, Card Game">
        <meta name="description" content="Counter for Card Game Wizard">
        <meta name="author" content="Sudavar">
        <meta charset="UTF-8">
        <link rel="stylesheet" href="css/bootstrap.min.css" />
        <link rel="stylesheet" href="css/bootstrap-theme.min.css" />
        <link rel="stylesheet" type="text/css" href="style.css" />
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="game-counter.js"></script>
    </head>
    <body>
        <div class="jumbotron"><div class="container">
            <h1>Wizard Card Game Counter</h1>
            <p>Some info about the application.</p>
            <form class="form-horizontal" id="form"  autocomplete="on">
                <div class="form-group">
                    <div class="col-xs-3">
                        <button type="button" class="btn btn-default reset_form">Reset</button>
                    </div>
                    <div class="col-xs-3">
                        <button type="submit" class="btn btn-default">Start Game</button>
                    </div>
                    <div class="col-xs-offset-2 col-xs-4 col-sm-offset-3 col-sm-3">
                        <button type="button" class="btn btn-default add_player">+</button>
                        <button type="button" class="btn btn-default remove_player">-</button>
                    </div>
                </div>
                <div class="player_names"><div class="form-group">
                    <label for="name_1" class="col-xs-4 control-label">Name 1:</label>
                    <div class="col-xs-6">
                        <input type="text" class="pl_name form-control" id="name_1" name="name_1" placeholder="" required="required" >
                    </div>
                </div>
                <div class="form-group">
                    <label for="name_2" class="col-xs-4 control-label">Name 2:</label>
                    <div class="col-xs-6">
                        <input type="text" class="pl_name form-control" id="name_2" name="name_2" placeholder="" required="required" >
                    </div>
                </div>
                <div class="form-group">
                    <label for="name_3" class="col-xs-4 control-label">Name 3:</label>
                    <div class="col-xs-6">
                        <input type="text" class="pl_name form-control" id="name_3" name="name_3" placeholder="" required="required" >
                    </div>
                </div></div>
            </form>
        </div></div>
        <div class="content container-fluid wrapper" style="display: none;">
            <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-sm-9 col-lg-8" id="main_panel" >
                    <div class="main_info"></div>
                    <div class="row">
                        <div class="col-xs-6">
                            <span class="glyphicon glyphicon-chevron-left clickable previous_player" aria-hidden="true"></span>
                        </div>
                        <div class="col-xs-6">
                            <span class="glyphicon glyphicon-chevron-right clickable next_player" aria-hidden="true"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-5 col-sm-6">
                            <div class="col-sm-5"><h4>ROUND</h4></div>
                            <div class="col-sm-7"><h4><span class="current_round"></span> / 20</h4></div>
                        </div>
                        <div class="col-xs-7 col-sm-6">
                            <div class="col-xs-6 col-sm-4">
                                <input type="button" class="btn btn-primary disabled" value="&larr;" />
                            </div>
                            <div class="col-xs-6 col-sm-4">
                                <input type="button" class="btn btn-primary disabled" value="&rarr;" />
                            </div>
                            <div class="col-xs-12 col-sm-4">
                                <input type="button" class="btn btn-primary " value="Start" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 col-lg-3 all_players" id="left_panel">
                    <h2>Players List</h3>
                    <div class="list-group"></div>
                </div>
            </div>
        </div>
    </body>
</html>