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
        game.players.push( { 'name' : name, 'score' : 0 } );
    } );
    this.start = true;
    this.gamePlayers = this.players.length;
    this.gameRounds = parseInt( 60 / this.gamePlayers );
    /* Create Panels for Users */
    var hidden_flag = '';
    for ( var i = 0; i < this.gamePlayers ; i++ ) {
        var players_info_html = 
            '<div class="player_info ' + hidden_flag + '">' +
                '<div class="row">' +
                    '<div class="col-xs-6"><small>Player\'s Name</small><h3>' + this.players[ i ].name + '</h3></div>' +
                    '<div class="col-xs-6"><small>Player\'s Score</small><h4>' + this.players[ i ].score + '</h4></div>' +
                '</div>' +
                '<div class="row">' +
                    '<div class="col-xs-9"><h3>Prediction</h3></div>' +
                    '<div class="col-xs-3"><input type="number" name="predicted" min="" max="" value="0" class="inputs predicted"></div>' +
                '</div>' +
                '<div class="row">' +
                    '<div class="col-xs-9"><h3>Achieved</h3></div>' +
                    '<div class="col-xs-3"><input type="number" name="achieved" min="" max="" value="0" class="inputs achieved" disabled="disabled" ></div>' +
                '</div>' +
            '</div>';
        $( '.main_info' ).append( players_info_html );
        hidden_flag = 'hidden';
    }
    /* Create list of Users */
    var active_flag = 'active';
    for ( var i = 0; i < this.gamePlayers ; i++ ) {
        var players_table_html =
            '<a href="#" class="list-group-item ' + active_flag + '">' +
                '<h4 class="list-group-item-heading"> ' + this.players[ i ].name + ' - ' + this.players[ i ].score + '</h4>' +
                '<p class="list-group-item-text">...</p>' +
            '</a>';
        $( '.list-group' ).append( players_table_html );
        active_flag = '';
    }

    this.plPanels = $( '.player_info' );
    this.plTable = $( '.list-group > a ' );
    $( '.current_round' ).html( this.curRound + 1 );

    $( '.jumbotron' ).addClass( 'hidden' );
    $( '.wrapper' ).fadeIn( 'slow' );
};

game.nextPlayer = function() {
    $( game.plPanels[ game.curPlayer ] ).addClass( 'hidden' );
    $( game.plTable[ game.curPlayer ] ).removeClass( 'active' );
    if ( game.curPlayer + 1 == game.gamePlayers ) {
        game.curPlayer = -1;
    }
    $( game.plPanels[ game.curPlayer + 1 ] ).removeClass( 'hidden' );
    $( game.plTable[ game.curPlayer + 1 ] ).addClass( 'active' );
    game.curPlayer++;
}

game.previousPlayer = function() {
    $( game.plPanels[ game.curPlayer ] ).addClass( 'hidden' );
    $( game.plTable[ game.curPlayer ] ).removeClass( 'active' );
    if ( game.curPlayer === 0 ) {
        game.curPlayer = game.gamePlayers;
    }
    $( game.plPanels[ game.curPlayer - 1 ] ).removeClass( 'hidden' );
    $( game.plTable[ game.curPlayer - 1 ] ).addClass( 'active' );
    game.curPlayer--;
}

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
}

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
}

game.removePlayer = function() {
    if ( game.gamePlayers == game.gameMinPlay ) {
        return false;
    }
    $( '#name_' + game.gamePlayers ).parent().parent().remove();
    game.gamePlayers--;
}

game.resetForm = function() {
    $( '.pl_name' ).each( function() {
        $( this ).val( '' );
    } );
    while ( game.gamePlayers != game.gameMinPlay ) {
        $( '.remove_player' ).trigger( 'click' );
    }
}

$( document ).ready( function() {

    $( '.add_player' ).click( game.addPlayer );
    $( '.remove_player' ).click( game.removePlayer );
    $( '.reset_form' ).click( game.resetForm );
    $( '.next_player' ).click( game.nextPlayer );
    $( '.previous_player' ).click( game.previousPlayer );
    $( '.list-group' ).on( 'click', 'a', game.tableChange );
    $( window ).resize( leftPanelResize );

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
    console.log( tmp );
    $( '#left_panel' ).css( 'max-height', tmp );
}
