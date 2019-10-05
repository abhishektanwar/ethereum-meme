pragma solidity 0.5.0;
// we need to perform two activities 
// first : write the meme hash on blockchain
// second : read from blockchain and update on frontend
contract meme {
    string memeHash;

    // write function
    function set(string memory _memeHash) public {
        memeHash = _memeHash ;


    }

    // read function
    function get() public view returns (string memory){
        return memeHash ;
    }
}