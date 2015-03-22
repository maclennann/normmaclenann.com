'use strict';
var nmcom = nmcom || {};

nmcom.util = nmcom.util || {
  arrayToUl: function(array){
    var list = document.createElement('ul');

    array.slice(0,10).forEach(function(e){
      var item = document.createElement('li');
      var link = document.createElement('a');
      link.href = e.link;
      link.appendChild(document.createTextNode(e.title));
      item.appendChild(link);

      list.appendChild(item);
    });

    return list;
  }
};

nmcom.views = nmcom.views || {
  blogPosts: function(selector){
    $(selector)[0].innerHTML = '<p id="blog-placeholder"><i class="fa fa-circle-o-notch fa-spin"></i>&nbsp;Loading Recent Blog Posts...</p>';

    jQuery.getFeed({
      url: 'https://blog.normmaclennan.com/rss/',
      success: function(feed) {
        $(selector)[0].appendChild(nmcom.util.arrayToUl(feed.items));
        var placeholder = document.getElementById('blog-placeholder');
        placeholder.parentNode.removeChild(placeholder);
      }
    });
  },
  countdown: function(selector, cb, timer){
    $(selector)[0].innerHTML=timer;

    var countdown = setInterval(function() {
      timer--;
      $(selector)[0].innerHTML=timer;
      if(timer === 0) {
        cb();
        clearInterval(countdown);
      }
    },1000);
  }
};
