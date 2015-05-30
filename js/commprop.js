$(document).ready( function() {

  var purchase_price = $("#purchase_price")[0];
  var down_payment = $("#down_payment")[0];
  var balance_at_marriage = $("#balance_at_marriage")[0];
  var balance_at_separation = $("#balance_at_separation")[0];
  var market_at_marriage = $("#market_at_marriage")[0];
  var market_at_separation = $("#market_at_separation")[0];


  var sepprop_percent = $("#sepprop_percent")[0];

  var sepprop_appreciation = $("#sepprop_appreciation")[0];
  var sepprop_appreciation_2 = $("#sepprop_appreciation_2")[0];

  var sepprop_payments = $("#sepprop_payments")[0];
  var sepprop_payments_2 = $("#sepprop_payments_2")[0];


  var commprop_percent = $("#commprop_percent")[0];

  var commprop_appreciation = $("#commprop_appreciation")[0];
  var commprop_appreciation_2 = $("#commprop_appreciation_2")[0];

  var commprop_payments = $("#commprop_payments")[0];
  var commprop_payments_2 = $("#commprop_payments_2")[0];

  var commprop_total = $("#commprop_total")[0];
  var sepprop_total = $("#sepprop_total")[0];
  var total_payments = $("#total_payments")[0];
  var total_appreciation = $("#total_appreciation")[0];

  $('#my_house').prop("checked", true);

  function clearResults() {
    sepprop_percent.innerText = "";

    sepprop_appreciation.innerText = "";
    sepprop_appreciation_2.innerText = "";

    sepprop_payments.innerText = "";
    sepprop_payments_2.innerText = "";

    commprop_percent.innerText = "";

    commprop_appreciation.innerText = "";
    commprop_appreciation_2.innerText = "";

    commprop_payments.innerText = "";
    commprop_payments_2.innerText = "";

    commprop_total.innerText = "";
    sepprop_total.innerText = "";
    total_payments.innerText = "";
    total_appreciation.innerText = "";
    pay_spouse.innerText = "";

  }

  function loadResults () {

    var cp_payments = balance_at_marriage.value - balance_at_separation.value;

    if (cp_payments <= 0) {
      cp_payments = 0;
    }

    var sp_payments = purchase_price.value - balance_at_marriage.value;
    var t_payments = cp_payments + sp_payments;

    var cp_percent = cp_payments / purchase_price.value;
    var sp_percent = 1.0 - cp_percent;

    var cp_appreciation = market_at_separation.value - market_at_marriage.value;
    var sp_appreciation = market_at_marriage.value - purchase_price.value;
    var t_appreciation = cp_appreciation + sp_appreciation;

    var cp_total = cp_payments + ( cp_percent * cp_appreciation );
    var sp_total = sp_payments + sp_appreciation + ( sp_percent * cp_appreciation);

    // .toNumber().formatCurrency();

    commprop_percent.innerText = parseInt(cp_payments / purchase_price.value * 100);
    commprop_appreciation.innerText = cp_appreciation;
    commprop_appreciation_2.innerText = cp_appreciation;
    $("#commprop_appreciation").formatCurrency();
    $("#commprop_appreciation_2").formatCurrency();
    // commprop_appreciation.formatCurrency();

    commprop_payments.innerText = cp_payments;
    commprop_payments_2.innerText = cp_payments;
    $("#commprop_payments").formatCurrency();
    $("#commprop_payments_2").formatCurrency();

    commprop_total.innerText = cp_total;
    $("#commprop_total").formatCurrency();

    pay_spouse.innerText = cp_total / 2;
    $("#pay_spouse").formatCurrency();


    sepprop_percent.innerText = parseInt(100 - (cp_payments / purchase_price.value * 100));
    sepprop_appreciation.innerText = sp_total - sp_payments;
    sepprop_appreciation_2.innerText = sp_appreciation;
    $("#sepprop_appreciation").formatCurrency();
    $("#sepprop_appreciation_2").formatCurrency();

    sepprop_payments.innerText = sp_payments;
    sepprop_payments_2.innerText = sp_payments;
    $("#sepprop_payments").formatCurrency();
    $("#sepprop_payments_2").formatCurrency();

    sepprop_total.innerText = sp_total;
    $("#sepprop_total").formatCurrency();
    total_payments.innerText = t_payments;
    $("#total_payments").formatCurrency();

    total_appreciation.innerText = t_appreciation;
    $("#total_appreciation").formatCurrency();

    if ( $("#my_house").is(":checked") ) {
      $("#separate-property").text("Your Separate Property")
      $(".verbiage_1").html( "<p>You will likely have to pay your spouse " + $("#pay_spouse").text() + " which is one half (50%) of the community property total.</p>");
      $(".verbiage_2").text("This is your separate property your spouse is not entitled to any of it.");
    } else {
      $("#separate-property").text( "Your Spouse's Separate Property");
      $(".verbiage_1").html( "<p>Your spouse will likely have to pay you " + $("#pay_spouse").text() + " which is one half (50%) of the community property total.</p>");
      $(".verbiage_2").text("This is your spouse's separate property you are not entitled to any of it.");
    }

  }

  function isPositiveNumber( input ) {
    return !( isNaN(input) || input <= 0 )
  }

  function validInputValues () {

    if ( isPositiveNumber(purchase_price.value) &&
          isPositiveNumber(balance_at_marriage.value) &&
          isPositiveNumber(balance_at_separation.value) &&
          isPositiveNumber(market_at_separation.value) &&
          isPositiveNumber(market_at_marriage.value) &&
          isPositiveNumber(down_payment.value)
        ) {
      return true;
    } else {
      return false;
    }

  }

  $(".input").change( function () {

    if ( validInputValues() == false ) {
      clearResults();
      $(".all_results").hide();
    } else {
      loadResults();
      $(".all_results").show();
    }

  });

})
