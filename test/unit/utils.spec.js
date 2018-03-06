import { util1 } from '../../src/util'
　　describe('utils.js', () => {
　　    it('should return name', () => {
　　      const name = util1('teapot')
　　      expect(name).to.equal('teapot')
　　    })
　　})