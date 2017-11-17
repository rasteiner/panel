
import Vue from 'vue';

Vue.config.keyCodes = {
  separator: [188, 190]
}


export default function (e) {

  if (e.code === 'Escape') {
    this.$emit('key.escape');
    return true;
  }

  if (e.metaKey || e.ctrlKey) {

    this.$emit('key.cmd+' + e.key);

    switch (e.code) {
      case 'KeyS':
        e.preventDefault();
        this.$emit('key.save');
        return true;
    }

  }

}
