const { app, BrowserWindow, nativeImage, ipcMain } = require("electron");
const path = require("path");
const isDev = require('electron-is-dev');
const url = require('url');

const serviceWrapper = require('./src/service/serviceWrapper');
//const dbConnection = require('./src/service/connectionMySQL');
const dbConnection = require('./src/database/index');
// Habilita o live reload no Electron e no FrontEnd da aplicação com a lib electron-reload
// Assim que alguma alteração no código é feita
require("electron-reload")(__dirname, {
  // Note that the path to electron may vary according to the main file
  electron: require(`${__dirname}/node_modules/electron`),
});

// Função que cria uma janela desktop
async function createWindow() {
  // Adicionando um ícone na barra de tarefas/dock
  const icon = nativeImage.createFromPath(`${app.getAppPath()}/build/icon.png`);

  if (app.dock) {
    app.dock.setIcon(icon);
  }

  // Cria uma janela de desktop
  const win = new BrowserWindow({
    icon,
    width: 1360,
    height: 720,
    minWidth: 1320,
    minHeight: 680,
    useContentSize: true,
    webPreferences: {
      // habilita a integração do Node.js no FrontEnd
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
    },
  });

  if (isDev) {
		win.loadURL('http://localhost:3000');
		let devtools = new BrowserWindow();
		win.webContents.setDevToolsWebContents(devtools.webContents);
		win.webContents.openDevTools({ mode: 'detach' });
	} else {
		win.loadURL(
            url.format({
                protocol: 'file',
                slashes: true,
                pathname: path.join(__dirname, '../build/index.html')
            })
        );
	}

  const dbInstance = await dbConnection.initDatabase();

  ipcMain.handle("getUsers", (_, arg) => {
    return serviceWrapper.getUsers({...arg, dbInstance });
  });

  // carrega a janela com o conteúdo dentro de index.html
  //win.loadFile("index.js");
  win.loadURL('http://localhost:3000');

  // Abre o console do navegador (DevTools),
  // manter apenas quando estiver desenvolvendo a aplicação,
  // pode utilizar variáveis de ambiente do node para executar esse código apenas quando estiver em modo DEV
  // win.webContents.openDevTools();

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
  })
}

// Método vai ser chamado assim que o Electron finalizar sua inicialização
// e estiver pronto para abrir e manipular o nosso código.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(createWindow);

// Quando clicarmos no botão de fechar a janela no app desktop
// O evento vai ser ouvido aqui no arquivo main.js e algum procedimento pode ser realizado
// tipo fechar alguma conexão de banco de dados por exemplo.
app.on("window-all-closed", () => {
  // No MacOS quando fecha uma janela, na verdade ela é "minimizada"
  // e o processo executa em segundo-plano tipo um app do celular
  // Para fechar e encerrar o app tem que teclar Cmd+Q ou no dock (barra de tarefas)
  // clicar com botão direito e encerrar o app
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // Esse evento é disparado pelo MacOS quando clica no ícone do aplicativo no Dock.
  // Basicamente cria a janela se não foi criada.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Abaixo você pode colocar seus códigos específicos do BackEnd que precisam executar no processo principal
// pode criar pastas e arquivos separados e importar aqui (boa prática).
