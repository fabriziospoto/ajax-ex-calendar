// https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l’API non possa ritornare festività.
// Attenzione!
// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all’API quali sono le festività per il mese scelto
// Evidenziare le festività nella lista

$( document ).ready(function() {
    //Creo oggetto moment con data 2018-01-01
    //var corrente = moment('2018-01-01');
    var corrente = moment($('h1.month').attr('data-this-date'));
    //Funzione giorno mese
    giorni(corrente);
    //Funzione festività
    festivita(corrente);

    $('button#next').click(function(){
        next(corrente);
    })
    ;
    $('button#prev').click(function(){
        prev(corrente);
    });

});

//********FUNZIONI
function giorni(data) {
    $('ul.month-list').empty();

    // Riporto mese e anno di 'coorente' in h1
    var month = data.format('MMMM');
    var year = data.format('YYYY');
    //$('h1.month').html(corrente.format('MMMM') + ' ' + corrente.format('YYYY'));
    $('h1.month').html(month + ' ' + year);
    //Riporto giorni del mese
    var giorniMese = data.daysInMonth();
    //Creo ciclo con Handlebars per far comparire tanti giorni quanti sono i giorni del mese
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    for (var i = 1; i <= giorniMese; i++) {

        var context = {
            day: addZero(i),
            month: data.format('MMMM'),
            completeDate: year + '-' + data.format('MM') + '-' + addZero(i)
        };
        var html = template(context);
        //Riporto giorni in ul li
        $('.month-list').append(html);
    }
}

function festivita(data) {
    $.ajax(
        {
            url: 'https://flynn.boolean.careers/exercises/api/holidays',
            method: 'GET',
            data: {
                year: data.year(),
                month: data.month()
            },
            success: function(risposta){
                //var y = risposta.response;
                // console.log(y);
                // console.log(risposta);
                for (var i = 0; i < risposta.response.length; i++) {
                    var lista = $('li[data-complete-date="' + risposta.response[i].date + '"]');
                    //console.log(risposta.response);

                    //var z = y[i];
                    //console.log(z);
                    // var vacanza = risposta.response;


                    //$('li[data-complete-date="' + vacanza.date + '"]');
                    lista.append('-' + risposta.response[i].name);
                    lista.addClass('red');

                }
            },
            error: function() {
                alert('Attenzione: errore!' + errore);
            }
        }
    );
}

function addZero(n) {
    if (n < 10) {
        return '0' + n;
    }
    return n;
}

function next(data) {
    if(data.month()==11) {
        alert('Non puoi proseguire')
    } else {
        data.add(1, 'months');
        giorni(data);
        festivita(data);
    }
}

function prev(data) {
    if(data.month()==0) {
        alert('Non puoi proseguire')
    } else {
        data.subtract(1, 'months');
        giorni(data);
        festivita(data);
    }
}
