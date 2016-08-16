import chai from 'chai';
import chaiAlexa from '../../src/chai-alexa';

chai.use(chaiAlexa);

describe('chaiAlexa', () => {
  describe('assertPhrase', () => {
    const response = {
      version: '1.0',
      sessionAttributes: {
        key: 'this is in session attributes text',
      },
      response: {
        outputSpeech: {
          type: 'PlainText',
          text: 'this is in plain text',
        },
        card: {
          type: 'Standard',
          title: 'this is in title text',
          text: 'this is in card text',
        },
        reprompt: {
          outputSpeech: {
            type: 'SSML',
            ssml: '<speak>this is in <s>ssml</s> <p>text</p></speak>',
          },
        },
        shouldEndSession: false,
      },
    };

    it('should find phrase in text', () => {
      expect(response).to.have.phrase('plain text');
    });

    it('should not find phrase in sessionAttributes', () => {
      expect(response).to.not.have.phrase('session attributes text');
    });

    it('should find phrase in ssml text', () => {
      expect(response).to.have.phrase('ssml text');
    });

    it('should find phrase in card text', () => {
      expect(response).to.have.phrase('card text');
    });
  });
});
