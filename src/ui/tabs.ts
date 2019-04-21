import { ContainerComponent } from "./components";
import { Colours } from "../utils/colours";

export class Tabs {

    private _container: HTMLDivElement;
    public get container(): HTMLDivElement {
        return this._container;
    }
    private _tabs: HTMLDivElement;
    public get tabs(): HTMLDivElement {
        return this._tabs;
    }
    private _tab: HTMLDivElement;
    public get tab(): HTMLDivElement {
        return this._tab;
    }
    private _tabsCount: number;
    public get tabsCount(): number {
        return this._tabsCount;
    }
    constructor() {
        const tabs = ContainerComponent();
        const tab = ContainerComponent();
        const container = ContainerComponent();

        // Hold individual tabs
        tabs.style.display = "grid";
        tabs.style.gridTemplateColumns = "repeat(1,1fr)";
        tabs.style.msGridColumns = "repeat(1,1fr)";
        tabs.onclick = (ev: MouseEvent) => {
            this.onTabsSelected(ev);
        }

        // Hold tabs and tab
        container.style.display = "grid";
        container.style.gridTemplateColumns = "1fr";
        container.style.msGridColumns = "1fr";
        container.style.gridTemplateRows = "1em auto";
        container.style.msGridRows = "1em auto";

        container.appendChild(tabs);
        container.appendChild(tab);

        tab.style.overflowY = "scroll";
        this._tabs = tabs;
        this._tab = tab;
        this._container = container;
        this._tabsCount = 0;
    }

    public onTabsSelected(ev: MouseEvent): void {
        const x = ev.layerX - this._tabs.offsetLeft;
        const index = Math.floor((x / (this._tabs.clientWidth / this._tabsCount)));
        this.showTab(index);
    }
    public addTab(heading: HTMLElement, tab: HTMLElement): void {
        tab.style.display = "none";
        heading.style.borderRadius="8px";
        heading.style.border=`4px solid ${Colours.PrimaryLight}`;
        this._tabs.style.gridTemplateColumns = `repeat(${this._tabsCount + 1},1fr)`;
        this._tabs.style.msGridColumns = `repeat(${this._tabsCount + 1},1fr)`;
        this._tabs.appendChild(heading);
        this._tab.appendChild(tab);
        this._tabsCount++;
    }

    public showTab(index: number): void {
        if (index >= 0 && index <= this._tabsCount) {
            for (let i = 0; i < this._tabsCount; i++) {
                const child = this._tab.children[i] as HTMLElement;
                const tab = this._tabs.children[i] as HTMLElement;
                if (i == index) {
                    child.style.display = "initial";
                    tab.style.backgroundColor = Colours.PrimaryLight;
                } else {
                    child.style.display = "none";
                    tab.style.backgroundColor = Colours.Primary;
                }
            }
        }
    }
}