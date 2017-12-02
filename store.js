function storeContent(e) {
  console.log(document.getElementById('title').value);
  write_file(document.getElementById('title').value + '_content.txt', document.getElementById('actualText').value);
}

document.addEventListener('DOMContentLoaded', function () {
    var divs = document.querySelectorAll('div');
    for (var i = 0; i < divs.length; i++) {
        if (divs[i].id == "storeContent")
        {
            divs[i].addEventListener('click', storeContent);
        }
    }
});
