var path = require('path');
var fs = require('fs');
var temp = require("temp").track();

var createAutoPublisher = require('../../src/autoPublisher');

function createFakeModuleDir(packageJsonContents){
  var dir = temp.mkdirSync();
  fs.writeFileSync(
    path.join(dir,'package.json'),
    JSON.stringify(packageJsonContents)
  );
  return dir;
}

describe('autoPublisher', function () {
  it('identifies that a new version could be published', function () {
    const fakeModuleDir = createFakeModuleDir({name:'cows',version:'16.6000.1513'});
    const autoPublisher = createAutoPublisher(fakeModuleDir);

    expect(autoPublisher.couldPublish()).to.eventually.be.true;
  });

  it('identifies that an existing version could not be published', function () {
    const fakeModuleDir = createFakeModuleDir({name:'cows',version:'1.1.0'});
    const autoPublisher = createAutoPublisher(fakeModuleDir);
    expect(autoPublisher.couldPublish()).to.eventually.be.false;
  });

  xit('missing module');
});