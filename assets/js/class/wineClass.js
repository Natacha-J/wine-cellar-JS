import { Combo } from "../class/comboClass.js";
import { Tab } from "./tabClass.js";

class Wine {
    constructor(id_area = "", data = "", freturn = "", view = "", add = "", edit = "", remove = "") {
        this.id_area = id_area,
        this.nameRef = ['Cuvée', 'Appellation', 'Pays', 'Région', 'Couleur', 'Type_de_culture', 'Commentaires'];
        this.data = data,
        this.freturn = freturn,
        this.view = view,
        this.add = add,
        this.edit = edit,
        this.remove = remove
    }
    //-- FONCTIONS ANNEXES --//
    // création des combos
    createCombo(data, id_zone, select = "") {
        let combo = new Combo();
        combo.id_zone = 'combo' + id_zone;
        combo.id_select = 'list' + id_zone;
        combo.class_select = id_zone;
        combo.selectedItem = select;
        combo.data = data;
        combo.generer();
    }
    //fonction qui créée un tableau avec le nom correspondant au code reçu pour chaque référence
    matchCodeAndValue(data) {
        let viewData = [];
        viewData[0] = data[4].CODEVIN;
        viewData[1] = data[4].NOM_CUVEE;
        for (let i = 0; i < data[0].length; i++) {
            if (data[4].CODEAPPELLATION == data[0][i][0]) {
                viewData[2] = data[0][i][1];
            }
        }
        for (let i = 0; i < data[2].length; i++) {
            if (data[4].CODEREGION == data[2][i][0]) {
                viewData[3] = data[2][i][1]
                viewData[4] = data[2][i][2];
            }
        }
        for (let i = 0; i < data[3].length; i++) {
            if (data[4].CODECOULEUR == data[3][i][0]) {
                viewData[5] = data[3][i][1];
            }
        }
        viewData[6] = data[4].TYPE_DE_CULTURE;
        viewData[7] = data[4].COMMENTAIRES;
        return viewData;
    }
    //-- FONCTIONS PRINCIPALES --//
    //création de la table principale (généré par la classe tabClass)
    createTable() {
        let tab = new Tab();
        tab.id_area = this.id_area;
        tab.id_table = 'tabWine';
        tab.id_div = 'divWine';
        tab.header = ['Code vin', 'Cuvée', 'Appellation', 'Région', 'Couleur', 'Type de culture', 'Commentaires'];
        tab.data = this.data;
        tab.functView = this.view;
        tab.functAdd = this.add;
        tab.functEdit = this.edit;
        tab.functRemove = this.remove;
        tab.createTabWine();
    }
    //création de la page d'ajout
    createPageAdd() {
        //remise à zéro de la zone d'affichage
        $('#' + this.id_area).html("<section></section>");

        //*** ajout du titre et des différents champs de saisie en input ou combos avec la fonction createCombo ***//
        $('<h2>Ajout d\'un nouveau vin</h2>').prependTo('#' + this.id_area);
        $('<div><label for="' + this.nameRef[0] + '">' + this.nameRef[0] + ' : </label><input type="text" id="' + this.nameRef[0] + '"></div>').appendTo('section');
        $('<div>' + this.nameRef[1] + ' : <span id="combo' + this.nameRef[1] + '"></span></div>').appendTo('section');
        this.createCombo(this.data[0], this.nameRef[1]);
        $('<div>' + this.nameRef[2] + ' : <span id="combo' + this.nameRef[2] + '"></span></div>').appendTo('section');
        this.createCombo(this.data[1], this.nameRef[2]);
        //bouton de validation du PAYS pour intégrer le combo REGION
        $('<button type="button" class="validatePays" id="btnValidationRegion" value="">Valider le pays</button>').appendTo('section');
        $('<div id="region" hidden>Région : <span id="combo' + this.nameRef[3] + '"></span></div>').appendTo('section');
        $('#btnValidationRegion').on('click', () => {
            let valPays = $('#listPays').val();
            $('#region').show();
            $('#' + this.nameRef[3]).html('<span>' + this.nameRef[3] + '</span>');
            this.createCombo(this.data[2], this.nameRef[3], valPays);
        });
        $('<div>' + this.nameRef[4] + ' : <span id="combo' + this.nameRef[4] + '"></span></div>').appendTo('section');
        this.createCombo(this.data[3], this.nameRef[4]);
        $('<div><label for="' + this.nameRef[5] + '">Type de culture : </label><input type="text" id="' + this.nameRef[5] + '"></div>').appendTo('section');
        $('<div><label for="' + this.nameRef[6] + '">' + this.nameRef[6] + ' : </label><textarea type="text" id="' + this.nameRef[6] + '"></textarea></div>').appendTo('section');

        //insertion des boutons validation et retour
        $('<button type="button" class="validate" id="btnValidation" value="">Valider</button><br>').appendTo('#' + this.id_area);
        $('<button type="button" id="btnReturn" value="">Retour</button>').appendTo('#' + this.id_area);
        $('#btnReturn').on('click', this.freturn);

        //gestion et envoi des nouvelles données
        $('#btnValidation').on('click', () => {
            let dataToPost = {
                NOM_CUVEE: $('#' + this.nameRef[0]).val(),
                CODEAPPELLATION: $('#list' + this.nameRef[1]).val(),
                CODEREGION: $('#list' + this.nameRef[3]).val(),
                CODECOULEUR: $('#list' + this.nameRef[4]).val(),
                TYPE_DE_CULTURE: $('#' + this.nameRef[5]).val(),
                COMMENTAIRES: $('#' + this.nameRef[6]).val(),
            }
            this.add(dataToPost);
        });

    }
    //création de la page de visualisation
    createPageView() {
        //remise à zéro de la zone d'affichage
        $('#' + this.id_area).html("");
        //création de la section
        $('#' + this.id_area).html("<section></section>");
        //formatage des données (correspondance code et valeur) et insertion dans le DOM
        let dataFormatted = this.matchCodeAndValue(this.data);
        $('<h2>Visualisation du vin n°' + dataFormatted[0] + '</h2>').prependTo('#' + this.id_area);
        $('<div>Nom de la cuvée : <span> ' + dataFormatted[1] + '</span></div>').appendTo('section');
        $('<div>Appellation : <span> ' + dataFormatted[2] + '</span></div>').appendTo('section');
        $('<div>Région : <span> ' + dataFormatted[4] + '</span></div>').appendTo('section');
        $('<div>Couleur : <span> ' + dataFormatted[5] + '</span></div>').appendTo('section');
        $('<div>Type de culture : <span> ' + dataFormatted[6] + '</span></div>').appendTo('section');
        $('<div>Les commentaires : <span> ' + dataFormatted[7] + '</span></div>').appendTo('section');
        //création et insertion du bouton retour
        $('<button type="button" class="return" id="btnReturn" value="">Retour</button>').appendTo('section');
        $('#btnReturn').on('click', this.freturn);
    }
    //création de la page de modification
    createPageEdit() {
        //remise à zéro de la zone d'affichage
        $('#' + this.id_area).html("");
        //création de la section
        $('#' + this.id_area).html("<section></section>");
        //formatage des données (correspondance code et valeur) et insertion dans le DOM en input ou combo
        let dataFormatted = this.matchCodeAndValue(this.data);
        $('<h2>Modification du vin n°' + dataFormatted[0] + '</h2>').prependTo('#' + this.id_area);
        $('<div><label for="' + this.nameRef[0] + '">' + this.nameRef[0] + ' : </label><input type="text" id="' + this.nameRef[0] + '" value="' + dataFormatted[1] + '"></div>').appendTo('section');
        $('<div>' + this.nameRef[1] + ' : <span id="combo' + this.nameRef[1] + '"></span></div>').appendTo('section');
        this.createCombo(this.data[0], this.nameRef[1], this.data[4].CODEAPPELLATION);
        $('<div>' + this.nameRef[2] + ' : <span id="combo' + this.nameRef[2] + '"></span></div>').appendTo('section');
        this.createCombo(this.data[1], this.nameRef[2], dataFormatted[3]);
        $('<div>' + this.nameRef[3] + ' : <span id="comboeditRegion"></span></div>').appendTo('section');
        this.createCombo(this.data[2], 'editRegion', this.data[4].CODEREGION);
        $('<div>' + this.nameRef[4] + ' : <span id="combo' + this.nameRef[4] + '"></span></div>').appendTo('section');
        this.createCombo(this.data[3], this.nameRef[4], this.data[4].CODECOULEUR);
        $('<div><label for="' + this.nameRef[5] + '">Type de culture : </label><input type="text" id="' + this.nameRef[5] + '" value="' + dataFormatted[6] + '"></div>').appendTo('section');
        $('<div><label for="' + this.nameRef[6] + '">' + this.nameRef[6] + ' : </label><textarea type="text" id="' + this.nameRef[6] + '">' + dataFormatted[7] + '</textarea></div>').appendTo('section');
        //insertion des boutons
        $('<button type="button" class="validate" id="btnValidation" value="">Valider</button>').appendTo('#' + this.id_area);
        $('<button type="button" class="return" id="btnReturn" value="">Retour</button>').appendTo('#' + this.id_area);
        $('#btnReturn').on('click', this.freturn);

        //gestion du changement de PAYS en lien avec REGION
        $('#comboeditRegion').on('change', (e) => {
            for (let i = 0; i < this.data[2].length; i++) {
                if (e.target.value == this.data[2][i][0]) {
                    let codePAYS = this.data[2][i][1];
                    this.createCombo(this.data[1], this.nameRef[2], codePAYS);
                }
            }
        });
        //gestion du click de validation : préparation et envoi des nouvelles données
        $('#btnValidation').on('click', () => {
            let dataToEdit = {
                NOM_CUVEE: $('#' + this.nameRef[0]).val(),
                CODEAPPELLATION: $('#list' + this.nameRef[1]).val(),
                CODEREGION: $('#listeditRegion').val(),
                CODECOULEUR: $('#list' + this.nameRef[4]).val(),
                TYPE_DE_CULTURE: $('#' + this.nameRef[5]).val(),
                COMMENTAIRES: $('#' + this.nameRef[6]).val(),
            }
            this.edit(dataToEdit, dataFormatted[0]);
        });

    }
}
export { Wine }