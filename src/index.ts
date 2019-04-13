import { App } from "./app";
import { Loader } from "./utils/loader";
import { ViewType } from "./views/view_type";
import { AssetType } from "./assets/asset_type";


const createApp = (context: CanvasRenderingContext2D) => {
    console.log("Creating App");
    const loader = new Loader<AssetType>();

    new App(context, 1280, 720, loader);
    loader.setCompletedListener(() => {
        console.log("Loaded App");
        loader.reset();
        App.views.setView(ViewType.Main);
    });
    loader.setErrorListener(() => {
        console.error("Could not load App");
        document.body.appendChild(
            document.createElement("p").appendChild(
                document.createTextNode("Game could not load assets. If this is your first time using this app please ensure you have a network connection. Cannot continue.")));
        App.views.quit();
    });

    document.body.appendChild(App.grid.container);
    App.grid.container.animate([
        { // from
            transform: `scale(0.0)`
        },
        { // to
            transform: `scale(1.0)`
        }
    ], 1000);
};

const getCanvasContext = (): CanvasRenderingContext2D | null => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (context == null) {

        console.error("2d canvas context unavailable. Cannot continue.");
        document.body.appendChild(
            document.createElement("p").appendChild(
                document.createTextNode("2d canvas context unavailable. Cannot continue.")));
        return null;
    }
    return context;
}

const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log(`Service Worker registered! Scope: ${registration.scope}`);
                })
                .catch(err => {
                    console.error(`Service Worker registration failed: ${err}`);
                });
        });
    }
}


window.onload = () => {
    window.onload = null;
    document.body.style.height = "100vh";
    document.body.style.textAlign = "center";
    document.body.style.fontFamily = "Arial";
    document.body.style.overflow = "hidden";
    document.body.style.backgroundColor = "black";
    if (process.env.NODE_ENV == "production") {
        registerServiceWorker();
    }
    const context = getCanvasContext();
    if (context != null) {
        createApp(context);
    } else {
        console.error("Could not get a 2d rendering context. Please upgrade your browser. Cannot continue.")
    }
};