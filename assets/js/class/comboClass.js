/**
 * Création des combos pour les références
 */
class Combo {

    constructor(id_zone, id_select = "", class_select = "", selectedItem = "", data = "", fonction_change = "") {
        this.id_zone = id_zone;
        this.id_select = id_select;
        this.class_select = class_select;
        this.selectedItem = selectedItem;
        this.data = data;
        this.fonction_change = fonction_change;
    }
    generer() {
        if (this.id_zone == undefined || this.id_select == undefined) {
            throw new Error('Pour générer un combo, il faut préciser la propriété id_zone et id_select');
        } else {
            //création du select
            $('#' + this.id_zone).html('<select id="' + this.id_select + '" name="' + this.id_select + '"class="' + this.class_select + '"></select>');
            $('<option value=""></option>').appendTo('.' + this.class_select);
            if (this.data[0].length == 3) {
                for (let i = 0; i < this.data.length; i++) {
                    if (this.id_zone == "comboeditRegion") {
                        if (this.data[i][0] == this.selectedItem) {
                            $('<option value="' + this.data[i][0] + '" selected>' + this.data[i][2] + '</option>').appendTo('.' + this.class_select);
                        } else {
                            $('<option value="' + this.data[i][0] + '">' + this.data[i][2] + '</option>').appendTo('.' + this.class_select);
                        }
                    } else {
                        if (this.data[i][1] == this.selectedItem) {
                            $('<option value="' + this.data[i][0] + '" selected>' + this.data[i][2] + '</option>').appendTo('.' + this.class_select);
                        }
                    }
                }
            } else {
                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i][0] == this.selectedItem) {
                        $('<option value="' + this.data[i][0] + '" selected>' + this.data[i][1] + '</option>').appendTo('.' + this.class_select);
                    } else {
                        $('<option value="' + this.data[i][0] + '">' + this.data[i][1] + '</option>').appendTo('.' + this.class_select);
                    }
                }
            }

            //initialisation de la fonction cbRegionChange
            if (typeof this.fonction_change == 'function') {
                $('#' + this.id_select).on('change', () => {
                    alert('Vous avez selectionné la valeur : ' + this.fonction_change());
                })
            }
        }


    }
}
export { Combo }