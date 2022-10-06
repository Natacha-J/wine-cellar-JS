import { Tab } from "./tabClass.js";
import { Combo } from "./comboClass.js";
/**
 * Classe qui gère l'affichage de la page référence
 */
class References {
    constructor(id_mainArea = "", id_area = "", functClick = "", codeRef = "", header = "", data = "", editValue = "", add = "", edit = "", remove = "", freturn = "") {
        this.id_mainArea = id_mainArea;
        this.id_area = id_area;
        this.codeRef = codeRef;
        this.header = header;
        this.data = data;
        this.editValue = editValue;
        this.references = ['PAYS', 'REGION', 'APPELLATION', 'COULEUR', 'CEPAGE', 'MILLESIME'];
        this.functClick = functClick;
        this.add = add;
        this.edit = edit;
        this.remove = remove;
        this.freturn = this.freturn;
    }
    createAside() {
        //création du menu secondaire
        $('<aside id="menuRef"></aside>').appendTo('#' + this.id_mainArea);
        for (let i = 0; i < this.references.length; i++) {
            $('<button type="button" value="' + this.references[i] + '">' + this.references[i] + '</button>').appendTo('#menuRef');
            $('button[value="' + this.references[i] + '"]').on('click', this.functClick);
        }
    }
    createCombo(data, select = "", disabled = "") {
        //création du combo
        $('<div id="divForCombo">Sélectionner un pays : </div>').appendTo('section');
        $('<span id="combo"></span>').appendTo('#divForCombo');
        let combo = new Combo();
        combo.id_zone = 'combo';
        combo.id_select = 'PAYS';
        if (disabled == "") {
            combo.class_select = 'listPAYS';          
        } else {
            combo.class_select = 'listPAYS disabled';                     
        }
        combo.selectedItem = select;
        combo.data = data;
        combo.generer();
    }
    createMainDisplay() {
        $('#' + this.id_mainArea).html("");
        this.createAside()
        //création de l'affichage principal
        $('<div id="mainDisplayRef"></div>').appendTo('#' + this.id_mainArea);
        for (let i = 0; i < this.references.length; i++) {
            $('<button type="button" value="' + this.references[i] + '">' + this.references[i] + '</button>').appendTo('#mainDisplayRef');
            $('button[value="' + this.references[i] + '"]').on('click', this.functClick);
        }
    }
    createTabOneRef() {
        $('#' + this.id_mainArea).html("");
        this.createAside()
        $('<section id="' + this.codeRef + '"></section>').appendTo('#' + this.id_mainArea);
        let tab = new Tab();
        tab.id_area = this.codeRef;
        tab.id_table = 'tab' + this.codeRef;
        tab.id_div = 'div' + this.codeRef;
        tab.header = this.header;
        tab.data = this.data;
        tab.functAdd = this.add;
        tab.functEdit = this.edit;
        tab.functRemove = this.remove;
        tab.functView = this.view;
        tab.create()
        $('<h2>' + this.codeRef + '</h2>').prependTo('#' + this.codeRef);
        //création du bouton de retour au menu principal
        $('<button class="return" type="button">Retour</button>').appendTo('#' + this.codeRef);
        $('button.return').on('click', this.freturn);

    }
    createNewRef() {
        $('#' + this.id_mainArea).html("");
        this.createAside();
        $('<section id="' + this.codeRef + '"></section>').appendTo('#' + this.id_mainArea);
        //gestion de l'API REGION
        if (this.codeRef == "REGION") {
            $('<h3>Ajout d\'une nouvelle ' + this.codeRef + '</h3>').appendTo('section');
            this.createCombo(this.data);
        } else {
            if (this.codeRef == "PAYS" || this.codeRef == "CEPAGE" || this.codeRef == "MILLESIME") {
                $('<h3>Ajout d\'un nouveau ' + this.codeRef + '</h3>').appendTo('section');
            } else {
                $('<h3>Ajout d\'une nouvelle ' + this.codeRef + '</h3>').appendTo('section');
            }
        }
        $('<input type="text" id="name' + this.codeRef + '" placeholder="Entrer le nom">').appendTo('section');
        $('<button type="button" class="validate" id="' + this.codeRef + '" value="' + this.codeRef + '">Valider</button>').appendTo('section');
        $('button#' + this.codeRef).on('click', () => {
            let dataPost;
            if (this.codeRef == "PAYS") {
                dataPost = {
                    NOMPAYS: $('#name' + this.codeRef).val(),
                };
            } else if (this.codeRef == "APPELLATION") {
                dataPost = {
                    NOMAPPELLATION: $('#name' + this.codeRef).val(),
                };
            } else if (this.codeRef == "COULEUR") {
                dataPost = {
                    NOMCOULEUR: $('#name' + this.codeRef).val(),
                };
            } else if (this.codeRef == "CEPAGE") {
                dataPost = {
                    NOMCEPAGE: $('#name' + this.codeRef).val(),
                };
            } else if (this.codeRef == "MILLESIME") {
                dataPost = {
                    MILLESIME: parseInt($('#name' + this.codeRef).val()),
                };
            } else if (this.codeRef == "REGION") {
                dataPost = {
                    CODEPAYS: $('#PAYS').val(),
                    NOMREGION: $('#name' + this.codeRef).val(),
                }
            }
            this.add(this.codeRef, dataPost);
        });
        $('<button type="button" class="return" id="' + this.codeRef + '" value="' + this.codeRef + '">Retour</button>').appendTo('section');
        $('button#' + this.codeRef).on('click', this.freturn);
    }
    editRef() {
        $('#' + this.id_mainArea).html("");
        this.createAside();
        $('<section id="' + this.codeRef + '"></section>').appendTo('#' + this.id_mainArea);
        $('<h3>Modification de la référence ' + this.codeRef + ' n° ' + this.editValue[0] + '</h3>').appendTo('section');
        $('<div>Nom : <input type="text" id="name' + this.codeRef + '" value="' + this.editValue[1] + '"></div>').appendTo('section');
        if (this.codeRef == "REGION") {
            this.createCombo(this.data, this.editValue[2]);
        } 
        $('<button type="button" class="validate" id="' + this.codeRef + '" value="' + this.codeRef + '">Valider</button>').appendTo('section');
        $('button#' + this.codeRef).on('click', () => {
            let dataPost;
            if (this.codeRef == "PAYS") {
                dataPost = {
                    CODEPAYS: $('#code' + this.codeRef).val(),
                    NOMPAYS: $('#name' + this.codeRef).val(),
                };
            } else if (this.codeRef == "APPELLATION") {
                dataPost = {
                    CODEAPPELLATION: $('#code' + this.codeRef).val(),
                    NOMAPPELLATION: $('#name' + this.codeRef).val(),
                };
            } else if (this.codeRef == "COULEUR") {
                dataPost = {
                    CODECOULEUR: $('#code' + this.codeRef).val(),
                    NOMCOULEUR: $('#name' + this.codeRef).val(),
                };
            } else if (this.codeRef == "CEPAGE") {
                dataPost = {
                    CODECEPAGE: $('#code' + this.codeRef).val(),
                    NOMCEPAGE: $('#name' + this.codeRef).val(),
                };
            } else if (this.codeRef == "MILLESIME") {
                dataPost = {
                    CODEMILLESIME: $('#code' + this.codeRef).val(),
                    MILLESIME: parseInt($('#name' + this.codeRef).val()),
                };
            } else if (this.codeRef == "REGION") {
                dataPost = {
                    CODEREGION: $('#code' + this.codeRef).val(),
                    CODEPAYS: $('#PAYS').val(),
                    NOMREGION: $('#name' + this.codeRef).val(),
                }
            }
            this.edit(this.codeRef, this.editValue[0], dataPost);
        });
        $('<button type="button" class="return" id="' + this.codeRef + '" value="' + this.codeRef + '">Retour</button>').appendTo('section');
        $('button#' + this.codeRef).on('click', this.freturn);

    }
    viewRef() {
        $('#' + this.id_mainArea).html("");
        this.createAside();
        $('<section id="' + this.codeRef + '"></section>').appendTo('#' + this.id_mainArea);
        if (this.codeRef == "REGION") {
            $('<h3>Référence ' + this.codeRef + ' n° ' + this.editValue[0] + '</h3>').appendTo('section');
            $('<div>Nom : <span> ' + this.editValue[1] + '</span></div>').appendTo('section');
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i][0] == this.editValue[2]) {
                    $('<div>Pays : <span> '+ this.data[i][1] + '</span></div>').appendTo('section');
                }
            }
        } else {
            $('<h3>Référence ' + this.codeRef + ' n° ' + this.editValue[0] + '</h3>').appendTo('section');
            $('<div> Nom : <span> ' + this.editValue[1] + '</span></div>').appendTo('section');
        }
        $('<button type="button" class="return" id="' + this.codeRef + '" value="' + this.codeRef + '">Retour</button>').appendTo('section');
        $('button#' + this.codeRef).on('click', this.freturn);

    }
}
export { References }