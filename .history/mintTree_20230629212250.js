function mintTree() {
    // Check if MetaMask is connected
    if (!window.ethereum) {
      alert("Please connect your MetaMask wallet");
      return;
    }
  
    // Get the user's address
    const address = window.ethereum.selectedAddress;
  
    // Get the species, age, location, proof of plant, and proof of life from the form
    const species = document.getElementById("species").value;
    const age = document.getElementById("age").value;
    const location = document.getElementById("location").value;
    const proofOfPlant = document.getElementById("proofOfPlant").value;
    const proofOfLife = document.getElementById("proofOfLife").value;
  
    // Mint the tree
    const contract = new web3.eth.Contract(TreeNFT.ABI, TreeNFT.CONTRACT_ADDRESS);
    contract.methods.mint(address, species, age, location, proofOfPlant, proofOfLife).send({
      from: address,
    });
  
    // Redirect to the trees page
    window.location.href = "/trees";
  }
  