import React ,{Fragment,useEffect} from 'react';
import { Route,useParams,Link } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

const QuotesDetail = () => {
    const{sendRequest,status,data:loadedQuote,error} = useHttp(getSingleQuote,true);
    const params = useParams();
    const{ quoteId } = params;

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest,quoteId]);

    if(status === 'pending'){
        return <div className='centered'><LoadingSpinner/>
        </div>
    }

    if(error){
        return <div className='centered focused'>{error}</div>
    }

    if(!loadedQuote.text){
        return <NoQuotesFound/>
    }
    return (    
        <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Route path={`/quotes/${params.quoteId}`} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`/quotes/${params.quoteId}/comments`}>
                        Load Comments
                    </Link>
                </div>
            </Route>
            <Route path={`/quotes/${params.quoteId}/comments`}>
                <Comments/>
            </Route>
        </Fragment>
    )
}

export default QuotesDetail
