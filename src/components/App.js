import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import handleInitialData from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router , Route} from 'react-router-dom'
import NavBar from './NavBar'
import Root from './Root'
import Question from './Question'
import Home from './Home'
import Login from './Login'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import NotFound from './NotFound'

class App extends Component {
    componentDidMount(){
      this.props.dispatch(handleInitialData())
    }

    render(){
      return (
        <Router>
          <Fragment>
            <LoadingBar />
            <div>
              {this.props.loading === true ?
              null :
                <Fragment>
                  <NavBar/>
                  <div className='app'>
                    <Route exact path='/' component={Root}/>
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/question/:id' component={Question}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/add' component={NewQuestion}/>
                    <Route exact path='/leaderboard' component={LeaderBoard} />
                    <Route path='/404' component={NotFound} />
                  </div>
                </Fragment>}
            </div>
          </Fragment>
        </Router>
      );
    }
  }
  
  function  mapStateToProps({ authedUser }) {
    return {
      loading: authedUser === null
    }
}

export default connect(mapStateToProps)(App)
