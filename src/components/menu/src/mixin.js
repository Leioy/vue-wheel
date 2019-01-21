import { findComponentUpward, findComponentsUpward } from '../../../utils/assistant'
export default {
  data () {
    return {
      menu: findComponentUpward(this, 'y-menu'),
    }
  },
  computed: {
    hasParentSubmenu () {
      return !!findComponentUpward(this, 'y-sub-menu')
    },
    parentSubmenuNum () {
      return findComponentsUpward(this, 'y-sub-menu').length
    },
    mode () {
      return this.menu.mode
    },
  },
}
