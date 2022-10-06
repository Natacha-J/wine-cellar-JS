/**
 * Classe qui crée le header
 */
class Header {
    constructor(login = "") {
        this.login = login;
        this.data = [
            ['Accueil', './index.html'],
            ['Table des vins', './vins.html'],
            ['Gestion des références', './references.html'],
        ]
    }
    create() {
        $('#header').html('<nav></nav>');
        $('<ul></ul>').appendTo('nav');
        for (let i = 0; i < this.data.length; i++) {
            $('<li><a href="' + this.data[i][1] + '">' + this.data[i][0] + '</a></li>').appendTo('ul');           
        }
    }

}
export { Header }