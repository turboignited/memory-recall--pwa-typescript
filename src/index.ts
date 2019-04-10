import { App } from "./app";
import { Loader } from "./utils/loader";
import { ViewType } from "./views/view_type";
import { Statics } from "./statics";
import { AppControls } from "./controls";


const createApp = () => {
    window.onload = null;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context == null) {
        console.error("2d canvas context unavailable. Cannot continue.");
        document.body.appendChild(
            document.createElement("p").appendChild(
                document.createTextNode("2d canvas context unavailable. Cannot continue.")));
        return;
    }

    const app = new App(context);
    const controls = new AppControls(app);
    const loader: Loader<ViewType> = new Loader<ViewType>();
    const container = document.createElement("div");

    container.style.width = `${Statics.Dimensions.width * Statics.Dimensions.scale}px`;
    container.style.height = `${Statics.Dimensions.height * Statics.Dimensions.scale}px`;
    container.style.display = "grid";
    container.style.display = "-ms-grid";
    container.style.margin = "0 auto";

    controls.container.style.msGridColumn = "1";
    controls.container.style.msGridRow = "1";
    controls.container.style.gridColumn = "1";
    controls.container.style.gridRow = "1";
    controls.container.style.zIndex = "2";
    controls.container.style.width = `${Statics.Dimensions.width * Statics.Dimensions.scale}px`;

    canvas.style.boxShadow = "0 0 4px black";
    canvas.style.msGridColumn = "1";
    canvas.style.msGridRow = "1";
    canvas.style.gridColumn = "1";
    canvas.style.gridRow = "1";
    canvas.style.zIndex = "0";
    canvas.style.transformOrigin = "top left"; //scale from top left
    canvas.style.transform = `scale(${Statics.Dimensions.scale})`;

    canvas.width = Statics.Dimensions.width;
    canvas.height = Statics.Dimensions.height;

    container.appendChild(canvas);

    container.appendChild(controls.container);

    document.body.style.height = "100vh";
    document.body.style.fontFamily = "Arial";
    document.body.style.overflow = "hidden";
    document.body.style.background = "linear-gradient(0deg,gray,yellow)";
    document.body.appendChild(container);
    window.onresize = () => {
        Statics.Dimensions.updateScale(window.innerWidth - 20, window.innerHeight - 20);

        const scale = Statics.Dimensions.scale;
        const width = Statics.Dimensions.width;
        const height = Statics.Dimensions.height;
        container.style.width = `${width * scale}px`;
        container.style.height = `${height * scale}px`;
        controls.container.style.width = container.style.width;

        canvas.style.transformOrigin = "top left"; //scale from top left
        canvas.style.transform = `scale(${scale})`;
    };


    loader.setCompletedListener(() => {
        loader.reset();
        setTimeout(() => {
            app.setView(ViewType.Main);
        }, 1000);
    });

    loader.setErrorListener(() => {
        console.error("Game could not load assets");
        document.body.appendChild(
            document.createElement("p").appendChild(
                document.createTextNode("Game could not load assets. If this is your first time using this app please ensure you have a network connection. Cannot continue.")));
        app.quit();
    });

    app.load(loader);
    app.setView(ViewType.Load);
};


window.onload = () => {

    if (process.env.NODE_ENV == "production") {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js')
                    .then(registration => {
                        console.log(`Service Worker registered! Scope: ${registration.scope}`);
                    })
                    .then(createApp)
                    .catch(err => {
                        console.log(`Service Worker registration failed: ${err}`);
                    });

            });
        }
    } else {
        createApp();
    }
};