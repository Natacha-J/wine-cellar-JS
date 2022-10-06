/**
 * création des tableaux de présentation de données
 */
class Tab {
    constructor(id_area = "", id_table = "", id_div = "", header = "", data = "", functAdd = "", functEdit = "", functRemove = "", functView = "") {
        this.id_area = id_area;
        this.id_table = id_table;
        this.id_div = id_div;
        this.header = header;
        this.data = data;
        this.functAdd = functAdd;
        this.functEdit = functEdit;
        this.functRemove = functRemove;
        this.functView = this.functView;
    }
    create() {
        if (this.id_area === "") {
            throw new Error('Il est impératif de déclarer un id_area pour afficher le tableau');
        } else {
            $('#' + this.id_area).html('<div id="' + this.id_div +'"></div>');
            //création du bouton add
            if (typeof this.functAdd == "function") {
                let btnAdd = '<button type="button" value="add ' + this.id_area + '"> + Nouveau </button>';
                $(btnAdd).appendTo('div#' + this.id_div);
                $('button[value="add ' + this.id_area +'"]').on('click', this.functAdd);
            }
            $('<table id="' + this.id_table + '"></table>').appendTo('div#' + this.id_div);
            //création de l'entête
            $('<thead><tr class="head"></tr></thead>').appendTo('table');
            for (let i = 0; i < this.header.length; i++) {
                $('<th>' + this.header[i] + '</th>').appendTo('tr.head');
            }
            $('<th>Actions</th>').appendTo('tr.head');

            //création du body
            $('<tbody></tbody>').appendTo('table');
            for (let i = 0; i < this.data.length; i++) {
                $('<tr class="line-' + i + '"></tr>').appendTo('tbody');
                for (let j = 0; j < this.data[i].length; j++) {
                            $('<td>' + this.data[i][j] + '</td>').appendTo('tr.line-' + i);                            
                }
                //création des boutons view, edit et remove
                if (typeof this.functView == "function") {
                    let btnView = '<button type="button" class="far fa-eye fa-sm" value="view-'+ this.id_area + '-' + this.data[i][0] + '"></button>';
                    $(btnView).appendTo('.line-' + i);
                    $('button[value="view-'+ this.id_area + '-' + this.data[i][0] + '"]').on('click', this.functView);
                }
                if (typeof this.functRemove == "function") {
                    let btnRemove = '<button type="button" class="fas fa-trash-alt fa-sm" value="remove-'+ this.id_area + '-' + this.data[i][0] + '"></button>';
                    $(btnRemove).appendTo('.line-' + i);
                    $('button[value="remove-'+ this.id_area + '-' + this.data[i][0] + '"]').on('click', this.functRemove);
                }
                if (typeof this.functEdit == "function") {
                    let btnModif = '<button type="button" class="fas fa-pencil-alt fa-sm" value="edit-'+ this.id_area + '-' + this.data[i][0] + '"></button>';
                    $(btnModif).appendTo('.line-' + i);
                    $('button[value ="edit-'+ this.id_area + '-' + this.data[i][0] + '"]').on('click', this.functEdit);
                }
            }
        }
    }
    createTabWine() {
        if (this.id_area === "") {
            throw new Error('Il est impératif de déclarer un id_area pour afficher le tableau');
        } else {
            $('#' + this.id_area).html('<div id="' + this.id_div +'"></div>');
            //création du bouton add
            if (typeof this.functAdd == "function") {
                let btnAdd = '<button type="button" value="add ' + this.id_area + '"> + Nouveau </button>';
                $(btnAdd).appendTo('div#' + this.id_div);
                $('button[value="add ' + this.id_area +'"]').on('click', this.functAdd);
            }
            $('<table id="' + this.id_table + '"></table>').appendTo('div#' + this.id_div);
            //création de l'entête
            $('<thead><tr class="head"></tr></thead>').appendTo('table');
            for (let i = 0; i < this.header.length; i++) {
                $('<th>' + this.header[i] + '</th>').appendTo('tr.head');
            }
            $('<th>Actions</th>').appendTo('tr.head');

            //création du body
            $('<tbody></tbody>').appendTo('table');
             for (let i = 0; i < this.data[0].length; i++) {
                $('<tr class="line-' + i + '">ligne</tr>').appendTo('tbody');

                for (let j = 0; j < this.data[0][i].length; j++) {
                            $('<td>' + this.data[0][i][j] + '</td>').appendTo('tr.line-' + i);                         
                            //création des boutons edit et remove
                }
                if (typeof this.functEdit == "function") {
                    let btnModif = '<button type="button" title="modifier" class="fas fa-pencil-alt fa-sm" value="edit-'+ this.id_area + '-' + this.data[0][i][0] + '"></button>';
                    $(btnModif).appendTo('.line-' + i);
                    $('button[value ="edit-'+ this.id_area + '-' + this.data[0][i][0] + '"]').on('click', this.functEdit);
                }
                if (typeof this.functRemove == "function") {
                    let btnRemove = '<button type="button" title="supprimer" class="fas fa-trash-alt fa-sm" value="remove-'+ this.id_area + '-' + this.data[0][i][0] + '"></button>';
                    $(btnRemove).appendTo('.line-' + i);
                    $('button[value="remove-'+ this.id_area + '-' + this.data[0][i][0] + '"]').on('click', this.functRemove);
                }
                if (typeof this.functView == "function") {
                    let btnView = '<button type="button" title="voir en détail" class="far fa-eye fa-sm" value="view-'+ this.id_area + '-' + this.data[0][i][0] + '"></button>';
                    $(btnView).appendTo('.line-' + i);
                    $('button[value="view-'+ this.id_area + '-' + this.data[0][i][0] + '"]').on('click', this.functView);
                }
            }
        }
    }
}
export { Tab }