const ipcRenderer = window.ipcRenderer;

const api = { 
    getUsers: function () {
        return ipcRenderer.invoke("getUsers");
    }
}

export default api;