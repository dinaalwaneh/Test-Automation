describe('SkillMatch Test', () => {


  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test

    //so here is our precondetion before each test case we make visir skill match url page
    //and login functionality work automaticly :
    cy.visit('https://skillsmatch.mdx.ac.uk/accounts/login/?next=/en/')
      
   //eleen
    
  })

 
  //This is our first test case to Verify search page with generating the correct result or not by adding valid search :
  it('Verify search page with generating the correct result or not by adding valid search', () => {
    
    //first we get href for search link in tap bar and we pass it's xpath to get function in cypress
    //then we visit search page py 'https://skillsmatch.mdx.ac.uk/'+href url.
      cy.get('div.navbar-collapse > ul > li:nth-child(3) > a')
          .invoke('attr', 'href')
          .then(href => {
              cy.visit('https://skillsmatch.mdx.ac.uk/'+href);
      });

      // we initailize an constant variable (SKIKK_KEY_WORD) and assign it's value with 'software'
      const SKIKK_KEY_WORD = 'software'
      //enter SKIKK_KEY_WORD > 'software' in tagify__input or search input :
      cy.get('[class=tagify__input]').type(`${SKIKK_KEY_WORD}`)
      //get search Button element and click on it:
      cy.get('[test-data=searchButton]').click()

     //first we get href for first search item at the result  
     //then we visit course pafe  py 'https://skillsmatch.mdx.ac.uk/'+href url.
      cy.get('[test-data=searchItem_1]>div>h4>a')
          .invoke('attr', 'href')
          .then(href => {
              cy.visit('https://skillsmatch.mdx.ac.uk/'+href);
      });   
      
      //initialize count variable to count the total match of 'software' at description section in course page :
      let count = 0
      

      //this function declared to call it after count the number of times that software skill key word has repeated 
      function CountWordInLiElement(count){
        
        //get the ninth div (description) child for div.container:
        //find li element in description :
        //then for each element get it's text and split it according to space :
        //From the previous process, we will get a list of words. We will pass over each word and check if it is includes('software')||('Software'):
        //if true we will increase the counter value by one .
        //.then{....}
        //After we have finished counting the number of times the word “software” is repeated in the explanation section,
        // we will return to the search page and display the search results again
        // and compare the value of "software" counter with totalmatches for the first search result.
        cy.get('.container>  div:nth-child(9) ')
        .find('li')      
        .each($p => {
          
            const words = $p.text().split(' ') 
            words.forEach(element => {
                if (element.includes('software')||element.includes('Software')){
                  count+=1;  
                }
            });

        }).then((value) => {

          cy.get('div.navbar-collapse > ul > li:nth-child(3) > a')
          .invoke('attr', 'href')
          .then(href => {
              cy.visit('https://skillsmatch.mdx.ac.uk/'+href);
          });
              const SKIKK_KEY_WORD = 'software'
              cy.get('[class=tagify__input]').type(`${SKIKK_KEY_WORD}`)
              cy.get('[test-data=searchButton]').click()
              cy.get('[test-data=TotalMatches]').first().should('have.text' , '\n            Total Matches :  '+count+'\n        ')
        }); 
      }
      
      //get the ninth div (description) child for div.container:
      //find p element in description :
      //then for each element get it's text and split it according to space :
      //From the previous process, we will get a list of words. We will pass over each word and check if it is includes('software')||('Software'):
      //if true we will increase the counter value by one .
      ////.then{....}
      //After we have finished counting the number of times the word “software” is repeated in the p's elements in the explanation section,
      // we will call CountWoedInLiElement(count) function and pass the count as arregument to it to complete the counting process in li's elements. 
      cy.get('.container>  div:nth-child(9) ')
          .find('P')     
          .each($p => {
            const words = $p.text().split(' ') 
            words.forEach(element => {
                
                if ( element.includes('software')||element.includes('Software') ){
                  count+=1;  
                }
                
            });
      
          }).then((value) => {
                
            CountWordInLiElement(count)
                
      });

  })


  //this function to achieve (DRY) consept ...
  function GetSearchPage(){

    //first we get href for search link in tap bar and we pass it's xpath to get function in cypress
    //then we visit search page py 'https://skillsmatch.mdx.ac.uk/'+href url.
    cy.get('div.navbar-collapse > ul > li:nth-child(3) > a')
    .invoke('attr', 'href')
    .then(href => {
        cy.visit('https://skillsmatch.mdx.ac.uk/'+href);
     });
     
    // we initailize an constant variable (SKIKK_KEY_WORD) and assign it's value with 'software'
    const SKIKK_KEY_WORD = 'software'
    //enter SKIKK_KEY_WORD > 'software' in tagify__input or search input and press enter :
    cy.get('[class=tagify__input]').type(`${SKIKK_KEY_WORD}`)
    //get AdvancedOptions Button element and click on it:
    cy.get('[test-data=AdvancedOptions]').click()
    //get the input of fourth child "Sort based on user reviews" for AdvancedOptions and click on it:
    cy.get('div.card-body > div:nth-child(4)>input').click();
    //get search Button element and click on it:
    cy.get('[test-data=searchButton]').click()

  }

  function CompairUserReview(starsCounter1){

      //initialize starsCounter2 variable to count the number of fill stars in the first course :
      let starsCounter2 = 0;

      //here we get the secound result "searchItem_2" from search result > UserFeedback and find 'label.fill' element and for each one 
      //we check if it's text include "☆" or not 
      // if true ? increase starsCounter2 value with one.
      //.then{.....}
      //After we have finished counting the number of times the fill "☆" is repeated in the label's elements in the course2,
      //we will compare the starsCounter2 is less than or equal to starsCounter1. 
      cy.get('[test-data=searchItem_2]>[test-data=UserFeedback]').find('label.fill')      
      .each($p => {
        
          if($p.text().includes("☆") ){
            starsCounter2+=1
          } 
         
      
      }).then(()=>{
         
          expect(starsCounter2).to.lte(starsCounter1)
           
        
      }) 
    
  }

  //This is our secound test case to Verify search page with generating the correct result or not by adding valid search :
  it('Verify search page With Sort result based on user reviews', () => {

    //first we get href for search link in tap bar and we pass it's xpath to get function in cypress
    //then we visit search page py 'https://skillsmatch.mdx.ac.uk/'+href url.
    GetSearchPage()
 /* 
    //here we get the href for the first result "searchItem_1" from search result and visit it by it's URL 'https://skillsmatch.mdx.ac.uk/'+href.
    cy.get('[test-data=searchItem_1]>div>h4>a')
        .invoke('attr', 'href')
        .then(href => {
            cy.visit('https://skillsmatch.mdx.ac.uk/'+href);
    });  
    
    //here we get the ratingme to make review for the course and we acsses to first child in label's of "☆" and click on it 
    //the result is reviewing the first course with one stare.
    cy.get('div.ratingme > label:nth-child(1)').click()
    GetSearchPage()
   
    //here we get the href for the secound result "searchItem_2" from search result and visit it by it's URL 'https://skillsmatch.mdx.ac.uk/'+href.
    cy.get('[test-data=searchItem_2]>div>h4>a')
        .invoke('attr', 'href')
        .then(href => {
            cy.visit('https://skillsmatch.mdx.ac.uk/'+href);
    });  
    //here we get the ratingme to make review for the course and we acsses to fifth child in label's of "☆" and click on it 
    //the result is reviewing the first course with five stare.    
    cy.get('div.ratingme > label:nth-child(5)').click()
 
    GetSearchPage()
*/
    //initialize starsCount variable to count the number of fill stars in the first course :
    let starsCount =0;

    //here we get the first result "searchItem_1" from search result > UserFeedback and find 'label.fill' element and for each one 
    //we check if it's text include "☆" or not 
    // if true ? increase starsCount value with one.
    //.then{.....}
    //After we have finished counting the number of times the fill "☆" is repeated in the label's elements in the course,
    // we will call CompairUserReview(starsCount) function and pass the count as arregument to it to comparing it with number of stares in the secound course. 
    cy.get('[test-data=searchItem_1]>[test-data=UserFeedback]').find('label.fill')      
    .each($p => {
      
        if($p.text().includes("☆") ){
          starsCount+=1
        } 
      

    }).then(()=>{
      CompairUserReview(starsCount)
    })

  })

//rahaf



//eleen

})

 
