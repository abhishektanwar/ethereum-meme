import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';

const ipfsClient = require('ipfs-http-client')
// connection to an ipfs node
// const ipfs = ipfsClient('localhost','5001'{protocol:'http'})
var ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      buffer:null,
      memeHash:'QmdygKgEmUECQCQhciBeRqEpaNPU81wSxoJbv9VQZGFaEY'
    };
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
            Dapp University
          </a>
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
