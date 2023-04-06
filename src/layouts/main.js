import chat from "../modules/chat/chat.js"
import error from "./error/error.js"
import login from "../modules/login/login.js"
import registration from "../modules/registration/registration.js"
import userSettings from "../modules/userSettings/userSettings.js"

const ChatComponent = {
    render: () => {
        return chat();
    }
  } 
  
  const LoginComponent = {
    render: () => {
        return login();
    }
  } 
  
  const RegistrationComponent = {
    render: () => {
        return registration();
    }
  } 

  const SettingsComponent = {
    render: () => {
      return userSettings();
    }
  } 

  const Error404 = {
    render: () => {
        const context = {
            errorCode: 404,
            errorText: "ой, кажется, вы заблудились"
        };

        return error(context);
    }
  }

  const Error500 = {
    render: () => {
        const context = {
            errorCode: 500,
            errorText: "ой, возникла ошибка, исправим ее в ближайшее время"
        };

        return error(context);
    }
  }

  const routes = [
    { path: '/login', component: LoginComponent, },
    { path: '/registration', component: RegistrationComponent, },
    { path: '/chat', component: ChatComponent, },
    { path: '/settings', component: SettingsComponent, },
    { path: '/404', component: Error404, },
    { path: '/500', component: Error500, }
  ];

  const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
  const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

  const router = () => {
    const path = parseLocation();
    const { component = LoginComponent } = findComponentByPath(path, routes) || {};
    document.getElementById('root').innerHTML = component.render();
  };

export default router;