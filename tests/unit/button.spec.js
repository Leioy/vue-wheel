import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount } from '@vue/test-utils'
import Button from '@/components/button/button'
chai.use(sinonChai)

describe('Button.vue', () => {
  it('存在.', () => {
    expect(Button).to.exist
  })
  it('可以设置icon.', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings',
      },
    })
    const useElement = wrapper.find('use')
    expect(useElement.attributes()['href']).to.equal('#icon-settings')
  })
  it('可以设置loading.', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings',
        loading: true,
      },
    })
    const vm = wrapper.vm
    const useElements = vm.$el.querySelectorAll('use')
    expect(useElements.length).to.equal(1)
    expect(useElements[0].getAttribute('xlink:href')).to.equal('#icon-loading')
  })
  it('点击 button 触发 click 事件', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings',
      },
    })
    const vm = wrapper.vm

    const callback = sinon.fake()
    vm.$on('click', callback)
    vm.$el.click()
    expect(callback).to.have.been.called
  })
})
