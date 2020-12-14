const landingPage = require("../fixtures/simpleLanding.json");
const NotionParser = require("../notionParser");

describe("NotionParser", () => {
  let parser;

  beforeEach(() => {
    parser = new NotionParser();
  });

  it("should parse a notion page", () => {
    const page = parser.parsePage(landingPage);

    expect(page.title).toEqual("Landing Page");
    expect(page.content[0]).toEqual({
      type: "h3",
      text: "What are we",
    });
    expect(page.content[1]).toEqual({
      type: "text",
      text: "Lorem Ipsum",
    });
    expect(page.content[2]).toEqual({
      type: "h3",
      text: "Where do we work",
    });
    expect(page.content[3]).toEqual({
      type: "text",
      text: "In Guadalajara, Mexico",
    });
    expect(page.content[4]).toEqual({
      type: "h3",
      text: "Wanna know more?",
    });
    /*
    expect(page.content[5]).toEqual({
      type: 'multiple',
      blocks: [{
        type: 'text',
        text: 'Send us an email. ',
      }, {
        type: 'link',
        link: '<a href="mailto:contact@contact.com">contact@hotmail.com</a>',
      }]
    });
    */
  });
});
