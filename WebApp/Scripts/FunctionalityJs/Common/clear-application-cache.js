
$(function () {
    setTimeout(function () {


        var randomh = Math.random();
        //  var randomh = Date.now();
        var e = document.getElementsByTagName("script")[0];
        var mainJs = document.querySelector("body > script:nth-child(26)");
        //var d = document.createElement("script");
        //   d.src = "//site.com/js.js?x=" + randomh + "";
        //   d.src = "//localhost:63293/js.js?x=" + randomh + "";
        //d.src = "//localhost:63293?x=" + randomh + "";
        e.src + "?x=" + randomh + "";
        mainJs.src + "?x=" + randomh + "";
        mainJs.type = "text/javascript";
        mainJs.async = true;
        mainJs.defer = true;
        e.defer = true;
        e.async = true;
        e.defer = true;
         
   //     e.parentNode.insertBefore(d, e);
        addTinyMCE()
    }, 4000);

})
