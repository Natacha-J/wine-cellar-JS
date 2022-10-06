/**
 * DECLARATION DES URLS API
 */
const mainApi = 'https://afpafabrice.space/DWWM21050/Api/api.php/';
const apiVin = 'https://afpafabrice.space/DWWM21050/Api/api.php/VIN';

/**
 * FONCTIONS DE REQUETES
 */
function get(urlA, fonctSuccess, fonctError) {
    $.ajax({
        url: urlA,
        type: 'GET',
        dataType: 'html', // On désire recevoir du HTML
        success: fonctSuccess,
        error: fonctError
    });

}

function post(urlA, donnees, fonctSuccess, fonctError) {
    $.ajax({
        url: urlA,
        type: 'POST', // Le type de la requête HTTP, ici devenu POST
        data: donnees,
        dataType: 'json',
        success: fonctSuccess,
        error: fonctError
    });
}

function put(urlA, donnees, fonctSuccess, fonctError) {
    $.ajax({
        url: urlA,
        type: 'PUT', // Le type de la requête HTTP, ici devenu PUT
        data: donnees,
        dataType: 'json',
        success: fonctSuccess,
        error: fonctError
    });
}

function del(urlA, fonctSuccess, fonctError) {
    $.ajax({
        url: urlA,
        type: 'DELETE',
        dataType: 'html', // On désire recevoir du HTML
        success: fonctSuccess,
        error: fonctError
    });

}

export { mainApi, apiVin, get, post, put, del }