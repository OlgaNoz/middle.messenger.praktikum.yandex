import router from "./src/layouts/main";
import style from './src/layouts/main.scss'

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
