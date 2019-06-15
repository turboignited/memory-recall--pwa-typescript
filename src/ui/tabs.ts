import { DivComponent } from "./components";
import { Colours } from "../utils/colours";

export class Tabs {

    private _container: HTMLDivElement;
    public get container(): HTMLDivElement {
        return this._container;
    }
    private _headings: HTMLDivElement;
    public get headings(): HTMLDivElement {
        return this._headings;
    }
    private _tab: HTMLDivElement;
    public get tab(): HTMLDivElement {
        return this._tab;
    }
    private _activeTab: number;
    public get activeTab(): number {
        return this._activeTab;
    }
    private _tabsCount: number;
    public get tabsCount(): number {
        return this._tabsCount;
    }

    constructor() {
        const headings = DivComponent();
        const tab = DivComponent();
        const container = DivComponent();

        // Hold tabs and tab
        container.style.display = "grid";
        container.style.gridTemplateColumns = container.style.msGridColumns = "1fr";
        container.style.gridTemplateRows = container.style.msGridRows = "1fr auto";

        // Hold individual tabs
        headings.style.display = "grid";
        headings.style.gridTemplateColumns = headings.style.msGridColumns = "repeat(1,1fr)";
        headings.onclick = (ev: MouseEvent) => {
            this.onTabsSelected(ev);
        }

        tab.style.overflowY = "scroll";

        container.appendChild(headings);
        container.appendChild(tab);

        this._headings = headings;
        this._tab = tab;
        this._container = container;
        this._tabsCount = 0;
        this._activeTab = 0;
    }

    public onTabsSelected(ev: MouseEvent): void {
        const x = ev.layerX - this._headings.offsetLeft;
        const index = Math.floor((x / (this._headings.clientWidth / this._tabsCount)));
        this.showTab(index);
    }
    public addTab(heading: HTMLElement, tab: HTMLElement): void {
        if (this._tabsCount != 0) {
            tab.style.display = "none";
        }
        heading.style.borderRadius = "8px";
        heading.style.border = `4px solid ${Colours.PrimaryLight}`;
        this._headings.style.gridTemplateColumns = this._headings.style.msGridColumns = `repeat(${this._tabsCount + 1},1fr)`;
        this._headings.appendChild(heading);
        this._tab.appendChild(tab);
        this._tabsCount++;
    }


    public showTab(index: number): void {
        if (index == this._activeTab) {
            return;
        }
        if (index >= 0 && index <= this._tabsCount) {
            const activeTab = this._tab.children[this._activeTab] as HTMLElement;
            const activeTabs = this._headings.children[this._activeTab] as HTMLElement;
            const indexTab = this._tab.children[index] as HTMLElement;
            const indexTabs = this._headings.children[index] as HTMLElement;

            activeTab.style.display = "none";
            activeTabs.style.backgroundColor = Colours.Primary;

            indexTab.style.display = "initial";
            indexTabs.style.backgroundColor = Colours.PrimaryLight;
            this._activeTab = index;
        }
    }
}