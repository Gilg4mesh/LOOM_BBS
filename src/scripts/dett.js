let Web3
if ( process.env.HEADLESS ) {
  Web3 = require('web3')
}
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet-rpc.dexon.org/ws'))
const cacheNet = new Web3('https://testnet-rpc.dexon.org')
const ABIBBS = [{"constant":!1,"inputs":[{"name":"content","type":"string"}],"name":"Post","outputs":[],"payable":!1,"stateMutability":"nonpayable","type":"function"},{"anonymous":!1,"inputs":[{"indexed":!1,"name":"content","type":"string"}],"name":"Posted","type":"event"}]
const ABIBBSExt = [{"constant":false,"inputs":[{"name":"content","type":"string"}],"name":"Post","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"origin","type":"bytes32"},{"name":"vote","type":"uint256"},{"name":"content","type":"string"}],"name":"Reply","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"origin","type":"bytes32"},{"indexed":false,"name":"vote","type":"uint256"},{"indexed":false,"name":"content","type":"string"}],"name":"Replied","type":"event"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"downvotes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"upvotes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"voted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]
const ABIBBSAdmin = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isAdmin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"who","type":"address"},{"name":"_isAdmin","type":"bool"}],"name":"setAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"origin","type":"bytes32"},{"name":"_banned","type":"bool"}],"name":"ban","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"banned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"category","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_category","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"origin","type":"bytes32"},{"indexed":false,"name":"banned","type":"bool"},{"indexed":false,"name":"admin","type":"address"}],"name":"Ban","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]
const ABIBBSEdit = [{"constant":false,"inputs":[{"name":"origin","type":"bytes32"},{"name":"content","type":"string"}],"name":"edit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"origin","type":"bytes32"},{"indexed":false,"name":"content","type":"string"}],"name":"Edited","type":"event"}]
const ABICache = [{"constant":false,"inputs":[{"name":"long","type":"bytes32"},{"name":"short","type":"bytes32"},{"name":"cur","type":"uint256"}],"name":"link","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"time","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"milestone","type":"uint256"},{"name":"cur","type":"uint256"}],"name":"addMilestone","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMilestones","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"links","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"clearMilestone","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"long","type":"bytes32"},{"indexed":false,"name":"short","type":"bytes32"},{"indexed":false,"name":"time","type":"uint256"}],"name":"Link","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]
const BBSContract = '0x663002C4E41E5d04860a76955A7B9B8234475952'
const BBSExtContract = '0xec368ba43010056abb3e5afd01957ea1fdbd3d8f'
const BBSAdminContract = '0x88eb672e01c1a2a6f398b9d52c7dab5f87ca8c2c'
const BBSEditContract = '0x826cb3e5aa484869d9511aad3ead74d382608147'
const BBSCacheContract = '0x5c10A77454cF98B273F54199DE3454ae2586e7A4'
const BBS = new web3.eth.Contract(ABIBBS, BBSContract)
const BBSExt = new web3.eth.Contract(ABIBBSExt, BBSExtContract)
const BBSAdmin = new web3.eth.Contract(ABIBBSAdmin, BBSAdminContract)
const BBSEdit = new web3.eth.Contract(ABIBBSEdit, BBSEditContract)
const shortURLandMilestone = new cacheNet.eth.Contract(ABICache, BBSCacheContract)

const titleLength = 40
const commentLength = 56

const parseText = (str, len) => {
  let tmp = '', count = 0;
  for(let i=0;i<str.length; i++){
    if (str[i].match(/[\u4e00-\u9fa5]/g)) tmp+=str[i],count+=2
    else if (str[i].match(/[\u0800-\u4e00]/g)) tmp+=str[i],count+=2
    else if (str[i].match(/[\uff00-\uffff]/g)) tmp+=str[i],count+=2
    else tmp+=str[i],count++

    if (count === len) break
    else if (count>len)
      tmp = tmp.substr(0,tmp.length-1)
  }
  return tmp
}

class Article {
  constructor(_transaction) {
    // constant
    this.titleLength = titleLength

    this.transaction = _transaction
    this.rawContent = web3.utils.hexToUtf8('0x' + this.transaction.input.slice(138))
    this.titleMatch = false
    this.title = this.getTitle()
    this.content = this.getContent()
    this.author = this.transaction.from
    this.editTimestamps = []
  }

  async init() {
    this.block = await web3.eth.getBlock(this.transaction.blockNumber)
    this.timestamp = this.block.timestamp
  }

  async initEdits(edits) {
    for ( let edit of edits ){
      const _transaction = await web3.eth.getTransaction(edit.transactionHash)
      if (_transaction.from === this.author) {
        this.rawContent = edit.returnValues.content
        this.title = this.getTitle()
        this.content = this.getContent()
        let block = await web3.eth.getBlock(edit.blockNumber)
        this.editTimestamps.push(block.timestamp)
      }
    }
  }

  getTitle(){
    // title format : [$title]
    let content = this.rawContent
    content = parseText(content, this.titleLength+'[]'.length)
    const match = content.match(/^\[(.*)\]/)
    this.titleMatch = !!match
    return match ? match[1] : content
  }

  getContent(){
    return this.titleMatch ? this.rawContent.slice(this.title.length+'[]'.length) : this.rawContent
  }
}

class Comment {
  constructor(event) {
    // constant
    this.commentLength = commentLength

    this.tx = event.transactionHash
    this.rawContent = event.returnValues.content
    this.content = this.getContent()
    this.vote = +event.returnValues.vote
  }

  async init() {
    this.transaction = await web3.eth.getTransaction(this.tx)
    this.author = this.transaction.from
    this.block = await web3.eth.getBlock(this.transaction.blockNumber)
    this.timestamp = this.block.timestamp
  }

  getContent() {
    return parseText(this.rawContent, this.commentLength)
  }
}

class Dett {
  constructor(_dexonWeb3) {
    this.dexonWeb3 = _dexonWeb3
    this.account = ''

    // constant
    this.fromBlock = '1170000'
    this.commentLength = commentLength
    this.titleLength = titleLength
    this.dexonBBSExt = this.dexonWeb3 ? new this.dexonWeb3.eth.Contract(ABIBBSExt, BBSExtContract) : null
    this.dexonBBSEdit = this.dexonWeb3 ? new this.dexonWeb3.eth.Contract(ABIBBSEdit, BBSEditContract) : null
  }

  async init() {
    this.BBSevents = await BBS.getPastEvents('Posted', {fromBlock : this.fromBlock })
    this.BBSEditEvents = await BBSEdit.getPastEvents('Edited', {fromBlock : this.fromBlock })
  }

  async getArticles(){
    return this.BBSevents.reverse().map(async (event) => {
      const [article, votes, banned] = await Promise.all([
        this.getArticle(event.transactionHash, false),
        this.getVotes(event.transactionHash),
        this.getBanned(event.transactionHash),
      ])

      return [article, votes, banned]
    })
  }

  async getArticle(tx, checkEdited){

    const transaction = await web3.eth.getTransaction(tx)

    // check transaction to address is bbs contract
    if (!this.isDettTx(transaction.to)) return null

    const article = new Article(transaction)
    await article.init()

    if (checkEdited) {
      const edits = this.BBSEditEvents.filter(event => event.returnValues.origin === tx )
      if (edits.length >0) await article.initEdits(edits)
    }

    return article
  }

  async getVotes(tx){
    const [upvotes, downvotes] = await Promise.all([
      BBSExt.methods.upvotes(tx).call(),
      BBSExt.methods.downvotes(tx).call(),
    ])

    return upvotes - downvotes
  }

  async getVoted(tx){
    return await BBSExt.methods.voted(this.account, tx).call()
  }

  async getBanned(tx){
    return await BBSAdmin.methods.banned(tx).call()
  }

  async getComments(tx){
    const events = await BBSExt.getPastEvents('Replied', {fromBlock : this.fromBlock})

    return events.filter((event) => {return tx == event.returnValues.origin}).map(async (event) => {
      const [comment] = await Promise.all([
        this.getComment(event),
      ])

      return [comment]
    })
  }

  async getComment(event){
    const comment = new Comment(event)
    await comment.init()

    return comment
  }

  async reply(tx, replyType, content) {
    if (!this.dexonWeb3)
      return alert('Please connect to your DEXON Wallet first.')

    if (![0, 1, 2].includes(+replyType))
      return alert('Wrong type of replyType.')

    if (!content.length)
      return alert('No content.')

    if (tx) {
      const gas = await this.dexonBBSExt.methods.Reply(tx, +replyType, content).estimateGas()
      try {
        await this.dexonBBSExt.methods.Reply(tx, +replyType, content).send({ from: this.account, gas: gas })
        .on('confirmation', (confirmationNumber, receipt) => {
          window.location.reload()
        })
      }
      catch(err){
        alert(err)
      }
    }
  }

  async post(title, content){
    if (!this.dexonWeb3)
      return alert('Please connect to your DEXON Wallet.')

    if (title.length > this.titleLength)
      return alert('Title\'s length is over 40 characters.')

    const post = '[' + title + ']' + content

    const gas = await this.dexonBBSExt.methods.Post(post).estimateGas()
    try {
      await this.dexonBBSExt.methods.Post(post).send({ from: this.account, gas: gas })
      .on('confirmation', (confirmationNumber, receipt) => {
        window.location = '/'
      })
    }
    catch(err){
      alert(err)
    }
  }

  async edit(tx, title, content){
    if (!this.dexonWeb3)
      return alert('Please connect to your DEXON Wallet.')

    if (title.length > this.titleLength)
      return alert('Title\'s length is over 40 characters.')

    const transaction = await web3.eth.getTransaction(tx)
    if (this.account.toLowerCase() !== transaction.from.toLowerCase())
      return alert('You can not edit this article.')

    const post = '[' + title + ']' + content

    const gas = await this.dexonBBSEdit.methods.edit(tx, post).estimateGas()
    try {
      await this.dexonBBSEdit.methods.edit(tx, post).send({ from: this.account, gas: gas })
      .on('confirmation', (confirmationNumber, receipt) => {
        window.location = '/'
      })
    }
    catch(err){
      alert(err)
    }
  }

  async getOriTx(shortLink){
    const hex = cacheNet.utils.padLeft(cacheNet.utils.toHex(shortLink), 64)
    const tx = await shortURLandMilestone.methods.links(hex).call()
    return tx
  }

  rewardAuthor(article, value) {
    if (!this.dexonWeb3) {
      alert('Please connect to your DEXON Wallet first.')
      return Promise.reject()
    }

    return this.dexonWeb3.eth.sendTransaction({
      from: this.account,
      to: article.author,
      value: Web3.utils.toWei(value),
    })
  }

  isDettTx(tx){
    return [BBSExtContract,
            BBSContract,
            '0x9b985Ef27464CF25561f0046352E03a09d2C2e0C']
            .map(x => x.toLowerCase())
            .includes(tx.toLowerCase())
  }
}

export default Dett