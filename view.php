<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/bootstrap-theme.min.css" />
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="my.js"></script>
</head>
<div class="wrapper">
    <div class="row">
        <div class="col-xs-1"></div>
        <div class="col-xs-8">
            <div class="player_info">
            <div class="row">
                <div class="col-xs-6"><h3>Sudavar</h3></div>
                <div class="col-xs-6"><h4>Player's Score</h4>XXX</div>
            </div>
            <div class="row">
                <div class="col-xs-9"><h3>Prediction</h3></div>
                <div class="col-xs-3"><input type="number" name="predicted" min="" max="" value="0" class="inputs predicted"></div>
            </div>
            <div class="row">
                <div class="col-xs-9"><h3>Achieved</h3></div>
                <div class="col-xs-3"><input type="number" name="achieved" min="" max="" value="0" class="inputs achieved"></div>
            </div>
            </div>
            <div class="player_info hidden">
            <div class="row">
                <div class="col-xs-6"><h3>Arsen</h3></div>
                <div class="col-xs-6"><h4>Player's Score</h4>XXX</div>
            </div>
            <div class="row">
                <div class="col-xs-9"><h3>Prediction</h3></div>
                <div class="col-xs-3"><input type="number" name="predicted" min="" max="" value="0" class="inputs predicted"></div>
            </div>
            <div class="row">
                <div class="col-xs-9"><h3>Achieved</h3></div>
                <div class="col-xs-3"><input type="number" name="achieved" min="" max="" value="0" class="inputs achieved"></div>
            </div>
            </div>
            <div class="player_info hidden">
            <div class="row">
                <div class="col-xs-6"><h3>Mike</h3></div>
                <div class="col-xs-6"><h4>Player's Score</h4>XXX</div>
            </div>
            <div class="row">
                <div class="col-xs-9"><h3>Prediction</h3></div>
                <div class="col-xs-3"><input type="number" name="predicted" min="" max="" value="0" class="inputs predicted"></div>
            </div>
            <div class="row">
                <div class="col-xs-9"><h3>Achieved</h3></div>
                <div class="col-xs-3"><input type="number" name="achieved" min="" max="" value="0" class="inputs achieved"></div>
            </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <span class="glyphicon glyphicon-chevron-left clickable previous_player" aria-hidden="true"></span>
                </div>
                <div class="col-xs-6">
                    <span class="glyphicon glyphicon-chevron-right clickable next_player" aria-hidden="true"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <div class="col-xs-6"><h4>ROUND</h4></div>
                    <div class="col-xs-6"><h4>XX / 20</h4></div>
                </div>
                <div class="col-xs-6">
                    <div class="col-xs-4">
                        <input type="button" class="btn btn-primary disabled" value="Previous" />
                    </div>
                    <div class="col-xs-4">
                        <input type="button" class="btn btn-primary " value="Next" />
                    </div>
                    <div class="col-xs-4">
                        <input type="button" class="btn btn-primary " value="Start" />
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-3">
            <div class="list-group" id="all-players">
                <a href="#" class="list-group-item active">
                    <h4 class="list-group-item-heading">Sudavar - XXX</h4>
                    <p class="list-group-item-text">...</p>
                </a>
                <a href="#" class="list-group-item ">
                    <h4 class="list-group-item-heading">Arsen - XXX</h4>
                    <p class="list-group-item-text">...</p>
                </a>
                <a href="#" class="list-group-item ">
                    <h4 class="list-group-item-heading">Mike - XXX</h4>
                    <p class="list-group-item-text">...</p>
                </a>
            </div>
        </div>
    </div>
</div>