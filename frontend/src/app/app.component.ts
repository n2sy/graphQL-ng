import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_QUOTES = gql`
  {
    quotes {
      allQuotes {
        _id
        text
        author
      }
    }
  }
`;

const CREATE_QUOTE = gql`
  mutation createQuote($text: String!, $author : String!) {
    createQuote(quoteInput : { text : $text, author : $author}) {
      _id
      text
      author
    }
  }
`

const DELETE_QUOTE = gql`
  mutation deleteQuote($id: ID!) {
    deleteQuote(id : $id) {
      _id
      text
      author
    }
  }
`

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  quotes : Observable<any>;

  constructor(private apollo : Apollo) {}

  ngOnInit(): void {
    this.quotes = this.apollo.watchQuery({
      query : GET_QUOTES
    }).valueChanges.pipe(
      map((result : any) => {
        console.log(result.data.quotes.allQuotes);
        return result.data.quotes.allQuotes;
        
      })
    )
  }
  

  createQuote(q : string, a : string) {
    this.apollo.mutate({
      mutation : CREATE_QUOTE,
      refetchQueries : [{ query : GET_QUOTES }],
      variables : {
        text : q,
        author : a
      }
    }).subscribe(() => {
      console.log("Quote created !");   
    })

  }

  deleteQuote(quoteid) {
    this.apollo.mutate({
      mutation : DELETE_QUOTE,
      refetchQueries : [{query : GET_QUOTES}],
      variables : {
        id : quoteid
      }
    }).subscribe(() => {
      console.log("Quote deleted !");
      
    })

  }
}
