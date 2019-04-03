import Vue from 'vue'
import svgIcon from '@/components/icon/icon'

Vue.component(svgIcon.name, svgIcon)
// requires and returns all modules that match
const requireAll = requireContext => requireContext.keys().map(requireContext)

// import all svg
const req = require.context('./svg', true, /\.svg$/)
requireAll(req)
