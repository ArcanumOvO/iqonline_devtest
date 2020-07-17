/* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Andrew Stromnov (stromnov@gmail.com). */
( function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define( [ "../widgets/datepicker" ], factory );
    } else {

        // Browser globals
        factory( jQuery.datepicker );
    }
}( function( datepicker ) {

    datepicker.regional.ru = {
        closeText: "Закрыть",
        prevText: "&#x3C;Пред",
        nextText: "След&#x3E;",
        currentText: "Сегодня",
        monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь",
            "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
        monthNamesShort: [ "Янв","Фев","Мар","Апр","Май","Июн",
            "Июл","Авг","Сен","Окт","Ноя","Дек" ],
        dayNames: [ "воскресенье","понедельник","вторник","среда","четверг","пятница","суббота" ],
        dayNamesShort: [ "вск","пнд","втр","срд","чтв","птн","сбт" ],
        dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
        weekHeader: "Нед",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: "" };
    datepicker.setDefaults( datepicker.regional.ru );

    return datepicker.regional.ru;

} ) );

$( function() {
    $( "#calc__date" ).datepicker($.datepicker.regional["ru"]);
    $( ".slider" ).slider({
        animate: "fast",
        range: "min",
        min: 1000,
        max: 3000000,
        value: 10000,
        step: 1000,
        slide: function( event, ui ) {
            let target = this.getAttribute('data-target')
            $('#'+target).val(ui.value)
        },
    });
    $("#slider-2").slider({
        disabled: true,
    })
    $("#submit").click(function (e) {
        e.preventDefault()
        validate()
    })
    $("input[name=calc_plus]").on('change',function (e) {
        $("#calc__plus").toggleClass('calculator__input_disabled')
        $("#calc__plus").prop('disabled', function(i, val) {
            return !val;
        })
        let option = $( "#slider-2" ).slider("option", "disabled");
        $("#slider-2").slider('option', {
            disabled: !option,
        })
    })
    $("#calc__sum, #calc__plus").on('change', function () {
        let target = this.getAttribute('data-target')
        $('#'+target).slider('option', {
            value: this.value,
        })
    })
} );

function calculate() {
    $.ajax({
        url: "./calc.php",
        method: 'POST',
        data: $('#calc').serialize(),
        beforeSend(xhr){
            $('.calculator__grid').css({
                opacity: '0.2',
            })
        },
        success(data){
            $('.calculator__grid').css({
                opacity: '1',
            })
            $("#result").html(data + ' руб')
        },
    })
}

function validate() {
    $(".error").remove()
    let counter = 0
    let date = $('#calc__date').val();
    let summ = $('#calc__sum').val();
    let calcTime = $('#calc__time').val();
    if ($("#radio_yes").is(":checked")) {
        let calcPlus = $('#calc__plus').val()
        if (!calcPlus) {
            $('#calc__plus').after('<span class="error">Поле не должно быть пустным</span>');
            counter++
        }
    }
    if (!date) {
        $('#calc__date').after('<span class="error">Поле не должно быть пустным</span>');
        counter++
    }
    if (!summ) {
        $('#calc__sum').after('<span class="error">Поле не должно быть пустным</span>');
        counter++
    }
    if (!calc__time) {
        $('#email').after('<span class="error">Поле не должно быть пустным</span>');
        counter++
    }
    if (!counter>0) {
        calculate()
    }
}


