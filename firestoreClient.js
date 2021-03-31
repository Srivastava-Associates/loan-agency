const firestore = require("@google-cloud/firestore");
const path = require("path");

class firestoreClient{
  constructor() {
    this.firestor = new firestore({
      projectId: "srivastava-associates-308913",
      keyFilename: path.join(__dirname + "./service-account.json")
    })
  }

  async save(collection, data) {
    const docRef = db.collection(collection).doc(data.docName);
    await docRef.set(data);
  }
}

module.exports = new firestoreClient();
