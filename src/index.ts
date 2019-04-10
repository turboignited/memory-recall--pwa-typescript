import { App } from "./app";
import { Loader } from "./utils/loader";
import { ViewType } from "./views/view_type";
import { Statics } from "./statics";
import { AppControls } from "./controls";
import { Dimensions } from "./utils/dimensions";


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

    Statics.Dimensions = new Dimensions(1280, 720, window.innerWidth - 20, window.innerWidth - 20 - controls.height);



    controls.container.style.width = `${Statics.Dimensions.width * Statics.Dimensions.scale}px`;
    controls.container.style.border = "1px solid orange";


    canvas.width = Statics.Dimensions.width;
    canvas.height = Statics.Dimensions.height;
    canvas.style.border = "1px solid blue";
    canvas.style.transformOrigin = "0 0"; //scale from top left
    canvas.style.transform = `scale(${Statics.Dimensions.scale})`;

    document.body.style.height = "100vh";
    document.body.style.fontFamily = "Arial";
    document.body.style.overflow = "hidden";
    document.body.style.background = "linear-gradient(0deg,gray,yellow)";

    document.body.appendChild(controls.container);
    document.body.appendChild(canvas);

    window.onresize = () => {
        Statics.Dimensions.updateScale(window.innerWidth - 20, window.innerHeight - 20 - controls.height);
        controls.container.style.width = `${Statics.Dimensions.width * Statics.Dimensions.scale}px`;
        canvas.style.transformOrigin = "top left"; //scale from top left
        canvas.style.transform = `scale(${Statics.Dimensions.scale})`;
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