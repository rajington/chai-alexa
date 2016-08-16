// import chaiJsonSchema from 'chai-json-schema';
// import { skillsKitResponse } from 'alexa-schemas';
import { get } from 'lodash';

const stripSSML = ssml => ssml.replace(/<\/?[^>]+>/g, '');

module.exports = function chaiAlexa(chai, utils) {
  // expect(response).to.have.sessionAttributes
  // chai.use(chaiJsonSchema);
  // chai.tv4.banUnknown = true;
  // chai.tv4.addSchema(skillsKitResponse);

  chai.Assertion.overwriteMethod('phrase', () =>
    function assertPhrase(phrase) {
      const sanitizedPhrase = stripSSML(phrase).toLowerCase();
      const obj = utils.flag(this, 'object');

      // // validate response
      // new Assertion(this._obj).to.be.jsonSchema(skillsKitResponse);

      const getResponse = property => {
        const output = get(obj, `response.${property}`);
        if (output && property.includes('ssml')) {
          return stripSSML(output);
        }
        return output;
      };

      // combine all the possible locations
      const output = [
        'outputSpeech.text',
        'outputSpeech.ssml',
        'reprompt.outputSpeech.text',
        'reprompt.outputSpeech.ssml',
        'card.title',
        'card.content',
        'card.text',
      ].map(getResponse)
      .filter(response => response) // filter out nulls
      .map(response => response.toLowerCase())
      .join();

      // TODO: better messages, e.g. where it was found
      this.assert(
          output.includes(sanitizedPhrase)
        , 'expected #{this} to have phrase "#{exp}" but got #{act}'
        , 'expected #{this} to not have phrase "#{exp}" in #{act}'
        , sanitizedPhrase   // expected
        , output            // actual
      );
    }
  );
};
