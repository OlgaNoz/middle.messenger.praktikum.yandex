import template from "./error.hbs";
import style from "./error.scss";

const error = (errorContext) => {
    return template(errorContext);
}

export default error;