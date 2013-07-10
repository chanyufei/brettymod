$(document).ready(function() {

// Grid
/*
var gridWidth = $(document).width();
var gridHeight = $(document).height();
$('body').append('<div id="grid"></div>');

$('#grid').css({
  "width": gridWidth, 
  "height": gridHeight, 
  "background": 'url(/images/grid-24.png) repeat 0 0', 
  "position": "absolute", 
  "top": "0",
  "left": "0"
});
*/


// FitVids
$('#wrapper').fitVids();
$('.fluid-width-video-wrapper').css('margin-bottom', 30);

$(window).bind('orientationchange', function(e){
  if($('#contact').length != 0) {
    $('#contact input').fadeOut(10);
    $('#contact input').fadeIn(10);
  }
});

// JRIBBBLE https://github.com/tylergaw/jribbble

$.jribbble.getShotsByPlayerId('gastonfig', function (playerShots) {
	var html = [];
	$.each(playerShots.shots, function (i, shot) {
		html.push('<li><a href="' + shot.url + '" target="_blank"><h4>' + shot.title +'</h4><img src="' + shot.image_url + '" ');
		html.push('alt="' + shot.title + '"></a></li>');
	});
		
	$('#shotsByPlayerId').html(html.join(''));
}, {page: 1, per_page: 9});


//		html.push('<h4>by ' + shot.player.name + '</h4><a href="' + shot.url + '">');

/* ================================= Smooth Scrolling from http://css-tricks.com/snippets/jquery/smooth-scrolling/#li-comment-94058 ================================= */

$('a[href*=#]').click(function() {
  if (location.pathname.replace(/^\//,/"\//) == this.pathname.replace(/^\//,/"\//) && location.hostname == this.hostname) {
    var $target = $(this.hash);
    $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
    
    if ($target.length) {
      var targetOffset = $target.offset().top;
      $('html,body').animate({scrollTop: targetOffset}, {duration:700});
      return false;
    }
  }
});



/* ================================= BACK TO TOP ================================= */

// Set variables locally for increased performance
var scroll_timer;
var displayed = false;
var $message = $('.back-to-top');
var $window = $(window);
var top = $(document.body).children(0).position().top;

/* Hide back to top arrow on init */
$message.css('display' , 'none');

// Function that fades in or out the back to top button
var scrollFade = function() {
  window.clearTimeout(scroll_timer);
  scroll_timer = window.setTimeout(function () { // use a timer for performance
      if($window.scrollTop() <= top) // hide if at the top of the page
      {
          displayed = false;
          $message.fadeOut(100);
      }
      else if(displayed == false) // show if scrolling down
      {
          displayed = true;
          $message.stop(true, true).show().click(function () { $message.fadeOut(500); });
      }
  }, 50);

}

// Run function on load
scrollFade();

// Run function on scroll
$window.scroll(function () {
  scrollFade();
});


/* ================================= CONTACT ================================= */

// These first three lines of code compensate for Javascript being turned on and off.
// It simply changes the submit input field from a type of "submit" to a type of "button".

var paraTag = $('input#submit').parent('div');
$(paraTag).children('input').remove();
$(paraTag).append('<input type="button" name="submit" id="submit" value="Send" />');

$('#contact input#submit').click(function() {
    $('#contact form').append('<img src="/images/ajax-loader.gif" class="loaderIcon loader" alt="Loading..." />');
    $('#contact #submit').attr("disabled", "disabled").addClass('disable');

    var name = $('input#name').val();
    var email = $('input#email').val();
    var comments = $('textarea#comments').val();
    var response = $('#response');

    $.ajax({
        type: 'post',
        url: 'sendEmail.php',
        data: 'name=' + name + '&email=' + email + '&comments=' + comments,

        success: function(results) {
            $('#contact img.loaderIcon').fadeOut(1000);
            $('#contact #submit').removeAttr("disabled", "disabled").removeClass('disable');
            $('#contact form').addClass(results);
            response.empty(); // Removes all lis
            var errors = results.split(',');
            
            $('#contact form input, #contact form textarea').each(function(index) {
              $(this).removeClass('error');
            });
            
            $.each(errors, function(key, value) {
              $('#'+value).addClass('error');
            });
            
            if($.inArray('name', errors) > -1) {
              response.append("<li class='error'>Please enter your name.</li>");
            }
            
            if($.inArray('email', errors) > -1) {
              response.append("<li class='error'>Please enter a valid email address.</li>");
            }
            
            if($.inArray('comments', errors) > -1) {
              response.append("<li class='error'>Please leave a comment.</li>");
            }
            
            if($.inArray('success', errors) > -1) {
              response.append("<li class='success'>Thanks for getting in touch. I will reply to your message as soon as possible.<br /> Have a great day.</li>");
              $('#contact form').css('opacity','.3');
              $('#contact #submit').attr("disabled", "disabled").addClass('disable');
            }
            
        }
    });// end ajax
});

// Form placeholder support for older browsers http://webdesignerwall.com/tutorials/cross-browser-html5-placeholder-text
if(!Modernizr.input.placeholder){

	$('[placeholder]').focus(function() {
	  var input = $(this);
	  if (input.val() == input.attr('placeholder')) {
		input.val('');
		input.removeClass('placeholder');
	  }
	}).blur(function() {
	  var input = $(this);
	  if (input.val() == '' || input.val() == input.attr('placeholder')) {
		input.addClass('placeholder');
		input.val(input.attr('placeholder'));
	  }
	}).blur();
	$('[placeholder]').parents('form').submit(function() {
	  $(this).find('[placeholder]').each(function() {
		var input = $(this);
		if (input.val() == input.attr('placeholder')) {
		  input.val('');
		}
	  })
	});

}


/* ================================= WORK PAGES ================================= */
$('.work .more').click(function(e){
  $(this).parents('.work-section').children('.inner-folio').stop().slideToggle();
  $(this).stop().toggleClass('down');
  e.preventDefault();
});


});