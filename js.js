var cur_players, cur_round, cur_view, rounds, locked;

$(document).ready( function() {
    cur_players = 3;
    cur_round = 1;
	cur_view = 1;
    rounds = $('.row').length-2;
    locked = false;
    var $pl_num = $('#players_number');
    $pl_num.val(cur_players);
    $pl_num.change(function() {
        var now = Number($pl_num.val());
        if (now > cur_players) {
            addPlayer(now);
        } else {
            removePlayer(now);
        }
    });

    $('.start_round').click(function() {
        var tmp = $(this).attr('class');
        var predicted = similar(tmp, 'start_round', 'predicted');
        var achieved = similar(tmp, 'start_round', 'achieved');
        //TODO disable button for a while... maybe a second lock global variable?
        if ($(this).val() == 'Start' && locked == false) {
            $(predicted).attr('disabled','disabled');
            $(achieved).removeAttr('disabled');
			var msg = $('.message.round'+cur_round);
			$(msg).removeClass('info-msg error-msg').addClass('info-msg').html('Round '+cur_round+' started').fadeIn().delay(3000).fadeOut();
            $(this).val('Done');
            locked = true;
        } else if ($(this).val() == 'Done' && locked == true) {
            if (!checkAchieved()) {
                $(achieved).val(0);
                $('.result.round'+cur_round).html('');
                var msg = $('.message.round'+cur_round);
				$(msg).removeClass('info-msg error-msg').addClass('error-msg').html('Wrong Numbers Given').fadeIn().delay(3000).fadeOut();
            } else {
                $(achieved).attr('disabled','disabled');
                $(this).val('Next');
                locked = false;
                $('.achieved.round'+cur_round).each(computeScore);
                addScore();
				var msg = $('.message.round'+cur_round);
				$(msg).removeClass('info-msg error-msg').addClass('info-msg').html('Round completed').fadeIn();
            }
        } else if ($(this).val() == 'Next' && locked == false) {
            nextRound({pass: true});
        }
    });

    $('input[type="number"]').focus(function() {
        $(this).val('');
    });

    $('input[type="number"]').blur(function() {
        if( $(this).val() == '' )
            $(this).val(0);
    });

    $(document).keydown(function(event) {
        if (event.which == 39 || event.which == 40) {
            nextRound({pass: false});
        } else if (event.which == 37 || event.which == 38) {
            previousRound();
        }
    });

    $('.next').click({pass: true}, nextRound);

    $('.previous').click(previousRound);

    $('.predicted').change(checkBounds);
    $('.achieved').change(checkBounds);

    $('.achieved').change(computeScore);
});

function computeScore() {
    ach = Number($(this).val(), 10);
    var playerID = Number($(this).attr('data-player-id'), 10);
    var roundNum = Number($(this).attr('data-round-num'), 10);
//        var tmp = $(this).attr('class');
//        var predicted = similar(tmp, 'achieved', 'predicted');
//        var result = similar(tmp, 'achieved', 'result');
//        var pred = Number($(predicted).val(), 10);
    var pred = Number($('.predicted.player'+playerID+'.round'+roundNum).val(), 10);
    var res = (pred == ach) ? 20 + ach*10 : Math.abs(ach-pred)*(-10);
    $('.result.player'+playerID+'.round'+roundNum).html(res);
}

function checkBounds() {
    if ($(this).val() > cur_round)
        $(this).val(cur_round);
    if ($(this).val() < 0)
	$(this).val(0);
}

function similar(classes, remove, replace_with) {
    return classes.replace(remove,' '+replace_with).replace(/ /g,'.');
}

function checkAchieved() {
    var sum = 0;
    $('.achieved.round'+cur_round).each(function() {
        sum += Number($(this).val(), 10);
    });
    if (sum != cur_round) {
        return false;
    } else {
        return true;
    }
}

function addScore() {
    var playersNum = $('.pls').length;
    for (var i = 1; i <= playersNum; i++) {
        var roundPoints = Number($('.result.player'+i+'.round'+cur_round).html(), 10);
        var score = Number($('.score.player'+i).html(), 10);
        $('.score.player'+i).html(score+roundPoints);
    }
}

function nextRound(map) {
    if (!locked && cur_view != rounds) {
		if (map.pass) {
			$('div.round'+cur_round).fadeOut('fast');
			$('.start_round.round'+cur_round).prop('disabled', true);
			cur_round++;
			cur_view++;
			$('#cur_round').html(cur_round);
			$('div.round'+cur_round).fadeOut('fast').delay(300).fadeIn('slow');
		} else {
			$('div.round'+cur_view).fadeOut('fast');
			cur_view++;
			$('div.round'+cur_view).fadeOut('fast').delay(300).fadeIn('slow');
		}
    }
}

function previousRound() {
    if (!locked && cur_view != 1) {
        $('div.round'+cur_view).fadeOut('fast');
		cur_view--;
        $('div.round'+cur_view).fadeOut('fast').delay(300).fadeIn('slow');
    }
}

function addPlayer(now) {
    while (cur_players < now) {
        ++cur_players;
        $('#players_names').append( 
            '<label class=\"pl_name\"><span>Name ' + cur_players +
            ':</span><input type="text" name="player[]' +
            '" /></label>');
    }
    return cur_players;
}

function removePlayer(now) {
    // http://css-tricks.com/useful-nth-child-recipies/    
    $('.pl_name:nth-child(n+' + (now+1) + ')').remove();
    return now;
}

