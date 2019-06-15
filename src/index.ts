import { App } from "./app";
import { Dimensions } from "./utils/dimensions";
import { Colours } from "./utils/colours";
import { Size } from "./utils/size";
import { DivComponent } from "./ui/components";
import { LocalStorage } from "./storage/local";

const bootstrapApp = () => {
    const container = document.getElementById("container") as HTMLDivElement;
    const canvas = container.children[0] as HTMLCanvasElement;
    const ui = container.children[1] as HTMLDivElement;
    const bar = ui.appendChild(DivComponent());

    const dimensions = new Dimensions({
        width: canvas.width,
        height: canvas.height,
        maximumHeight: window.innerHeight,
        maximumWidth: window.innerWidth
    });
    canvas.style.backgroundColor = Colours.IconBackground;
    container.style.transformOrigin = "top center";
    container.style.transform = `scale(${dimensions.scale})`;

    window.onresize = () => {
        container.style.transform = `scale(${dimensions.updateScale(window.innerWidth, window.innerHeight)})`;
    }

    const context = canvas.getContext("2d");
    if (context != null) {
        new App({
            barSize: new Size({
                width: dimensions.width,
                height: dimensions.gcd,
                gcd: dimensions.gcd
            }),
            bar: bar,
            ui: ui,
            uiSize: new Size({
                width: dimensions.width,
                height: dimensions.height,
                gcd: dimensions.gcd
            }),
            context: context,
        });
    }
}


if (process.env.NODE_ENV === "production") {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(bootstrapApp)
            .catch(bootstrapApp);
    }
    else {
        bootstrapApp();
    }
} else {
    LocalStorage.clearAll();
    bootstrapApp();
}

