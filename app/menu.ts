import {
  app,
  Menu,
  shell,
  BrowserWindow,
  MenuItemConstructorOptions,
} from 'electron';

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu(): Menu {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template = this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDefaultTemplate() {
    const parent = this.mainWindow;
    function openAboutWindow() {
      const aboutWindow = new BrowserWindow({
        height: 600,
        resizable: false,
        width: 750,
        title: 'Acerca de IA²',
        minimizable: false,
        fullscreenable: false,
        skipTaskbar: true,
        parent,
        modal: true,
        webPreferences: {
          devTools: false,
        },
      });

      aboutWindow.loadFile(`about.html`);
      aboutWindow.removeMenu();
    }

    const templateDefault = [
      {
        label: 'Acerca de IA²',
        submenu: [
          {
            label: '¿Qué es IA²?',
            click: () => {
              openAboutWindow();
            },
          },
        ],
      },
    ];

    return templateDefault;
  }
}
