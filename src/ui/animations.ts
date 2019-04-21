import { transform } from "@babel/core";

export class Animations {

    public static scale(element: HTMLElement, finished?: Function): void {
        const anim = element.animate([
            {
                transform: `scale(0.0)`
            },
            {
                transform: `scale(1.0)`
            }

        ], { duration: 500, easing: "ease-out" });
        if (finished != undefined) {
            anim.onfinish = () => {
                finished();
            }
        }

    }

    public static show(element: HTMLElement, finished?: Function): void {
        const anim = element.animate([
            {
                opacity: 0,
            },
            {
                opacity: 1
            }

        ], { duration: 200, easing: "ease-in" });
        if (finished != undefined) {
            anim.onfinish = () => {
                finished();
            }
        }
    }

    public static hide(element: HTMLElement, finished?: Function): void {
        const anim = element.animate([
            {
                opacity: 1
            },
            {
                opacity: 0
            }

        ], { duration: 200, easing: "ease-out" });
        if (finished != undefined) {
            anim.onfinish = () => {
                finished();
            }
        }

    }
}