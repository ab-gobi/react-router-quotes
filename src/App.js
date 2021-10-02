import React, { Suspense } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
// import Quotes from './pages/Quotes';
// import QuotesDetail from './pages/QuotesDetail';
// import NewQuotes from './pages/NewQuotes';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
// import PageNotFound from './pages/PageNotFound';

const NewQuotes = React.lazy(() => import('./pages/NewQuotes'));
const Quotes = React.lazy(()=>import('./pages/Quotes'));
const QuotesDetail = React.lazy(()=>import('./pages/QuotesDetail'));
const PageNotFound = React.lazy(()=>import('./pages/PageNotFound'));

function App() {
  return (
    <div>
      <Suspense fallback={
        <div className='centered'>
          <LoadingSpinner/>
        </div>
      }>
      <Layout>
        <Switch>
            <Route path='/' exact>
              <Redirect to='/quotes'/>
            </Route>
            <Route path='/quotes' exact>
              <Quotes/>
            </Route>
            <Route path='/quotes/:quoteId'>
              <QuotesDetail/> 
            </Route>
            <Route path='/new-quotes'>
              <NewQuotes/>
            </Route>
            <Route path='*'>
              <PageNotFound/>
            </Route>
        </Switch>
      </Layout>
      </Suspense>
    </div>
  );
}

export default App;
