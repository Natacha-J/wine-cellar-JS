import { apiVin, get, post, put, del, mainApi } from '../urls_et_requetes_API.js';
import { Tab } from '../class/tabClass.js';
import { References } from "../class/referencesClass.js";


//fonction de confirmation des envoi Ajax OU retour d'erreur d'envoi
const confirmChangeData = (message, nameApi) => {
    alert(message);
    setTimeout(() => {
        btnCallApi(nameApi);
    }, 700);
}
const functError = () => {
    alert('erreur ajax');
}
// fonctions des appels AJAX : add, edit, remove
const addData = (nameApi, dataPost) => {
    post(mainApi + nameApi, JSON.stringify(dataPost), confirmChangeData('Les données ont bien été enregistrées', nameApi), functError);

}
const editDataSend = (nameApi, codeRef, dataEdit) => {
    put(mainApi + nameApi + '/' + codeRef, JSON.stringify(dataEdit), confirmChangeData('Les données ont bien été changées', nameApi), functError);
}
const removeData = (data) => {
    let code = data.target.value.split('-');
    let confirmationRemove = confirm('Êtes-vous sûr de vouloir supprimer cette ligne ?');
    if (confirmationRemove) {
        del(mainApi + code[1] + '/' + code[2], confirmChangeData('La référence a bien été supprimée.', code[1]), functError);
    }
}

//gestion des boutons d'appel des pages spécifiques - PAGE REFERENCES
const btnCallApi = (data) => {
    let codeApi;
    if (typeof data == "object") {
        codeApi = data.target.value;
    } else {
        codeApi = data;
    }

    if (codeApi == "REGION") {
        get(mainApi + codeApi + '?include=PAYS&transform=1', displayOne, functError);
    } else {
        get(mainApi + codeApi, displayOne, functError);
    }
}

// fonctions qui récupère et traite les données croisées de 2 API
const dataFormatting = (data, refAPI) => {
    let formattedData = [];
    if (refAPI == "REGION") {
        for (let i = 0; i < data.REGION.length; i++) {
            let item = [];
            let regionCode = data.REGION[i].CODEREGION;
            let regionName = data.REGION[i].NOMREGION;
            let countryName = data.REGION[i].PAYS[0].NOMPAYS;
            item.push(regionCode, regionName, countryName);
            formattedData.push(item);
        }
    }
    return formattedData;
}
//***LANCEMENT DES AFFICHAGES***//

//affichage de la page initiale REFERENCES
const referencesDisplay = () => {
    let display = new References();
    display.id_mainArea = 'containerRef';
    display.functClick = btnCallApi;
    display.createMainDisplay();
}
//  affichage section 1 seule référence
const displayOne = (response) => {
    let data = JSON.parse(response);
    let ref = new References();
    ref.id_mainArea = 'containerRef';
    ref.id_area = 'mainDisplayRef';
    ref.functClick = btnCallApi;
    ref.add = prepareDataToDisplayAdd;
    ref.edit = prepareDataToDisplayEdit;
    ref.remove = removeData;
    ref.view = prepareDataToDisplayView;
    ref.freturn = referencesDisplay;
    
    if (data.COULEUR) {
        ref.codeRef = "COULEUR";
        ref.header = ["Code", "Nom de la couleur"];
        ref.data = data.COULEUR.records;
    } else if (data.APPELLATION) {
        ref.codeRef = "APPELLATION";
        ref.header = ["Code", "Nom de l'appellation"];
        ref.data = data.APPELLATION.records;
    } else if (data.PAYS) {
        ref.codeRef = "PAYS";
        ref.header = ["Code", "Nom du pays"];
        ref.data = data.PAYS.records;
    } else if (data.REGION) {
        ref.codeRef = "REGION";
        ref.header = ["Code", "Nom de la région", "Pays"];
        ref.data = dataFormatting(data, ref.codeRef);
    } else if (data.CEPAGE) {
        ref.codeRef = "CEPAGE";
        ref.header = ["Code cépage", "Nom du cépage"];
        ref.data = data.CEPAGE.records;
    } else if (data.MILLESIME) {
        ref.codeRef = "MILLESIME";
        ref.header = ["Code", "Date du millésime"];
        ref.data = data.MILLESIME.records;
    }
    ref.createTabOneRef();
}
const getForCombo = (nameApi, returnFunction, code) => {
    if (returnFunction == prepareDataToDisplayAdd) {
        get(mainApi + nameApi, returnFunction, functError);
    } else if (returnFunction == displayPageView) {
        get(mainApi + nameApi + '?include=PAYS&transform=1', returnFunction, functError);
    } else {
        let tabRequest = [nameApi, 'REGION/' + code];
        for (let i = 0; i < tabRequest.length; i++) {
            get(mainApi + tabRequest[i], returnFunction, functError);
        }
    }
}
//fonction qui retourne les données suivant l'API sélectionnée
const dataApiSelection = (data) => {
    if (data.CODEREGION) {
        tabAllData[0] = "REGION";
        tabAllData[1] = [data.CODEREGION, data.NOMREGION, data.CODEPAYS];
    } else if (data.CODEAPPELLATION) {
        tabAllData[0] = "APPELLATION";
        tabAllData[1] = [data.CODEAPPELLATION, data.NOMAPPELLATION];
    }
     else if (data.CODECOULEUR) {
        tabAllData[0] = "COULEUR";
        tabAllData[1] = [data.CODECOULEUR, data.NOMCOULEUR];
    } else if (data.CODEPAYS) {
        tabAllData[0] = "PAYS";
        tabAllData[1] = [data.CODEPAYS, data.NOMPAYS];
    } else if (data.CODEMILLESIME) {
        tabAllData[0] = "MILLESIME";
        tabAllData[1] = [data.CODEMILLESIME, data.MILLESIME];
    } else if (data.CODECEPAGE) {
        tabAllData[0] = "CEPAGE";
        tabAllData[1] = [data.CODECEPAGE, data.NOMCEPAGE];
    } else if (data.PAYS.records) {
        tabAllData[2] = data.PAYS.records;
    }
    return tabAllData;
}
//--- préparation des données à envoyer pour les affichages spécifiques ---//
const prepareDataToDisplayAdd = (data) => {
    if (data.target == undefined) {
        let datas = JSON.parse(data);
        let tabDatas = [];
        for (const key in datas.PAYS.records) {
            tabDatas.push(datas.PAYS.records[key]);
        }
        displayPageAdd('REGION', tabDatas);
    } else {
        let nameApi = data.target.value.slice(4);
        if (!(nameApi == "REGION")) {
            displayPageAdd(nameApi, []);
        } else {
            getForCombo("PAYS", prepareDataToDisplayAdd);
        }
    }
    
}
var tabAllData = [];
const tabDatasEdit = (response) => {
    let data = JSON.parse(response);
    let tab = dataApiSelection(data);
    displayPageEdit(tab);
};

const prepareDataToDisplayEdit = (data) => {
    let code = data.target.value.split('-');
    if (code[1] == "REGION") {
        getForCombo("PAYS", tabDatasEdit, code[2]);
    } else {
        get(mainApi + code[1] + '/' + code[2], tabDatasEdit, functError);
    }
}
const tabDatasView = (response) => {
    let data = JSON.parse(response);
    let tab = dataApiSelection(data);
    displayPageView(tab);
}
const prepareDataToDisplayView = (data) => {
    let code = data.target.value.split('-');
    if (code[1] == "REGION") {
        getForCombo("PAYS", tabDatasView, code[2]);
    } else {
        get(mainApi + code[1] + '/' + code[2], tabDatasView, functError);
    }
}
// fonctions pour les créations d'affichages spécifiques CRUD
const displayPageView = (tabData) => {
    let form = new References();
    form.codeRef = tabData[0];
    form.id_mainArea = 'containerRef';
    form.id_area = 'mainDisplayRef';
    form.editValue = tabData[1];
    form.data = tabData[2];
    form.functClick = btnCallApi;
    form.freturn = btnCallApi;
    form.viewRef();
}
const displayPageAdd = (nameApi, tabData) => {
    let form = new References();
    form.codeRef = nameApi;
    form.id_mainArea = 'containerRef';
    form.id_area = 'mainDisplayRef';
    form.add = addData;
    form.data = tabData;
    form.functClick = btnCallApi;
    form.freturn = btnCallApi;
    form.createNewRef();
}

const displayPageEdit = (data) => {
    let form = new References();
    form.codeRef = data[0];
    form.id_mainArea = 'containerRef';
    form.id_area = 'mainDisplayRef';
    form.editValue = data[1];
    form.data = data[2];
    form.edit = editDataSend;
    form.functClick = btnCallApi;
    form.freturn = btnCallApi;
    form.editRef();
}

export { referencesDisplay }