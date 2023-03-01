class LoadingManager {
  loadingRef: any = null;
  register(_ref: any) {
    this.loadingRef = _ref;
  }

  unregister(_ref: any) {
    if (
      !!this.loadingRef
      && this.loadingRef._id
      && this.loadingRef._id === _ref._id
    ) {
      this.loadingRef = null;
    }
  }

  getDefault = () => {
    return this.loadingRef;
  };
}
export default new LoadingManager();
