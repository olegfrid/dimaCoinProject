var checkedCoins=[];
var MAX_NUMBER_OF_COINS_TO_CHOOSE = 5;

function getAll() {
    getData("https://api.coingecko.com/api/v3/coins/list")
}

function search() {
    const inputText = $('#inputField').val()
    getData("https://restcountries.eu/rest/v2/name/" + inputText);
}

function getData(url) {
    const ajaxParameters = {}
    ajaxParameters.url = url
    ajaxParameters.success = handleResult
    ajaxParameters.type = 'GET'
    ajaxParameters.error = handleError
    $('#results').html('');
    $.ajax(ajaxParameters)
}

function handleResult(result, status, xhr) {
    console.log("result: ", result)
    console.log("status: ", status)
    console.log("xhr: ", xhr)
    fields = ['symbol','name'];
    //generateTable('results', 'resultsTable', result, tableColumnNames);
    //generateDivTable('results', 'resultsTable', result, tableColumnNames);
    result = result.slice(0,99);
    generateSimpleDivs('results', 'coin', result, fields);

}

function handleError(xhr, status, error) {
    $('#results').append('<h1> No countries found !<h1>');
    console.log("error: ", error)
    console.log("status: ", status)
    console.log(">>>xhr: ", xhr)
}

function generateSimpleDivs(elementIdWhereToGenerateTheDiv, className, data, keyNames) {
    data.forEach(coin => {
        var divId=coin.id;
        $('#' + elementIdWhereToGenerateTheDiv).append('<div id=\'' + divId + '\' class=\'' + className + '\'></div>');
        let valueToPutIn='';
        keyNames.forEach(key => {
            switch(key) {
                case 'symbol':
                    valueToPutIn +='<div class=\"symbol-and-toggle\">'
                    valueToPutIn += '<span class=\"coin-'+ key + '\">'+ coin[key] + '</span>';
                    valueToPutIn += '<input id=\"'+divId+'Toggle\" class=\"toggle\" type=\"checkbox\" />'
                    valueToPutIn += '</div>'
                    break;
                // case 'name':
                //     valueToPutIn += '<img src=\"' + coin[key] + '\">';
                //     break;
                default:
                    valueToPutIn += '<p class=\"coin-'+ key + '\">'+ coin[key] +'</p>';   
            }
        });
        valueToPutIn += '<button type=\"button\" class=\"btn btn-primary coin-more-info\">More Info</button>'
        var toGenerate = '<div class=\'coin-info\'>' + valueToPutIn + '</div>';
        $('#' + divId).append(toGenerate);
        $('#'+ divId+'Toggle').change(function(){
            if($(this).is(':checked')) {
                console.log("checked ! ",divId);
                if (checkedCoins.length<MAX_NUMBER_OF_COINS_TO_CHOOSE){
                    checkedCoins.push(coin);
                } else{
                    $(this).prop("checked", false);
                    alert("more than "+MAX_NUMBER_OF_COINS_TO_CHOOSE+" coins where chosen");
                }
                
            } else {
                checkedCoins=checkedCoins.filter ((checkedCoin) => {
                    return checkedCoin.id != coin.id;
                });
                console.log("checkesCoins = ",checkedCoins);
            }
        });
    });
}