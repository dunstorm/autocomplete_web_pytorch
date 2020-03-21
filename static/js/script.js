const predictText = async (data) => {
    const response = await fetch('/predict', {
        method: 'post',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({"text": data})
    });
    const text = await response.text();
    return text;
}

$(document).keydown(function(e){
    if (e.keyCode == 9){
        e.preventDefault();
        $('.input__text').trigger('tab:press');
    }
});

$('.input__text').bind('tab:press', function(){
    var autoValue = $(".predict__part").text();
    var inputText = $('.input__text').val();
    if(/\s+$/.test(inputText)) {
        $(".input__text").val(inputText.trim() + autoValue);
    } else {
        $(".input__text").val(inputText + autoValue);
    }
});

$('.input__text').keyup(function(e) {
    var inputText = $('.input__text').val();
    $('.text__part').text(
        inputText
    );
    predictText(inputText).then(function(returnValue) {
        $('.predict__part').html(
            returnValue.replace(/ /g, '\u00a0')
        );
    })
});