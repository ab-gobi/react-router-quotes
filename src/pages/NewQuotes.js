import React,{useEffect} from 'react';
import QuoteForm from '../components/quotes/QuoteForm'
import { useHistory } from 'react-router';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const NewQuotes = () => {
    const {sendRequest,status} = useHttp(addQuote);
    const history = useHistory();

    useEffect(()=>{
        if(status=== 'completed'){
            history.push('/quotes');
        }
    },[status,history]);

    if(status==='pending'){
        <div className='centered'>
            <LoadingSpinner/>
        </div>
    }
    
    const onAddQuoteHandler = quoteData => {
        console.log('http call');
            sendRequest(quoteData);
    }       
    return (
        <div>
            <h1>New Quotes</h1>
            <QuoteForm isLoading = {status==='pending'} onAddQuote={onAddQuoteHandler}/>
        </div>
    )
}

export default NewQuotes
