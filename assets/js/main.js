import { Header } from './class/headerClass.js';
import { Footer } from './class/footerClass.js';
import { getWine } from "./pagesDisplay/wineDisplay.js";
import { referencesDisplay } from "./pagesDisplay/referencesDisplay.js";

/**
 * FONCTIONS
 */
//insertion du header et du footer
const headerDisplay = () => {
    let header = new Header();
    header.create();
}
const footerDisplay = () => {
    let footer = new Footer();
    footer.create();
}

/**
 * PROGRAMME PRINCIPAL
 */
$(document).ready(
    headerDisplay(),
    footerDisplay(),
    getWine(),
    referencesDisplay(),
)