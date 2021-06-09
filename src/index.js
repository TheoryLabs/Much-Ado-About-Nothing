import axios from 'axios'



const _userReposListFormatHandler = async (ghRawResData = { data: [] }) => {
  let _ghResData

  let _list

  try {
   _ghResData = await ghRawResData.data

   _list = await _ghResData
           .map(repo => {
             return {
               name: repo.name,
               url: repo.html_url,
               description: repo.description,
               stars: repo.stargazers_count
             }
           })
           .sort((first, second) => second.stars - first.stars)

   return _list
  }
  catch(err) {
    console.error(err)
    throw err
  }
}

const userGithubDataFetcher = async ({ name, page, per_page }) => {

  let _url
  let _ghData

  try {
    _url = await `https://api.github.com/users/${name}/repos?page=${page}&per_page=${per_page}&sort=updated`
    _ghData = await axios.get(_url)

    return {
      ghRawResponseData: async () => await _ghData.data,
      listRepos: async () => await _userReposListFormatHandler(_ghData)
    }
  }
  catch(err) {
    console.error(err)
    throw err
  }
}


const listUserGithubRepos = async (usr = `DaneTheory`, opts = {
  page: 1,
  per_page: 30
}) => {
  let _usrRef
  let _optsRef

  let props
  let _userRepos

  let results

  try {
    _usrRef = await new String(usr)
    _optsRef = await { ...opts }

    props = {
      name: _usrRef,
        ..._optsRef
    }

   _userRepos = await userGithubDataFetcher({ ...props })
                        .then((repositories) => {
                          return repositories
                        })
                        .catch(err => {
                          console.error(err)
                          return err
                        })

   results = await _userRepos

    if(results instanceof Error) {
      throw results
    }

    return results
  }
  catch(err) {
    console.error(err)
    throw err
  }
}


// class GithubInfo {
//   constructor(searchTopic) {
//     this._rawSearchTopic_ = searchTopic
//
//     this.searchTopic = null
//     this.isScoped = null
//
//     // this.reqCtx = {
//     //   apiBase: ghApiBaseUrl,
//     //   queryParams: { ...ghApiQueryParams }
//     // }
//
//     this.reqCtx = {
//       apiBase: `https://api.github.com`,
//       queryParams: {
//         page: 1,
//         per_page: 30
//       }
//     }
//
//     this.state = {
//       topic: null,
//       endpoint: null
//     }
//
//     // this.get()
//   }
//
//   // static ghApiBaseUrl = `https://api.github.com`
//   static ghApiQueryParams = {
//     page: 1,
//     per_page: 30
//   }
//   static searchTopic = ``
//
//   static searchFilter(queryData) {
//     if(typeof queryData !== `string`) {
//       throw Error(`Expected typeof "string" be given as argument value. Recieved: ${usrOrOrg}`)
//     }
//
//     return {
//       isScoped: queryData.charAt(0) === `@` ? true : false,
//       raw: queryData,
//       formatted: queryData.toLowerCase()
//     }
//   }
//
//   static staticProp = `I am a static property!`
//   static ghApiBaseUrl = `https://api.github.com`
//   static staticMethod() {
//     return 'static method has been called.'
//   }
//
//
//
//
//   getState() {
//     let stateRef = this.state
//     return stateRef
//   }
//
//   setState(newState) {
//     let currState = this.getState()
//     let prevState = Object.freeze(currState)
//
//     let _state = {}
//
//     if(newState.topic !== prevState.topic) {
//       _state.topic = newState.topic
//     }
//
//     if(newState.endpoint !== prevState.endpoint) {
//       _state.endpoint = newState.endpoint
//     }
//
//     return this.state = Object.assign(prevState, {..._state})
//   }
//
//   normalizeTopicHandler(_topic) {
//     let normalizedTopic = null
//
//     if(normalizedTopic === null) {
//       if(typeof _topic !== `string`) {
//         throw Error(`Expects search topic be a valid string. Recieved: ${_topic}`)
//       }
//
//       if(_topic.charAt(0) === `@`) {
//         throw Error(`Expects search topic be a valid User. Scoped topics (i.e. valuez prefixed with "@") are not supported. Recieved: ${_topic}`)
//       }
//
//       normalizedTopic = _topic.toLowerCase()
//     }
//
//     this.setState({ topic: normalizedTopic })
//   }
//
//
//   normalizeEndpointHandler({ apiBase, queryParams }) {
//     let currState = this.getState()
//
//     if(currState.topic === null || typeof currState.topic !== `string`) {
//       let topicRef = this._rawSearchTopic_
//       this.normalizeTopicHandler(topicRef)
//     }
//
//     let _apiEndpointPartials = {
//       basePath: apiBase,
//       userRoute: `users/${currState.topic}`,
//       reposRoute: `repos?page=${queryParams.page}&per_page=${queryParams.per_page}&sort=updated`
//     }
//
//     let _resolvedEndpoint = `${_apiEndpointPartials.basePath}/${_apiEndpointPartials.userPath}/${_apiEndpointPartials.reposPath}`
//
//     this.setState({ endpoint: _resolvedEndpoint })
//   }
//
//   resolveEndpointHandler({ topic, endpoint }) {
//     let currState = { topic, endpoint }
//     console.log(currState)
//     // if(typeof currState !== `object`) {
//     //   throw Error(`Expects "state" to be object as defined in constructor. Recieved: ${currState}`)
//     // }
//     //
//     // if(currState.topic === null) {
//     //   let topicRef = this._rawSearchTopic_
//     //   this.normalizeTopicHandler(topicRef)
//     // }
//     //
//     // if(currState.endpoint === null) {
//     //   let ctxRef = this.reqCtx
//     //   this.normalizeEndpointHandler(ctxRef)
//     // }
//     //
//     // if(typeof currState.topic !== `string` && typeof currState.endpoint !== `string`) {
//     //   throw Error(`Expects search topic and endpoint be resolved as valid string values. Recieved: ${currState}`)
//     // }
//   return currState
//   }
//
//   getter () {
//     console.log('GETTTER')
//     let currState = this.getState()
//
//     if(currState.endpoint === null) {
//       // console.log(currState)
//       this.resolveEndpointHandler(currState)
//       return this.getState()
//     }
//   }
//
//   set() {
//     console.log('SETTTER')
//     // let currState = this.getState()
//     //
//     // if(currState.endpoint === null) {
//     //   this.resolveEndpointHandler()
//     // }
//   }
// }

//const me = new GithubInfo(`DaneTheory`)
//const me = new GithubInfo(`DaneTheory`)
// console.log(new GithubInfo('@DaneTheory'))
//console.log(me.get)
//console.log(GithubInfo.staticProp)
// console.log(me.ghApiBaseUrl)
//


// listUserGithubRepos().then(data => {
//   return data.listRepos().then(_l => {
//     console.log(_l)
//     return _l
//   })
//   .catch(err => {
//     console.error(err)
//     return err
//   })
// })
// .catch(err => {
//   console.error(err)
//   return err
// })

//console.log(myGithubData)



class GithubInfo {

  list: listUserGithubRepos
}


// const getRepos = async ({
//   username = 'myogeshchavan97',
//   page = 1,
//   per_page = 30
// } = {}) => {
//   try {
//     const repos = await axios.get(
//       `https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}&sort=updated`
//     );
//     return repos.data
//       .map((repo) => {
//         return {
//           name: repo.name,
//           url: repo.html_url,
//           description: repo.description,
//           stars: repo.stargazers_count
//         };
//       })
//       .sort((first, second) => second.stars - first.stars);
//   } catch (error) {
//     return [];
//   }
// };

// getRepos().then((repositories) => console.log(repositories));


export default GithubInfo
