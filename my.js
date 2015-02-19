var current_player = 0;

$( document ).ready( function() {
    var players = $( '.player_info' );
    var players_table = $( '.list-group > a ' );
    var number_of_players = players.length;

    var main_info = $( '.main_info' )[0];
    $( '#all-players' ).css( 'max-height', $( main_info ).css( 'height' ) );

    $( '.next_player' ).click( function() {
        $( players[ current_player ] ).addClass( 'hidden' );
        $( players_table[ current_player ] ).removeClass( 'active' );
        if ( current_player + 1 == number_of_players ) {
            current_player = -1;
        }
        $( players[ current_player + 1 ] ).removeClass( 'hidden' );
        $( players_table[ current_player + 1 ] ).addClass( 'active' );
        current_player++;
    } );

    $( '.previous_player' ).click( function() {
        $( players[ current_player ] ).addClass( 'hidden' );
        $( players_table[ current_player ] ).removeClass( 'active' );
        if ( current_player == 0 ) {
            current_player = number_of_players;
        }
        $( players[ current_player - 1 ] ).removeClass( 'hidden' );
        $( players_table[ current_player - 1 ] ).addClass( 'active' );
        current_player--;
    } );

    players_table.click( function() {
        var player_selected = players_table.index( this );
        if ( player_selected < current_player ) {
            while ( player_selected != current_player ) {
                $( '.previous_player' ).trigger( 'click' );
            }
        } else if ( player_selected > current_player ) {
            while ( player_selected != current_player ) {
                $( '.next_player' ).trigger( 'click' );
            }
        } else {
            return ;
        }
    } );
} );