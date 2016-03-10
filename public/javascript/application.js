$(document).ready(function() {

  var buttonIcon = '<a class="btn btn-danger deletebutton" type="submit"><i class="fa fa-trash-o"></i></a>';

  //This creates a table
  $.getJSON("/contact/index", function(allContacts) { 
    allContacts.forEach(function(contact){
      var tr = $('<tr>').attr('data-id', contact.id);
      var td_name = $('<td>').text(contact.name);
      var td_email = $('<td>').text(contact.email);
      var buttonAdd = $('<td>').append(buttonIcon).attr('data-id', contact.id);

      
      $('#table').append(tr);
      td_name.appendTo(tr);
      td_email.appendTo(tr); 
      buttonAdd.appendTo(tr);
    });
    deleteButton();

  }); 


  //This is the contact-save function.  Appends the contact to the end of the index list.
  $('#button').on('click', function(event){
    event.preventDefault();

    var firstsearch = $('#firstbox').val();
    var emailinput = $('#emailbox').val();
    var postData = {name: firstsearch, email: emailinput};
    $.post("/api/contact/save", postData, function(results) {
      if (results.success) {
        var tr = $('<tr>');
        var td_name = $('<td>').text(firstsearch);
        var td_email = $('<td>').text(emailinput);
        var buttonAdd = $('<td>').append(buttonIcon);


        $('#table').append(tr);
        td_name.appendTo(tr);
        td_email.appendTo(tr);
        buttonAdd.appendTo(tr);

      }
      else {
        console.log("nope");
      }
    },'json');
  });

//This adds a class highlighted to the contact list index items that are searched.
  $('#button2').on('click', function(event){
    event.preventDefault();

    $('td').removeClass('highlighted');
    var searchName = $('#searchbyname').val();
    var getData = {name: searchName};
    $('td:contains('+ searchName +')').addClass('highlighted');
  });

//This is the contact destroy function
  
  function deleteButton(){
  $('.deletebutton').on('click', function(event){
    event.preventDefault();


    var buttonDataId = parseInt($(this).parent().attr("data-id"));
    console.log(buttonDataId);
    var postData = {id: buttonDataId};
    $.post("/contact/destroy", postData, function(results){
      if (results.success) {
        $("tr[data-id='" + buttonDataId + "']").remove();
        console.log("it works");
          // location.reload();
      }
      else {
        console.log("its broke!");
      }
  }, 'json');
  });

}

});













/////Below is all Styling JS//////



( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );
