export const escapableMixin = {
  created() {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        this.handleEscape();
      }
    };

    document.addEventListener('keydown', handleEscape);

    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', handleEscape);
    });
  },
};
