app({
    appId: 'VD97WMT6IW',
    apiKey: 'b8bbe11398038f430bc421bd75e9042a',
    indexName: 'dev_index',
    searchParameters: {
      hitsPerPage: 10,
    },
  });
  
  function app(opts) {
    const search = instantsearch({
      searchClient: algoliasearch(opts.appId, opts.apiKey),
      indexName: opts.indexName,
      routing: true,
      searchFunction: opts.searchFunction,
    });
  
    search.addWidgets([
      instantsearch.widgets.searchBox({
        container: '#search-input',
        placeholder: 'Nhập vào đây để tìm kiếm tài liệu',
      }),
      instantsearch.widgets.hits({
        container: '#hits',
        templates: {
          item: getTemplate('hit'),
          empty: getTemplate('no-results'),
        },
        transformItems(items) {
          return items.map(item => {
            /* eslint-disable no-param-reassign */
            item.starsLayout = getStarsHTML(item.rating);
            item.categories = getCategoryBreadcrumb(item);
            return item;
          });
        },
      }),
      
      instantsearch.widgets.pagination({
        container: '#pagination',
        scrollTo: '#search-input',
      }),
  
      // ---------------------
      //
      //  Filtering widgets
      //
      // ---------------------

      
      
     
      
    ]);
  
    search.start();
  }
  
  function getTemplate(templateName) {
    return document.querySelector(`#${templateName}-template`).innerHTML;
  }
  
  function getHeaderTemplate(name) {
    return `<div class="ais-header"><h5>${name}</h5></div>`;
  }
  
  function getCategoryBreadcrumb(item) {
    const highlightValues = item._highlightResult.categories || [];
    return highlightValues.map(category => category.value).join(' > ');
  }
  
  function getStarsHTML(rating, maxRating) {
    let html = '';
    const newRating = maxRating || 5;
  
    for (let i = 0; i < newRating; ++i) {
      html += `<span class="ais-star-rating--star${
        i < rating ? '' : '__empty'
      }"></span>`;
    }
  
    return html;
  }
