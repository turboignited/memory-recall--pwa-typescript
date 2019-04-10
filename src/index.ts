import { App } from "./app";
import { Loader } from "./utils/loader";
import { ViewType } from "./views/view_type";

const createApp = () => {
    window.onload = null;



    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const outerPadding: number = 20;
    if (context == null) {
        console.error("2d canvas context unavailable. Cannot continue.");
        document.body.appendChild(
            document.createElement("p").appendChild(
                document.createTextNode("2d canvas context unavailable. Cannot continue.")));
        return;
    }

    /**
     * Keep Width and Height the same to prevent maximum score being incorrectly 
     * calculated
     * Also ensure the dimensions have a GCD in line with sprite dimensions.
     * Design resolution is 16:9 (1280x720) with a GCD of 80 and sprite dimension of 80
     */

    const app = new App(1280, 720, window.innerWidth - outerPadding, window.innerHeight - outerPadding, context);
    const loader: Loader<ViewType> = new Loader<ViewType>();
    const container = document.createElement("div");


    canvas.style.margin = "0 auto";
    canvas.style.boxShadow = "0 0 4px black";
    canvas.style.msGridColumn = "1";
    canvas.style.msGridRow = "1";
    canvas.style.gridColumn = "1";
    canvas.style.gridRow = "1";
    canvas.style.zIndex = "0";
    container.style.margin = "0 auto";
    container.style.height = "100vh";
    container.style.display = "grid";
    container.style.display = "-ms-grid";

    container.appendChild(canvas);


    app.views.forEach((view) => {
        const ui = view.ui.container;
        ui.style.msGridColumn = "1";
        ui.style.msGridRow = "1";
        ui.style.gridColumn = "1";
        ui.style.gridRow = "1";
        ui.style.margin = "0 auto";
        ui.style.zIndex = "0";
        container.appendChild(ui);
    });


    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.fontFamily = "Arial";
    document.body.style.overflowY = "hidden";
    document.body.style.background = "linear-gradient(0deg,yellow,gray)";
    document.body.appendChild(container);

    window.onresize = () => {

        app.resize(window.innerWidth - outerPadding, window.innerHeight - outerPadding);

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