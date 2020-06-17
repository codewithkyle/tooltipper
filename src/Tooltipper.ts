class Tooltipper {
    public refresh() {}
}
const globalTooltipper: Tooltipper = new Tooltipper();
const refresh: () => void = globalTooltipper.refresh.bind(globalTooltipper);
export { Tooltipper, refresh };
