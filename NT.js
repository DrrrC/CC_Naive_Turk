// CC final project Naive Turk

// contributor : Yuntao Zhou, Yanzun Huang, Chuankai Zhang

function clickStore(e) {
  // chrome.tabs.executeScript(null,
  //     {code:"window.open('https://www.google.com', '_blank')"});
    chrome.tabs.create({url: chrome.extension.getURL('store.html')});
    window.close();
}

function clickSearch(e) {
    // chrome.tabs.executeScript(null,
    //     {code:"window.open('https://www.bing.com', '_blank')"});
    chrome.tabs.create({url: chrome.extension.getURL('search.html')});
    window.close();
}

document.addEventListener('DOMContentLoaded', function () {
    var divs = document.querySelectorAll('div');
    for (var i = 0; i < divs.length; i++) {
        if (divs[i].id == "store")
        {
            divs[i].addEventListener('click', clickStore);
        }
        else
        {
            divs[i].addEventListener('click', clickSearch);
        }
    }
});

