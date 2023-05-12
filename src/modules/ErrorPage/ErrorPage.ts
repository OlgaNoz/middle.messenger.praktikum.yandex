import { ErrorComponent, IErrorProps } from "../../components/Error/ErrorComponent";

export class ErrorPage {
    _context: IErrorProps;
    error: ErrorComponent;

    constructor(context: IErrorProps) {
        this._context = context;
        this.error = new ErrorComponent(context);
    }

    renderPage() {
        return this.error.getContent();
    }
}


