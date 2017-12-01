// CC final project Naive Turk

// contributor : Yuntao Zhou, Yanzun Huang, Chuankai Zhang



var globle_fs;

function onInitFs(fs) {
  console.log('Opened file system: ' + fs.name);
  fs.root.getFile('list.txt', {create: true, exclusive: true}, function(fileEntry) {
  	// the list file contains all the title:keywords,keywords,keywords ,
  	// one save one line

  }, errorHandler);

  globle_fs = fs;

}
// error handler ********************
function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}

// request the persistent storage space from local from user
window.webkitStorageInfo.requestQuota(PERSISTENT, 50*1024*1024 /*50MB*/, function(grantedBytes) {
  window.requestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
}, function(e) {
  console.log('Error', e);
});


// read file helping function ********************
function read_file(filename){
	globle_fs.root.getFile(filename, {}, function(fileEntry) {

    // Get a File object representing the file,
    // then use FileReader to read its contents.
    fileEntry.file(function(file) {
       var reader = new FileReader();

       reader.onloadend = function(e) {
         // return the readcontent
         return this.result;
       };

       reader.readAsText(file);
    }, errorHandler);

  }, errorHandler);
}

// write content to certain file name file
function write_file(filename, content){
	globle_fs.root.getFile(filename, {create: true}, function(fileEntry) {

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

// append certain content to certain file
function append_content(filename,content){
	globle_fs.root.getFile(filename, {create: false}, function(fileEntry) {

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
function delete_file(filename){
	globle_fs.root.getFile(filename, {create: false}, function(fileEntry) {

    fileEntry.remove(function() {
      console.log('File removed.');
    }, errorHandler);

  }, errorHandler);

}


