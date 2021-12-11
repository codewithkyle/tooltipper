class Tooltipper {
    private observer: MutationObserver;
    private trackedElements: {
        [uid: string]: any;
    };

    constructor() {
        this.trackedElements = {};

        document.addEventListener("mouseenter", this.showTooltip, { capture: true, passive: true });
        document.addEventListener("touchstart", this.showTooltip, { capture: true, passive: true });
        document.addEventListener("focus", this.showTooltip, { capture: true, passive: true });
        document.addEventListener("mouseleave", this.hideTooltip, { capture: true, passive: true });
        document.addEventListener("touchend", this.hideTooltip, { capture: true, passive: true });
        document.addEventListener("blur", this.hideTooltip, { capture: true, passive: true });
        document.addEventListener("click", this.clickTooltip, { capture: true, passive: true });
        document.addEventListener("keypress", this.clickTooltip, { capture: true, passive: true });

        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "attributes") {
                    if (mutation.attributeName === "tooltip" || mutation.attributeName === "aria-label") {
                        const el = mutation.target as HTMLElement;
                        let text = el.getAttribute("tooltip");
                        if (!text.length) {
                            text = el.getAttribute("aria-label");
                        }
                        if (!text.length) {
                            text = el.getAttribute("title");
                        }
                        const tooltip: HTMLElement = document.body.querySelector(`tool-tip[uid="${el.dataset.tooltipUid}"]`);
                        if (tooltip) {
                            tooltip.innerHTML = text;
                            this.placeTooltip(el, tooltip);
                        }
                    }
                }
            });
        });
    }

    private placeTooltip(el: HTMLElement, tooltip: HTMLElement) {
        const elBounds = el.getBoundingClientRect();
        tooltip.style.position = "absolute";
        tooltip.style.zIndex = "999999";
        tooltip.style.opacity = "0";
        if (!tooltip.isConnected) {
            document.body.appendChild(tooltip);
        }
        const tipBounds = tooltip.getBoundingClientRect();
        let tooltipLeft = elBounds.left + elBounds.width / 2 - tipBounds.width / 2;
        if (tooltipLeft + tipBounds.width > window.innerWidth - 4) {
            const diff = tooltipLeft + tipBounds.width - window.innerWidth + 4;
            tooltipLeft -= diff;
        } else if (tooltipLeft < 4) {
            tooltipLeft = 4;
        }
        let tooltipTop = elBounds.top + elBounds.height - window.scrollY;
        if (tooltipTop + tipBounds.height > window.innerHeight - 4) {
            tooltipTop = elBounds.top - tipBounds.height;
        } else if (tooltipTop + tipBounds.height > window.scrollY) {
            tooltipTop = elBounds.top + elBounds.height + window.scrollY;
        }
        tooltip.style.top = `${tooltipTop}px`;
        tooltip.style.left = `${tooltipLeft}px`;
    }

    private clickTooltip: EventListener = (e: Event) => {
        // @ts-ignore
        const el = e.target?.closest("[tooltip]");
        if (!(el instanceof HTMLElement) || el?.getAttribute("tooltip") === null) {
            return;
        }
        if (e instanceof KeyboardEvent) {
            if (e.key !== " ") {
                return;
            }
        }
        if (!el.dataset.tooltipUid) {
            el.dataset.tooltipUid = uuid();
        }
        const tooltip = document.body.querySelector(`tool-tip[uid="${el.dataset.tooltipUid}"]`);
        if (tooltip) {
            tooltip?.remove();
        }
    };

    private showTooltip: EventListener = (e: Event) => {
        const el = e.target as HTMLElement;
        if (!(el instanceof HTMLElement) || el?.getAttribute("tooltip") === null) {
            return;
        }
        let text = el.getAttribute("tooltip");
        if (!text.length) {
            text = el.getAttribute("aria-label");
        }
        if (!text.length) {
            text = el.getAttribute("title");
        }
        if (!text.length) {
            console.warn(`Tooltip could not be created -- missing aria-label, tooltip, or title attribute.`);
            return;
        }
        if (!el.dataset.tooltipUid) {
            el.dataset.tooltipUid = uuid();
        }
        let tooltip: HTMLElement = document.body.querySelector(`tool-tip`) || document.createElement("tool-tip");
        tooltip.setAttribute("uid", el.dataset.tooltipUid);
        tooltip.innerHTML = text;
        tooltip.setAttribute("role", "tooltip");
        this.placeTooltip(el, tooltip);
        tooltip.classList.add("visible");
        tooltip.style.opacity = "1";

        if (!(el.dataset.tooltipUid in this.trackedElements)) {
            this.observer.observe(el, {
                attributes: true,
            });
            this.trackedElements[el.dataset.tooltipUid] = null;
        }
    };

    private hideTooltip: EventListener = (e: Event) => {
        const el = e.target as HTMLElement;
        if (!(el instanceof HTMLElement) || el?.getAttribute("tooltip") === null || !el?.dataset?.tooltipUid) {
            return;
        }
        const tooltip = document.body.querySelector(`tool-tip[uid="${el.dataset.tooltipUid}"]`);
        if (tooltip) {
            tooltip?.remove();
        }
    };
}
function uuid() {
    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
}
const tooltipper: Tooltipper = new Tooltipper();
export { tooltipper as default };
