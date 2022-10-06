import { apiVin, mainApi, get, del, post, put } from "../urls_et_requetes_API.js";
import { Wine } from "../class/wineClass.js";
/**
 * VARIABLES
 */
var tabDataRefWine = [];
var tabDataRefCombo = [];
var tabWine = [];

/**
 * FONCTIONS
 */
// fonction de confirmation/erreur des envois AJAX
const confirmationMessage = (message) => {
    alert(message);
    setTimeout(getWine, 700);
}
const functError = () => {
    alert('erreur Ajax');
}
// fonctions pour l'envoi des données : POST, PUT
const postData = (data) => {
    post(apiVin, JSON.stringify(data), confirmationMessage('Les données ont bien été ajoutées.'), functError);
}
const editData = (data, code) => {
    put(apiVin + '/' + code, JSON.stringify(data), confirmationMessage('Les modifications ont bien été enregistrées.', functError));
}

//-- Fonctions déclenchées par les boutons du tableau : déclenchement des affichage relatifs VIEW, ADD et EDIT --//
const viewWine = (data) => {
    let code = data.target.value.slice(17);
    getForDataFunctions("view", code);
}
const addWine = () => {
    getForDataFunctions("add");
}
const editWine = (data) => {
    let code = data.target.value.slice(17);
    getForDataFunctions("edit", code);
}
//Fonction déclenchée par le bouton supprimer : déclenchement du scénario de suppression
const removeWine = (data) => {
    let code = data.target.value.slice(19);
    let confirmRemove = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (confirmRemove) {
        del(apiVin + '/' + code, confirmationMessage('Le vin n°' + code + ' a bien été supprimé.'), functError);
    }
}

/**----- REQUÊTES AJAX -----**/
//requêtes AJAX pour créer la table générale
const getWine = () => {
    let tabRequestApi = ['/', '?include=APPELLATION&transform=1', '?include=REGION&transform=1', '?include=COULEUR&transform=1'];
    for (let i = 0; i < tabRequestApi.length; i++) {
        get(apiVin + tabRequestApi[i], dataWineToFormat, functError);
    }
}
//requêtes AJAX pour la création des combos APPELLATION, REGION et COULEUR
const getForDataFunctions = (order, code) => {
    if (order == "add") {
        let tabRequestForCombo = ['APPELLATION?order=NOMAPPELLATION,asc', 'PAYS?order=NOMPAYS,asc', 'REGION?order=NOMREGION,asc',
            'COULEUR?order=NOMCOULEUR,asc'];
        for (let i = 0; i < tabRequestForCombo.length; i++) {
            get(mainApi + tabRequestForCombo[i], dataComboToFormat, functError);
        }
    } else if (order == "view") {
        let tabRequestForCombo = ['APPELLATION', 'REGION', 'COULEUR', 'VIN/' + code];
        for (let i = 0; i < tabRequestForCombo.length; i++) {
            get(mainApi + tabRequestForCombo[i], dataComboToFormat, functError);
        }
    } else if (order == "edit") {
        let tabRequestForCombo = ['APPELLATION', 'REGION', 'PAYS', 'COULEUR', 'VIN/' + code];
        for (let i = 0; i < tabRequestForCombo.length; i++) {
            get(mainApi + tabRequestForCombo[i], dataComboToFormat, functError);
        }
    }
}

/**----- FONCTIONS DE FORMATAGE DES DONNEES -----**/
//réception et formatage des données pour les affichages spécifiques ADD, VIEW et EDIT
const dataComboToFormat = (response) => {
    let data = JSON.parse(response);
    if (data.APPELLATION) {
        tabDataRefCombo[0] = data.APPELLATION.records;
    } else if (data.PAYS) {
        tabDataRefCombo[1] = data.PAYS.records;
    } else if (data.REGION) {
        tabDataRefCombo[2] = data.REGION.records;
    } else if (data.COULEUR) {
        tabDataRefCombo[3] = data.COULEUR.records;
    } else if (data.NOM_CUVEE) {
        tabDataRefCombo[4] = data;
    }
    if (tabDataRefCombo.length == 4) {
        displayPageAdd(tabDataRefCombo);
    } else if (!tabDataRefCombo[1]) {
        displayPageView(tabDataRefCombo);
    } else {
        displayPageEdit(tabDataRefCombo);
    }
}
//compilation des données des API pour afficher les nom des références à partir de leur code
const dataWineToFormat = (response) => {
    let data = JSON.parse(response);
    if (data.VIN.records) {
        tabWine[0] = data.VIN.records;
        //boucle pour parcourir l'item COMMENTAIRE ET LE TRONQUER
        for (let i = 0; i < tabWine[0].length; i++) {
            if (tabWine[0][i][6].length > 15) {
                tabWine[0][i][6] = tabWine[0][i][6].substring(0, 15) + '...';
            }
        }
    } else if (data.VIN[0].APPELLATION) {
        tabDataRefWine[0] = data.VIN;
    } else if (data.VIN[0].REGION) {
        tabDataRefWine[1] = data.VIN;
    } else if (data.VIN[0].COULEUR) {
        tabDataRefWine[2] = data.VIN;
    }
    if (tabDataRefWine.length == 3) {
        for (let i = 0; i < tabDataRefWine[0].length; i++) {
            tabWine[0][i][2] = tabDataRefWine[0][i].APPELLATION[0].NOMAPPELLATION;
            tabWine[0][i][3] = tabDataRefWine[1][i].REGION[0].NOMREGION;
            tabWine[0][i][4] = tabDataRefWine[2][i].COULEUR[0].NOMCOULEUR;
        }
        displayTabWine(tabWine);
    }
}
//gestion des failles XSS
const securityCheck = (data) => {
    console.log(data);
    /*     data.forEach(item => {
            item.forEach(itemDetail => {
                let startScript = itemDetail.indexOf('<script>');
                let endScript = itemDetail.indexOf('</script>');
                if (isNaN(itemDetail) && startScript > 0) {
                    console.log(itemDetail.substring(hasScriptWord, endScript));
                }
            });
        }); */

}
//création de l'affichage de la table
const displayTabWine = (tabWine) => {
/*     securityCheck(tabWine[0]);
 */    let wine = new Wine();
    wine.id_area = 'wineDisplay';
    wine.data = tabWine;
    wine.view = viewWine;
    wine.add = addWine;
    wine.edit = editWine;
    wine.remove = removeWine;
    wine.createTable();
}
//affichage des pages spécifiques : VIEW, ADD, EDIT
const displayPageView = (tab) => {
    securityCheck(tab);
    let wine = new Wine();
    wine.id_area = 'wineDisplay',
        wine.data = tab;
    wine.freturn = getWine;
    wine.createPageView();
    tabDataRefCombo = [];
}
const displayPageAdd = (data) => {
    let wine = new Wine();
    wine.id_area = 'wineDisplay';
    wine.data = data;
    wine.add = postData;
    wine.freturn = getWine;
    wine.createPageAdd();
}
const displayPageEdit = (data) => {
    let wine = new Wine();
    wine.id_area = 'wineDisplay';
    wine.data = data;
    wine.edit = editData;
    wine.freturn = getWine;
    wine.createPageEdit();
    tabDataRefCombo = [];
}
export { getWine }