/**
 * Classe qui crée le footer
 */
class Footer{
    constructor() {
        this.id = '#footer';
    }
    create() {
        $(this.id).html('<p class="footer">Copyright - Tous droits réservés</p>');
    }
}
export { Footer }