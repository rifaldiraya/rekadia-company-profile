const { copyFileSync } = require('fs')

function copyFile(source, destination) {
  copyFileSync(source, destination)
  console.log('copy: ', source, destination)
}

module.exports = {
  copyFile,
}
