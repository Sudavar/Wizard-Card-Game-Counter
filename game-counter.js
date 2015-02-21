var game = {	
    players	    : [], 
	start	    : false,
	gameRounds	: 0,
    gamePlayers : 3,
    gameMaxPlay : 6,
    gameMinPlay : 3,
    curRound    : 0,
    curPlayer   : 0
};

game.setGame = function() {
    $( '.pl_name' ).each( function() {
        var name = $( this ).val();
        game.players.push( { 'name' : name, 'score' : [ 0 ], 'total' : 0, 'predicted' : [], 'achieved' : [] } );
    } );
    this.start = true;
    this.gamePlayers = this.players.length;
    this.gameRounds = Number( 60 / this.gamePlayers, 10 );
    /* Create Panels for Users */
    var max = this.curRound + 1;
    var hidden_flag = '';
    var disabled_flag = '';
    for ( var i = 0; i < this.gamePlayers ; i++ ) {
        var players_info_html = 
            '<div class="player_info ' + hidden_flag + '">' +
                '<div class="row">' +
                    '<div class="col-xs-6"><small>Player\'s Name</small><h3>' + this.players[ i ].name + '</h3></div>' +
                    '<div class="col-xs-6"><small>Player\'s Score</small><h3 class="player_score">' + this.players[ i ].score[ 0 ] + '</h3></div>' +
                '</div>' +
                '<div class="row">' +
                    '<div class="col-sm-8"><h3>Prediction</h3></div>' +
                    '<div class="col-sm-4">' +
                        '<div class="row">' +
                            '<div class="col-sm-4">' +
                                '<input type="number" name="prediction" min="0" max="' + max + '" value="0" class="inputs prediction" ' + disabled_flag + ' >' +
                            '</div>' +
                            '<div class="col-sm-4">' +
                                '<span class="glyphicon glyphicon-ok clickable prediction_lock ' + hidden_flag + '" aria-hidden="true"></span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="row achieved_row" style="display: none;" >' +
                    '<div class="col-sm-8"><h3>Achieved</h3></div>' +
                    '<div class="col-sm-4">' +
                        '<div class="row">' +
                            '<div class="col-sm-4">' +
                                '<input type="number" name="achieved" min="0" max="' + max + '" value="0" class="inputs achieved" >' +
                            '</div>' +
                        '</div>' +
                '</div>' +
            '</div>';
        $( '.main_info' ).append( players_info_html );
        hidden_flag = 'hidden';
        disabled_flag = 'disabled="disabled"';
    }
    /* Create list of Users */
    var active_flag = 'active';
    for ( var i = 0; i < this.gamePlayers ; i++ ) {
        var players_table_html =
            '<a href="#" class="list-group-item ' + active_flag + '">' +
                '<h5 class="list-group-item-heading"> ' + this.players[ i ].name + '</h5>' +
                '<p class="list-group-item-text">Score: <span class="list_player_score">' + this.players[ i ].score[ 0 ] + '</span></p>' +
            '</a>';
        $( '.list-group' ).append( players_table_html );
        active_flag = '';
    }
    this.plPanels = $( '.player_info' );
    this.plTable = $( '.list-group > a ' );
    $( '.current_round' ).html( this.curRound + 1 );

    $( '.jumbotron' ).addClass( 'hidden' );
    $( '.wrapper' ).fadeIn( 'slow' );

    $( '.prediction_lock' ).click( game.lockPrediction );
    $( '#start_round' ).click( game.startRound );
    $( '#finish_round' ).click( game.finishRound );
};

game.lockPrediction = function() {
    /* If last player, make the adjustment for extra rule */
    if ( $( this ).hasClass( 'glyphicon-ok' ) ) {
        game.players[ game.curPlayer ].predicted[ game.curRound ] = Number( $( '.prediction:visible' ).val(), 10 );
        $( '.prediction:visible' ).prop( 'disabled', true );
        if ( game.curPlayer + 1 < game.gamePlayers ) {
            $( game.plPanels[ game.curPlayer + 1 ] ).find( '.prediction' ).prop( 'disabled', false );
            $( game.plPanels[ game.curPlayer + 1 ] ).find( '.prediction_lock' ).toggleClass( 'hidden' );
        } else {
            $( '#start_round' ).prop( 'disabled', false );
        }
    } else {
        $( '.prediction:visible' ).prop( 'disabled', false );
    }
    $( this ).toggleClass( 'glyphicon-ok' );
    $( this ).toggleClass( 'glyphicon-lock' );
};

game.startRound = function() {
    $( this ).toggleClass( 'hidden' );
    $( '#finish_round' ).toggleClass( 'hidden' );
    while ( game.curPlayer != 0 ) {
        $( '.next_player' ).trigger( 'click' );
    }
    $( '.achieved_row' ).fadeIn( 'slow' );
};

game.finishRound = function() {
    var sum = 0;
    var i = 0;
    $( '.achieved' ).each( function() {
        sum += Number( $( this ).val(), 10 );
    } );
    if ( sum > game.curRound + 1 ) {
        $( '#wrong_achieved_message' ).find( '.current_round' ).html( game.curRound + 1 );
        $( '#wrong_achieved_message' ).find( '.wrong_achieved' ).html( sum );
        $( '#wrong_achieved_message' ).fadeIn( 'slow' ).delay( 5000 ).fadeOut( 'slow' );
        return false;
    }
    $( '.achieved' ).each( function() {
        var tmpScore = 0;
        game.players[ i ].achieved[ game.curRound ] = Number( $( this ).val(), 10 );
        if ( game.players[ i ].predicted[ game.curRound ] == game.players[ i ].achieved[ game.curRound ] ) {
            tmpScore = 20 + $( this ).val() * 10;
        } else {
            tmpScore = Math.abs( game.players[ i ].predicted[ game.curRound ] - game.players[ i ].achieved[ game.curRound ] ) * ( -10 );
        }
        game.players[ i ].score[ game.curRound ] = tmpScore;
        game.players[ i++ ].total += tmpScore;
    } );
    i = 0;
    $( '.player_score' ).each( function() {
        var tmp = Number( $( this ).html(), 10 );
        tmp += game.players[ i++ ].score[ game.curRound ];
        $( this ).html( tmp );
    } );
    i = 0;
    $( '.list_player_score' ).each( function() {
        var tmp = Number( $( this ).html(), 10 );
        tmp += game.players[ i++ ].score[ game.curRound ];
        $( this ).html( tmp );
    } );
    $( '.current_round' ).html( ++game.curRound + 1 );
    $( this ).toggleClass( 'hidden' );
    $( '#start_round' ).toggleClass( 'hidden' );
    game.roundInit();
};

game.roundInit = function() {
    $( '.achieved' ).val( 0 );
    $( '.prediction' ).val( 0 );
    $( '.achieved_row' ).fadeOut( 'fast' );
    $( '.prediction_lock' ).toggleClass( 'hidden' );
    $( '.prediction_lock' ).toggleClass( 'glyphicon-ok' );
    $( '.prediction_lock' ).toggleClass( 'glyphicon-lock' );
    $( '.prediction' ).prop( 'disabled', true );
    while ( game.curPlayer != 0 ) {
        $( '.next_player' ).trigger( 'click' );
    }
    $( '.prediction:visible' ).prop( 'disabled', false );
    $( game.plPanels[ 0 ] ).find( '.prediction_lock' ).toggleClass( 'hidden' );
    $( '.prediction' ).prop( 'max', game.curRound + 1 );
    $( '.achieved' ).prop( 'max', game.curRound + 1 );
    $( '#start_round' ).prop( 'disabled', true );
}

game.nextPlayer = function( event ) {
    event.preventDefault();
    $( game.plPanels[ game.curPlayer ] ).addClass( 'hidden' );
    $( game.plTable[ game.curPlayer ] ).removeClass( 'active' );
    if ( game.curPlayer + 1 == game.gamePlayers ) {
        game.curPlayer = -1;
    }
    $( game.plPanels[ game.curPlayer + 1 ] ).removeClass( 'hidden' );
    $( game.plTable[ game.curPlayer + 1 ] ).addClass( 'active' );
    game.curPlayer++;
};

game.previousPlayer = function( event ) {
    event.preventDefault();
    $( game.plPanels[ game.curPlayer ] ).addClass( 'hidden' );
    $( game.plTable[ game.curPlayer ] ).removeClass( 'active' );
    if ( game.curPlayer === 0 ) {
        game.curPlayer = game.gamePlayers;
    }
    $( game.plPanels[ game.curPlayer - 1 ] ).removeClass( 'hidden' );
    $( game.plTable[ game.curPlayer - 1 ] ).addClass( 'active' );
    game.curPlayer--;
};

game.tableChange = function() {
    var player_selected = game.plTable.index( this );
    if ( player_selected < game.curPlayer ) {
        while ( player_selected != game.curPlayer ) {
            $( '.previous_player' ).trigger( 'click' );
        }
    } else if ( player_selected > game.curPlayer ) {
        while ( player_selected != game.curPlayer ) {
            $( '.next_player' ).trigger( 'click' );
        }
    } else {
        return ;
    }
};

game.checkBounds = function() {
    if ( $( this ).val() > game.curRound ) {
        $( this ).val( game.curRound + 1 );
    }
    var tmp = Number( $( this ).val(), 10 );
    if ( isNaN( tmp ) || tmp == "" ) {
        tmp = 0;
    }
    console.log( tmp );
    $( this ).val( Math.floor( tmp ) );
};

game.addPlayer = function() {
    if ( game.gamePlayers == game.gameMaxPlay ) {
        return false;
    }
    var x = ++game.gamePlayers;
    var player_input = '<div class="form-group">' +
        '<label for="name_' + x + '" class="col-xs-4 control-label">Name ' + x + ':</label>' +
        '<div class="col-xs-6">' +
            '<input type="text" class="pl_name form-control" id="name_' + x + '" name="name_' + x + '" placeholder="" required="required" >' +
        '</div>' +
    '</div>';
    $( '.player_names' ).append( player_input );
};

game.removePlayer = function() {
    if ( game.gamePlayers == game.gameMinPlay ) {
        return false;
    }
    $( '#name_' + game.gamePlayers ).parent().parent().remove();
    game.gamePlayers--;
};

game.resetForm = function() {
    $( '.pl_name' ).each( function() {
        $( this ).val( '' );
    } );
    while ( game.gamePlayers != game.gameMinPlay ) {
        $( '.remove_player' ).trigger( 'click' );
    }
};

$( document ).ready( function() {

    $( window ).resize( leftPanelResize );
    $( '.add_player' ).click( game.addPlayer );
    $( '.remove_player' ).click( game.removePlayer );
    $( '.reset_form' ).click( game.resetForm );
    $( '.next_player' ).click( game.nextPlayer );
    $( '.previous_player' ).click( game.previousPlayer );
    $( '.list-group' ).on( 'click', 'a', game.tableChange );
    $( '.main_info' ).on( 'change', '.prediction, .achieved', game.checkBounds );
    $( '.main_info' ).on( 'click', '.prediction, .achieved', clearValue );

    $( '#form' ).submit( function( event ) {
		event.preventDefault();
        game.setGame();
		console.log( game );
        setTimeout( leftPanelResize, 500 );
        return false;
	} );

    $( document ).keydown( function( event ) {
        if ( event.which == 39 || event.which == 40 ) {
            game.nextPlayer();
        } else if ( event.which == 37 || event.which == 38 ) {
            game.previousPlayer();
        } else if ( event.which == 107 ) {
            game.addPlayer();
        } else if ( event.which == 109 ) {
            game.removePlayer();
        }
    } );

} );

function leftPanelResize() {
    var tmp = $( $( '#main_panel' )[0] ).height() * 0.9;
    $( '#left_panel' ).css( 'max-height', tmp );
};

function clearValue() {
    $( this ).val( '' );
}
