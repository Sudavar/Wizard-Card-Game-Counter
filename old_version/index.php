<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="style2.css" />
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="js.js" type="text/javascript"></script>
        <meta charset="UTF-8"> 
    </head>
    <body>
<?php
if ( !isset($_POST[ 'game' ]) ):
?>
<form method="post">
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
    echo "<div id=\"score-table\">
			<div class=\"row\">
				<div class=\"inline heading\">Game Round <span id=\"cur_round\">1</span>/$rounds</div>";
    for ($j = 0; $j < $players; $j++) {
        $player_name = $player_names[$j];
        echo "<div class=\"inline heading pls\">$player_name</div>";
    }
    echo "</div><div id=\"holder\">";
    for ($i = 1; $i <= $rounds; $i++) {
        if ($i == 1)
            $display = "";
        else
            $display = "hidden";
        echo "<div class=\"row round$i $display\">";
        echo "<div class=\"inline box\">
				<div class=\"previous inline\">&lt;</div><div class=\"inline\"> $i </div><div class=\"next inline\">&gt;</div><br />
				<div class=\"inline error-box\"><input type=\"button\" class=\"start_round round$i\" value=\"Start\" /></div>
				<div class=\"inline error-box\"><div class=\"hidden message round$i\"></div></div>
			  </div>";
        for ($j = 1; $j <= $players; $j++) {
            ?>
            <div class="inline box">
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
        }
        echo "</div>";
    }
    echo "</div><div class=\"row\"><div class=\"inline heading\"></div>";
    for ($j = 1; $j <= $players; $j++) {
        ?>
            <div class="inline heading">
                <span>Score: </span>
                <div class="inline score player<?php echo $j; ?>"></div>
            </div>
        <?php
    }
    echo "</div>";
?>
</div>
</div>
<style type="text/css">
    .box{ width: <?php echo (100/($players+1)-1); ?>%; }
    .heading{ width: <?php echo (100/($players+1)-1); ?>%; }
</style>
<?php
endif;
?>
    </body>
</html>