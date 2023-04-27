import { RegistrationPage } from "../modules/RegistrationPage/RegistrationPage"
import { LoginPage } from "../modules/LoginPage/LoginPage"
import { ChatPage } from "../modules/ChatPage/ChatPage"
import { IErrorProps } from "../components/Error/ErrorComponent"
import { ErrorPage } from "../modules/ErrorPage/ErrorPage"
import { UserSettingsPage } from "../modules/UserSettingsPage/UserSettingsPage"

type Routes = {
  path: string;
  component: {
      render: () => Element | null;
  };
}

const ChatComponent = {
    render: () => {
        const page = new ChatPage({});
        const root = document.querySelector("#root");

        const content = page.getContent();
        if (content && root) {
            root.innerHTML = '';
            root.appendChild(content);
        }
    
        return root;
    }
} 
  
const LoginComponent = {
    render: () => {
        const page = new LoginPage();
        const root = document.querySelector("#root");

        const content = page.renderPage();
        if (content && root) {
            root.innerHTML = '';
            root.appendChild(content);
        }

        return root;
    }
} 
  
const RegistrationComponent = {
    render: () => {
        const page = new RegistrationPage();
        const root = document.querySelector("#root");

        const content = page.renderPage();
        if (content && root) {
            root.innerHTML = '';
            root.appendChild(content);
        }

        return root;
    }
} 

const SettingsComponent = {
    render: () => {
        const page = new UserSettingsPage({});
        const root = document.querySelector("#root");

        const content = page.getContent();
        if (content && root) {
            root.innerHTML = '';
            root.appendChild(content);
        }

        return root;
    }
} 

const Error404 = {
    render: () => {
        const context = {
            errorCode: "404",
            errorText: "ой, кажется, вы заблудились"
        } as IErrorProps;

        const page = new ErrorPage(context);
        const root = document.querySelector("#root");

        const content = page.renderPage();
        if (content && root) {
            root.innerHTML = '';
            root.appendChild(content);
        }

        return root;
    }
}

const Error500 = {
    render: () => {
        const context = {
            errorCode: "500",
            errorText: "ой, возникла ошибка, исправим ее в ближайшее время"
        } as IErrorProps;

        const page = new ErrorPage(context);
        const root = document.querySelector("#root");

        const content = page.renderPage();
        if (content && root) {
            root.innerHTML = '';
            root.appendChild(content);
        }

        return root;
    }
}

const routes: Routes[] = [
    { path: '/login', component: LoginComponent, },
    { path: '/registration', component: RegistrationComponent, },
    { path: '/chat', component: ChatComponent, },
    { path: '/settings', component: SettingsComponent, },
    { path: '/404', component: Error404, },
    { path: '/500', component: Error500, }
];

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path: string, routes: Routes[]) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
    const path = parseLocation();
    const { component = LoginComponent } = findComponentByPath(path, routes) || {};
    const root = document.getElementById('root');
    if (root) {
        component.render();
    }
};

export default router;
