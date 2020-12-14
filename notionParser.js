const H3 = "sub_sub_header";
const TEXT = "text";

class NotionParser {
  parsePage(json) {
    const rawTree = json.recordMap.block;
    const blockIds = Object.keys(rawTree);
    const pageId = blockIds.find((id) => {
      const block = rawTree[id].value;
      if (block.type === "page") {
        return block;
      }
    });
    const page = rawTree[pageId].value;
    const title = page.properties.title[0][0];
    const content = this._buildContent(page, rawTree);

    return {
      title,
      content,
    };
  }

  _buildContent(page, rawTree) {
    const contentIds = page.content;
    const contentArray = [];

    contentIds.forEach((id) => {
      const content = rawTree[id].value;
      const block = this._buildBlock(content);
      contentArray.push(block);
    });

    return contentArray;
  }

  _buildBlock(content) {
    if (content.type === H3) {
      return {
        type: "h3",
        text: content.properties.title[0][0],
      };
    }
    if (content.type === TEXT) {
      if (content.properties) {
        return {
          type: "text",
          text: content.properties.title[0][0],
        };
      }
    }
  }
}

module.exports = NotionParser;
