import router from "./src/layouts/main";
import './src/layouts/main.scss'

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
