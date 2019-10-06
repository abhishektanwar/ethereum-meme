import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import meme from '../abis/meme.json';

const ipfsClient = require('ipfs-http-client')
// connection to an ipfs node
// const ipfs = ipfsClient('localhost','5001'{protocol:'http'})
var ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  // get account
  // get network
  // get smart contract
  // get meme Hash

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({eth_account:accounts})
    const networkId = await web3.eth.net.getId()
    console.log(networkId)
    const networkData = meme.networks[networkId]
    if(networkData){
      //fetch contract
      const abi = meme.abi
      const address = networkData.address

      const contract = web3.eth.Contract(abi , address)
      this.setState({contract:contract})
      console.log(contract)
      const memeHash = await contract.methods.get().call()
    }
    else{
      window.alert('contract not deployed to detected network')
    }
  }
  constructor(props){
    super(props);
    this.state={
      buffer:null,
      memeHash:'QmdygKgEmUECQCQhciBeRqEpaNPU81wSxoJbv9VQZGFaEY',
      eth_account:'',
      contract:null
    };
  }
// structure of object returned by window.ethereum and window.web3.currentProvider is similar.
// window.ethereum is a subset of window.web3
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('please use metamask')
    }
  }

  captureFile = (event) => {
    event.preventDefault()
    console.log('file captured')
    
    
    //capturing the upoaded file
    const file = event.target.files[0]
    // console.log(file)
    //precess the uploaded file for ipfs
    // FileReader is used to read the contents of the uploaded file
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({buffer:Buffer(reader.result)})
      console.log('buffer',this.state.buffer)
    }

  }
  // hash returned by ipfs:"QmdygKgEmUECQCQhciBeRqEpaNPU81wSxoJbv9VQZGFaEY"
  onSubmit = async (event) => {
    event.preventDefault()
    console.log('submitting the form.')
    console.log(this.state.memeHash)

    const results = await ipfs.add(this.state.buffer)
    console.log('ipfs results',results)
    const Hash = results[0].hash
    console.log(Hash)
    this.setState({memeHash:Hash})
    console.log(this.state.memeHash)

    
    // ipfs.add(this.state.buffer,(error,result) => {
    //   console.log('ipfs results',result)

    //   const memeHash = result.hash
    //   console.log('memHash1',memeHash)
    //   this.setState({memeHash:memeHash})
    //   console.log(this.state.memeHash)
    //   if(error){
    //     console.error(error)
    //     return
    //   }
    // })
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meme of the day
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white">{this.state.eth_account}</small>
            </li>

          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={'https://ipfs.infura.io/ipfs/'+this.state.memeHash} />
                </a>
                <p>&nbsp;</p>
                <h2>Change meme</h2>
                <form onSubmit={this.onSubmit}>
                  
                  <input type='file' onChange={this.captureFile}/>
                  <input type='submit'/>
                  
                </form>
                
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
