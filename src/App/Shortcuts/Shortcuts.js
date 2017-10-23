
export default function (e) {
  if (e.code === 'Escape') {
    this.$emit('key.escape');
    return true;
  }

  if (e.metaKey || e.ctrlKey) {
    if (e.code === 'KeyS') {
      e.preventDefault();
      this.$emit('key.save');
      return true;
    }
  }
}
