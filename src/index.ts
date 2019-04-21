import { CanvasComponent, ContainerComponent, ParagraphComponent, Heading1Component } from "./ui/components";
import { App } from "./app";
import { Colours } from "./utils/colours";

const bootstrapApp = () => {
    const canvas = CanvasComponent();
    const container = ContainerComponent();
    const ui = ContainerComponent();

    container.style.display = "grid";
    container.style.gridTemplateColumns = "1fr";
    container.style.gridTemplateRows = "1fr";
    container.style.msGridColumns = "1fr";
    container.style.msGridRows = "1fr";
    container.style.width = "100vw";
    container.style.height = "100vh";
    container.style.margin = "0 auto";
    container.style.justifyContent = "center";

    /**
     * Canvas: Size
     */
    canvas.width = 720;
    canvas.height = 1280;
    canvas.style.width = "720px";
    canvas.style.height = `"1280px"`;

    /**
     * Canvas: Position
     */
    canvas.style.gridRow = "1";
    canvas.style.gridColumn = "1";
    canvas.style.msGridRow = "1";
    canvas.style.msGridColumn = "1";
    canvas.style.zIndex="0";
    /**
     * Canvas: Transform
     */
    canvas.style.transformOrigin = "top";
    canvas.style.alignSelf = "center";
    canvas.style.justifySelf = "center";
    canvas.style.transform = `scale(${Math.min(window.innerWidth / canvas.width, window.innerHeight / canvas.height)})`;

    /**
     * Canvas: Style
     */
    // canvas.style.background = `linear-gradient(0deg,${Colours.Secondary},${Colours.Primary})`;
    // canvas.style.boxShadow = `0 0 20px ${Colours.PrimaryLight}`


    /**
     * UI: Size
     */
    ui.style.width = "720px";
    ui.style.height = "1280px";

    /**
     * UI: Position
     */
    ui.style.gridRow = "1";
    ui.style.gridColumn = "1";
    ui.style.msGridRow = "1";
    ui.style.msGridColumn = "1";
    ui.style.alignSelf = "center";
    ui.style.justifySelf = "center";
    ui.style.zIndex="0";

    /**
     * UI: Transform
     */
    ui.style.transformOrigin = "top";
    ui.style.transform = `scale(${Math.min(window.innerWidth / canvas.width, window.innerHeight / canvas.height)})`;

    /**
     * UI: Style
     */
    ui.style.boxShadow = `0 0 10px ${Colours.Primary}`


    window.onresize = () => {
        const scale = Math.min(window.innerWidth / 720, window.innerHeight / 1280);
        canvas.style.transform = ui.style.transform = `scale(${scale})`;
    }


    container.appendChild(canvas);
    container.appendChild(ui);

    document.body.appendChild(container);

    const context = canvas.getContext("2d");
    if (context != null) {
        new App(context, ui);

    } else {
        document.body.replaceChild(ParagraphComponent("Cannot get a 2d canvas context. Cannot continue."), container);
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
    bootstrapApp();
}

