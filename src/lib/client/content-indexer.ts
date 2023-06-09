import { SearchContent } from '@/types/markdown';
import { getLocalSearchIndex } from '@/utils/get-local-search-index';
import * as JsSearch from 'js-search';

/** 2023/06/30 - JsSearch Class - by leekoby */
class ContentIndexer {
  private static instance: ContentIndexer;

  //definite assignment asserstion
  private searchEngine!: JsSearch.Search;

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  constructor() {
    this.buildIndex();
  }

  public search(query: string): SearchContent[] {
    const results = this.searchEngine.search(query);
    return results as SearchContent[];
  }

  // TODO: Stemming / Tokenization
  private buildIndex() {
    this.searchEngine = new JsSearch.Search('slug');
    this.searchEngine.addIndex('title');
    this.searchEngine.addIndex('description');
    this.searchEngine.addDocuments(getLocalSearchIndex());
  }
}

export default ContentIndexer.Instance;
