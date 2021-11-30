import * as pkg from '../index';

describe('index', () => {
  it('should export all methods', () => {
    expect(pkg).toMatchInlineSnapshot(`
      Object {
        "PubSubHandlerResponse": [Function],
        "PubSubMessage": Object {
          "kind": Symbol(ObjectKind),
          "properties": Object {
            "attributes": Object {
              "kind": Symbol(RecordKind),
              "modifier": Symbol(OptionalModifier),
              "patternProperties": Object {
                "^.*$": Object {
                  "kind": Symbol(StringKind),
                  "type": "string",
                },
              },
              "type": "object",
            },
            "data": Object {
              "kind": Symbol(StringKind),
              "type": "string",
            },
            "messageId": Object {
              "kind": Symbol(StringKind),
              "modifier": Symbol(OptionalModifier),
              "type": "string",
            },
          },
          "required": Array [
            "data",
          ],
          "type": "object",
        },
        "PubSubRequest": Object {
          "kind": Symbol(ObjectKind),
          "properties": Object {
            "message": Object {
              "kind": Symbol(ObjectKind),
              "properties": Object {
                "attributes": Object {
                  "kind": Symbol(RecordKind),
                  "modifier": Symbol(OptionalModifier),
                  "patternProperties": Object {
                    "^.*$": Object {
                      "kind": Symbol(StringKind),
                      "type": "string",
                    },
                  },
                  "type": "object",
                },
                "data": Object {
                  "kind": Symbol(StringKind),
                  "type": "string",
                },
                "messageId": Object {
                  "kind": Symbol(StringKind),
                  "modifier": Symbol(OptionalModifier),
                  "type": "string",
                },
              },
              "required": Array [
                "data",
              ],
              "type": "object",
            },
            "subscription": Object {
              "kind": Symbol(StringKind),
              "type": "string",
            },
          },
          "required": Array [
            "message",
            "subscription",
          ],
          "type": "object",
        },
        "createPubSubCloudFunctions": [Function],
        "createPubSubServer": [Function],
        "handlePubSubMessage": [Function],
        "pubSubFastifyPlugin": [Function],
      }
    `);
  });
});
