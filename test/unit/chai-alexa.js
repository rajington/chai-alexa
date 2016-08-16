import chaiAlexa from '../../src/chai-alexa';

describe('chaiAlexa', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(chaiAlexa, 'greet');
      chaiAlexa.greet();
    });

    it('should have been run once', () => {
      expect(chaiAlexa.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(chaiAlexa.greet).to.have.always.returned('hello');
    });
  });
});
