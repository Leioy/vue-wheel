import './assets/styles/index.scss'
import './assets/icons/index'
import Button from './components/button/button.vue'
import ButtonGroup from './components/button/button-group.vue'
import CascaderItem from './components/cascader/cascader-item.vue'
import CascaderPane from './components/cascader/cascader-pane.vue'
import Cascader from './components/cascader/cascader.vue'
import Col from './components/col/col.vue'
import CollapseItem from './components/collapse/collapse-item.vue'
import Collapse from './components/collapse/collapse.vue'
import DatePicker from './components/date-picker/date-picker'
import Icon from './components/icon/icon.vue'
import MenuItem from './components/menu/menu-item'
import SubMenu from './components/menu/sub-menu'
import Menu from './components/menu/menu'
import Message from './components/message/index'
import Pager from './components/pager/pager.vue'
import Popover from './components/popover/popover.vue'
import Row from './components/row/row.vue'
import Sticky from './components/sticky/sticky.vue'
import Pane from './components/tabs/pane.vue'
import Tabs from './components/tabs/tabs.vue'

const components = [
  Button,
  ButtonGroup,
  CascaderItem,
  CascaderPane,
  Cascader,
  Col,
  CollapseItem,
  Collapse,
  DatePicker,
  Icon,
  MenuItem,
  SubMenu,
  Menu,
  Pager,
  Popover,
  Row,
  Sticky,
  Pane,
  Tabs,
]
const install = Vue => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  Vue.use(Message)
}
export default {
  install,
  Button,
  ButtonGroup,
  CascaderItem,
  CascaderPane,
  Cascader,
  Col,
  CollapseItem,
  Collapse,
  DatePicker,
  Icon,
  MenuItem,
  SubMenu,
  Menu,
  Pager,
  Popover,
  Row,
  Sticky,
  Pane,
  Tabs,
  Message,
}
