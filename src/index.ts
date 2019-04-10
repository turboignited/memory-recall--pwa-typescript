import { App } from "./app";
import { Loader } from "./utils/loader";
import { ViewType } from "./views/view_type";
import { Statics } from "./statics";


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
    const loader: Loader<ViewType> = new Loader<ViewType>();
    const container = document.createElement("div");

    container.style.width = `${Statics.Dimensions.width * Statics.Dimensions.scale}px`;
    container.style.height = `${Statics.Dimensions.height * Statics.Dimensions.scale}px`;
    container.style.display = "grid";
    container.style.display = "-ms-grid";
    container.style.margin = "0 auto";


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


    app.views.forEach((view) => {
        const ui = view.ui.container;
        ui.style.msGridColumn = "1";
        ui.style.msGridRow = "1";
        ui.style.gridColumn = "1";
        ui.style.gridRow = "1";
        ui.style.zIndex = "1";
        ui.style.width = container.style.width;
        ui.style.height = container.style.height;
        ui.style.border = "1px solid blue";
        container.appendChild(ui);
    });


    document.body.style.height = "100vh";
    document.body.style.fontFamily = "Arial";
    document.body.style.overflow = "hidden";
    document.body.style.background = "linear-gradient(0deg,yellow,gray)";
    document.body.appendChild(container);

    window.onresize = () => {
        Statics.Dimensions.updateScale(window.innerWidth - 20, window.innerHeight - 20);
        container.style.width = `${Statics.Dimensions.width * Statics.Dimensions.scale}px`;
        container.style.height = `${Statics.Dimensions.height * Statics.Dimensions.scale}px`;
        canvas.style.transformOrigin = "top left"; //scale from top left
        canvas.style.transform = `scale(${Statics.Dimensions.scale})`;
        app.views.forEach((view) => {
            const ui = view.ui.container;
            ui.style.width = container.style.width;
            ui.style.height = container.style.height;
            ui.style.border = "1px solid red";
            
        });
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