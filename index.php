<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="style2.css" />
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="js.js" type="text/javascript"></script>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">

        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">

        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    </head>
    <body>
<?php
if ( !isset($_POST[ 'game' ]) ):
?>
    <form method="post" autocomplete="off">
        <fieldset class="basic-grey">
            <h1>Wizard Game Settings</h1>
            <label>
                <span>Number of Players: </span>
                <span>3</span>
                    <input id="players_number" name="players_number" type="range" min="3" max="10" step="1" value="3" />
                <span>10</span>
                <input type="hidden" name="game" value="Go">
                <input type="submit" value="Start Game">
            </label>
        </fieldset>
        <fieldset class="basic-grey" id="players_names">
            <label class="pl_name">
                <span>Name 1:</span>
                <input type="text" name="player[]" />
            </label>
            <label class="pl_name">
                <span>Name 2:</span>
                <input type="text" name="player[]" />
            </label>
            <label class="pl_name">
                <span>Name 3:</span>
                <input type="text" name="player[]" />
            </label>
        </fieldset>
    </form>
<?php
else:
    $players = $_POST[ 'players_number' ];
    $rounds = 60 / $players;
    $player_names = $_POST[ 'player' ];
    $columns = 12 / ( $players + 1 );
    ?>
    <div id="score-table" class="container-fluid">
			<div class="row sud-row">
				<div class="col-xs-<?php echo $columns; ?> text-center heading">
                    Game Round <span id="cur_round">1</span> / <?php echo $rounds; ?>
                </div>
                <?php
                for ($j = 0; $j < $players; $j++) {
                    $player_name = $player_names[$j]; ?>
                <div class="col-xs-<?php echo $columns; ?> text-center heading pls">
                    <?php echo $player_name; ?>
                </div>
                <?php } ?>
            </div>
            <div id="holder">
                <?php
                for ( $i = 1; $i <= $rounds; $i++ ) {
                    if ( $i == 1 )
                        $display = "";
                    else
                        $display = "hidden";
                    ?>
                    <div class="row round<?php echo $i . " " . $display; ?>">
                        <div class="col-xs-<?php echo $columns; ?> text-center">
                            <div class="row">
                                <div class="col-xs-3 previous">&lt;</div>
                                <div class="col-xs-3"><?php echo $i; ?></div>
                                <div class="col-xs-3 next">&gt;</div>
                                
                                <div class="clearfix visible-xs-block"></div>
                                
                                <div class="col-xs-6">
                                    <input type="button" class="btn btn-primary start_round round<?php echo $i; ?>" value="Start" />
                                </div>
                                <div class="col-xs-6">
                                    <div class="hidden message round<?php echo $i; ?>"></div>
                                </div>
                            </div>
                        </div>
                        <?php
                        for ( $j = 1; $j <= $players; $j++ ) {
                            ?>
                            <div class="col-xs-<?php echo $columns; ?> text-center">
                                <div class="box-buz">
                                    <span>Prediction: </span>
                                    <input  type="number" name="predicted" min="0" max="<?php echo $i; ?>" value="0"
                                            class="predicted player<?php echo $j; ?> round<?php echo $i; ?>" />
                                </div>
                                <div class="box-buz">
                                    <span>Achieved: </span>
                                    <input  type="number" name="achieved" min="0" max="<?php echo $i; ?>" disabled="disabled" value="0"
                                            data-player-id="<?php echo $j; ?>" data-round-num="<?php echo $i; ?>"
                                            class="achieved player<?php echo $j; ?> round<?php echo $i; ?>" />
                                </div>
                                <div class="box-buz">
                                    <span>Result: </span>
                                    <div class="inline result player<?php echo $j; ?> round<?php echo $i; ?>"></div>
                                </div>
                            </div>
                            <?php
                        } ?>
                    </div>
                <?php } ?>
            </div>
            <div class="sud-row row">
                <div class="inline heading"></div>
                    <?php
                    for ($j = 1; $j <= $players; $j++) {
                        ?>
                            <div class="inline heading">
                                <span>Score: </span>
                                <div class="inline score player<?php echo $j; ?>"></div>
                            </div>
                        <?php
                    } ?>
            </div>
    </div>
    </div>
<!-- <style type="text/css">
    .box{ width: <?php echo (100/($players+1)-1); ?>%; }
    .heading{ width: <?php echo (100/($players+1)-1); ?>%; }
</style> -->
<?php
endif;
?>
    </body>
</html>
