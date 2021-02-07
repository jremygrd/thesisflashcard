import React, { Children, Component } from 'react'
import axios from 'axios'

// import './App.css';
import Gallery from './Components/Gallery/Gallery'
import SearchBar from './Components/SearchBar';

class Unsplash extends Component {
  constructor(props) {
  const{deckData,handleClose} = props   
    super(props)
    // console.log("eodddeded",props.children)
    this.state = {
        id:props.children[1],
        close:props.children[3],
        update:props.children[5],
        changeDeckimage:props.children[6],
      gallery: [],
      currentQuery: '',
      searchedQuery: '',
      page: 1,
      selectedImage: {
        description: '',
        src: '',
        username: '',
        page: '',
      },
    }
  }
  
  ROOT = `https://api.unsplash.com/`
  KEY ="?client_id=Ec1n2AKEb00jiprb4C_6LFncc57yZHxst8TYXNPvp7s"
  PERPAGE = `&per_page=30`

  fetchInitialImages = () => {
    this.setState({ searchedQuery: 'Education'})
    axios.get(`${this.ROOT}photos${this.KEY}${this.PERPAGE}&page=1`)
      .then(res => {
        let results = res.data
        // console.log('results = ', results)
        this.setState(() => {
          return { gallery: [...results] }
        })
      })
      .catch(error => console.log(error))
  }
  
  launchModal = (index) => {
    this.setState((prevState) => {
    // console.log(prevState.gallery[index].urls.regular)

    this.state.update(prevState.gallery[index].urls.regular)
    this.setImage(prevState.gallery[index].urls.regular)
      return { 
        selectedImage: {
          description: prevState.gallery[index].description,
          src: prevState.gallery[index].urls.regular,
          username: prevState.gallery[index].user.username,
          page: prevState.gallery[index].user.links.html,
        }
        
      }
    })

    this.state.close()
    
  }
  setImage= async (url) =>{

    if(this.changeDeckimage)
    {

   
    const opts = { fk_deck: this.state.id, fk_user: '1w7K30BqJFTR6rJLKdAP9aasoKM2',imageUrl:url};

    const authorjson = await fetch(
      `http://localhost:3000/api/decks/setUnsplash`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opts),
      }
    );
  }
   
  }

  loadMore = () => {
    this.setState((prevState) => {
      return {page: prevState.page + 1}
    }, () => {
      axios.get(`${this.ROOT}search/photos${this.KEY}&query=${this.state.searchedQuery}${this.PERPAGE}&page=${this.state.page}`)
        .then(res => {
          let results = res.data.results
          // console.log('results = ', results)
          this.setState((prevState) => {
            return { gallery: [...prevState.gallery, ...results] }
          })
        })
        .catch(error => console.log(error))
    })
  }

  componentDidMount() {
    this.fetchInitialImages()
  }

  handleChange = (e) => {
    this.setState({
      currentQuery: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    // console.log('currentQuery: ', this.state.currentQuery)
    this.setState((prevState) => {
      return {searchedQuery: prevState.currentQuery}
    })
    axios.get(`${this.ROOT}search/photos${this.KEY}&query=${this.state.currentQuery}${this.PERPAGE}`)
      .then(res => {
        let results = res.data.results
        this.setState({
          gallery: [...results],
          currentQuery: '',
        })
      })
      .catch(error => console.log(error))
  }


  render() {
    return (
      <div className="App">
      <SearchBar fetchInitialImages={this.fetchInitialImages} handleChange={this.handleChange} handleSubmit={this.handleSubmit} currentQuery={this.state.currentQuery} />
        <div className="container">
          <h1 className="text-center">{this.state.searchedQuery}</h1>
          <Gallery gallery={this.state.gallery} loadMore={this.loadMore} launchModal={this.launchModal} selectedImage={this.state.selectedImage} searchedQuery={this.state.searchedQuery} />
        </div>
      </div>
    );
  }
}

export default Unsplash