// CC final project Naive Turk

// contributor : Yuntao Zhou, Yanzun Huang, Chuankai Zhang

// file operation javascript file

var read_list,write_file,load_content,append_content,delete_file;

var onInitFs = function(fs) {
  //console.log('Opened file system: ' + fs.name);
  fs.root.getFile('list.txt', {create: true, exclusive: true}, function(fileEntry) {
  	// the list file contains all the title:keywords,keywords,keywords ,
  	// one save one line

  }, errorHandler);

  // read file helping function ********************
  read_list = function(filename){
    fs.root.getFile(filename, {}, function(fileEntry) {

      // Get a File object representing the file,
      // then use FileReader to read its contents.
      fileEntry.file(function(file) {
         var reader = new FileReader();
         
         reader.onloadend = function(e) {
           // return the readcontent
           console.log(this.result);

           var title_list = this.result.split("\n");
           for(var i = 0; i < title_list.length; i++){
            var element = $("<li><a href=\"javascript:void(0)\">"+title_list[i]+"</a></li>");
            
            element.onclick = load_content(title_list[i]+"_content.txt");
            $("#groupid").append(element);
           }

         };

         reader.readAsText(file);
      }, errorHandler);

    }, errorHandler);

  }

  // write certain content to a file with filename given
  write_file = function(filename, content){
    
    fs.root.getFile(filename, {create: true}, function(fileEntry) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function(e) {
        console.log('Write completed.');
      };

      fileWriter.onerror = function(e) {
        console.log('Write failed: ' + e.toString());
      };

      // Create a new Blob and write it to log.txt.
      var blob = new Blob([content], {type: 'text/plain'});

      fileWriter.write(blob);

    }, errorHandler);

  }, errorHandler);
  }

  
  // load the content of certain file and add a textarea element to the html
  load_content = function(filename){
    fs.root.getFile(filename, {}, function(fileEntry) {

      // Get a File object representing the file,
      // then use FileReader to read its contents.
      fileEntry.file(function(file) {
         var reader = new FileReader();
         reader.onloadend = function(e) {
           // return the readcontent
           $("#content").remove();

           $("#content_board").append("<br></br>");
           var txtArea = $("<textarea id='content'></textarea>");
           $("#content_board").append(txtArea);
           $("#content").css("width",600+"px");
           $("#content").css("height",400+"px");
           $("#content").css("resize", "none");
           //$("#content").css("value",this.result);
           document.getElementById("content").value = this.result;

         };

         reader.readAsText(file);
      }, errorHandler);

    }, errorHandler);

  }

  // append certain content to certain file
  append_content = function(filename,content){
    fs.root.getFile(filename, {create: false}, function(fileEntry) {

      // Create a FileWriter object for our FileEntry (log.txt).
      fileEntry.createWriter(function(fileWriter) {

        fileWriter.seek(fileWriter.length); // Start write position at EOF.

        // Create a new Blob and write it to log.txt.
        var blob = new Blob([content], {type: 'text/plain'});

        fileWriter.write(blob);

      }, errorHandler);

    }, errorHandler);


  }

// delete certain file
  delete_file = function(filename){
    fs.root.getFile(filename, {create: false}, function(fileEntry) {

      fileEntry.remove(function() {
        console.log('File removed.');
      }, errorHandler);

    }, errorHandler);

  }
 
 // prepare the list elements for the search group *******************

 // call read_list to get all existing saved survey titles
 if(document.getElementById("groupid"))
  //console.log("getin!");
  read_list("list.txt");


}
// error handler ********************
function errorHandler(e) {
  var msg = '';

  // switch (e.code) {
  //   case FileError.QUOTA_EXCEEDED_ERR:
  //     msg = 'QUOTA_EXCEEDED_ERR';
  //     break;
  //   case FileError.NOT_FOUND_ERR:
  //     msg = 'NOT_FOUND_ERR';
  //     break;
  //   case FileError.SECURITY_ERR:
  //     msg = 'SECURITY_ERR';
  //     break;
  //   case FileError.INVALID_MODIFICATION_ERR:
  //     msg = 'INVALID_MODIFICATION_ERR';
  //     break;
  //   case FileError.INVALID_STATE_ERR:
  //     msg = 'INVALID_STATE_ERR';
  //     break;
  //   default:
  //     msg = 'Unknown Error';
  //     break;
  // };

  console.log('Error: ' + msg);
}

// request the persistent storage space from local from user
navigator.webkitPersistentStorage.requestQuota( 50*1024*1024 /*50MB*/, function(grantedBytes) {
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
  window.requestFileSystem(window.PERSISTENT, grantedBytes , onInitFs, errorHandler);
}, function(e) {
  console.log('Error', e);
});








