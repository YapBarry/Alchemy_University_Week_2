const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa'; 

// -> only merkle root and the function that is used to verify needs to be stored on the blockchain
// -> making the merkle tree can be shifted to the client side
// -> make all the necessary things that the verifiyProof function needs in the client, and then
// -> pass to the client.
app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  
  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(body.proof, body.name, MERKLE_ROOT);

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
