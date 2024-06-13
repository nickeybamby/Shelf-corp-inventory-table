/* Custom filtering function which will search data in column four between two values */
$.fn.dataTable.ext.search.push(
  function( settings, data, dataIndex ) {
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
    
    var minAge = parseInt( $('#minAge').val(), 1 );
    var maxAge = parseInt( $('#maxAge').val(), 13 );
    var age = parseFloat( data[3] ) || 0; // use data for the age column
    var ageFound = false;  // Is the age within the range
    
    if ( ( isNaN( minAge ) && isNaN( maxAge ) ) ||
        ( isNaN( minAge ) && age <= maxAge ) ||
        ( minAge <= age   && isNaN( maxAge ) ) ||
        ( minAge <= age   && age <= maxAge ) )
    {
      ageFound = true;
    }
    //return false;
    
    
    var minPrice = parseInt( $('#minPrice').val(), 4499 );
    var maxPrice = parseInt( $('#maxPrice').val(), 33999 );
    var price = intVal( data[5] ) || 0; // use data for the age column
    var priceFound = false;  // Is the price within the range

    if ( ( isNaN( minPrice ) && isNaN( maxPrice ) ) ||
        ( isNaN( minPrice ) && price <= maxPrice ) ||
        ( minPrice <= price   && isNaN( maxPrice ) ) ||
        ( minPrice <= price   && price <= maxPrice ) )
    {
      priceFound = true;
    }

    // Show row if all are within range (all are true) otherwise hide row
    return ageFound && priceFound;  
  }
);

$(document).ready(function() {
  var table = $('#table').DataTable();
  
  // Ion Range Slider
  var $inputFromAge = $(".inputFromAge"),
      $inputToAge = $(".inputToAge");

  $(".rangeAge").ionRangeSlider({
    type: "double", min: 1, max: 13,
    onStart: updateInputs,
    onChange: updateInputs,
    onFinish: updateInputs
  });
  $(".rangeAge").data("ionRangeSlider");

  $inputFromAge.on("input", function () {
    var val = $(this).prop("value");
    if (val < min) { val = min; }
    else if (val > to) { val = to; }
    instance.update({ from: val });
  });

  $inputToAge.on("input", function () {
    var val = $(this).prop("value");
    if (val < from) { val = from; }
    else if (val > max) { val = max; }
    instance.update({ to: val });
  });
  
  var $inputFromPrice = $(".inputFromPrice"),
      $inputToPrice = $(".inputToPrice");

  
  $(".rangePrice").ionRangeSlider({
    type: "double", min: 4499, max: 33999,
    onStart: updateInputs,
    onChange: updateInputs,
    onFinish: updateInputs
  });
  $(".rangePrice").data("ionRangeSlider");

  $inputFromPrice.on("input", function () {
    var val = $(this).prop("value");
    if (val < min) { val = min; }
    else if (val > to) { val = to; }
    instance.update({ from: val });
  });

  $inputToPrice.on("input", function () {
    var val = $(this).prop("value");
    if (val < from) { val = from; }
    else if (val > max) { val = max; }
    instance.update({ to: val });
  });
  
  
  
  function updateInputs(data) {
    from = data.from;
    to = data.to;
    rangeInput = $(data.input);
    
    if (rangeInput.hasClass('rangePrice')) {
      $inputFromPrice.prop("value", from);
      $inputToPrice.prop("value", to);      
    } else {
      $inputFromAge.prop("value", from);
      $inputToAge.prop("value", to);
    }
    table.draw();
  }

  // Event listener to the two range filtering inputs to redraw on input
  $('#min, #max').keyup( function() {
    table.draw();
  } );
} );
