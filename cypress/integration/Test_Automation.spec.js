describe('SkillMatch Test', () => {


  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test

    //so here is our precondetion before each test case we make visir skill match url page
    //and login functionality work automaticly :
    cy.visit('https://skillsmatch.mdx.ac.uk/accounts/login/?next=/en/')
      
    const userName = 'blabla'
    const passWord = '123123'
    //enter userName > 'blabla' in username input :
    cy.get('[id=username]').type(userName)

    //enter passWord > '123123' in passWord input :
    cy.get('[id=password]').type(passWord)
    //get login button element and click on it:
    cy.get('[value=Login]').click()

 
    
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

   //TS2 ---> TC2
      //This is our secound test case to Verify search page With cource contains all of the keywords :
      it('Verify search page With cource contains all of the keywords .', () => {

        //first we get href for search link in tap bar and we pass it's xpath to get function in cypress
        //then we visit search page py 'https://skillsmatch.mdx.ac.uk/'+href url.  
        cy.get('div.navbar-collapse > ul > li:nth-child(3) > a')
            .invoke('attr', 'href')
            .then(href => {
                cy.visit('https://skillsmatch.mdx.ac.uk/'+href);
        });
    
        // we initailize an constant variable (SKIKK_KEY_WORD) and assign it's value with 'software'
        const SKIKK_KEY_WORD = 'software'
        // we initailize an constant variable (SKIKK_KEY_WORD2) and assign it's value with 'java'
        const SKIKK_KEY_WORD2 = 'java'
        //enter SKIKK_KEY_WORD > 'software' in tagify__input or search input and press enter :
        cy.get('[class=tagify__input]').type(`${SKIKK_KEY_WORD}`).type('{enter}');
        //enter SKIKK_KEY_WORD2 > 'java' in tagify__input or search input and press enter :
        cy.get('[class=tagify__input]').type(`${SKIKK_KEY_WORD2}`).type('{enter}');
        //get AdvancedOptions Button element and click on it:
        cy.get('[test-data=AdvancedOptions]').click()
        //get the input of first child "With all of the keywords" for AdvancedOptions and click on it:
        cy.get('div.card-body > div:nth-child(1)>input').click();
        //get search Button element and click on it:
        cy.get('[test-data=searchButton]').click()
        //we initailize an variable (MatchedKeywordIndex) with initial value -1 : to using it to acsses to the MatchedKeywords .
        let MatchedKeywordIndex = -1;
        //get search-result-box element witch have all search results :
        //for each div in search-result-box we will get search-item  elements and pass on each span element on it
        //then check if MatchedKeywords(MatchedKeywordIndex) hahve software or java key words respectively.
        cy.get('.search-result-box')    
            .each($div => {
                    cy.get('.search-item')    
                    .each($span => {
                      MatchedKeywordIndex+=1;
                      cy.get('[test-data=MatchedKeywords]').eq(MatchedKeywordIndex).should('have.text' , '\n            software\n        ')
                      MatchedKeywordIndex+=1;
                      cy.get('[test-data=MatchedKeywords]').eq(MatchedKeywordIndex).should('have.text' , '\n            java\n        ')
                      
                    })
            })
      })
    

     //TS2 ---> TC5
      //This is our Fifth test case to Verify search page With Translate arabic word input to English :
      it('Verify search page with Translate arabic word input to English .', () => {
        //first we get href for search link in tap bar and we pass it's xpath to get function in cypress
        //then we visit search page py 'https://skillsmatch.mdx.ac.uk/'+href url.  
        cy.get('div.navbar-collapse > ul > li:nth-child(3) > a')
            .invoke('attr', 'href')
            .then(href => {
                cy.visit('https://skillsmatch.mdx.ac.uk/'+href);
        });
    
        // we initailize an constant variable (SKIKK_KEY_WORD) and assign it's value with 'تصنيفات'
        const SKIKK_KEY_WORD = 'تصنيفات'
        //enter SKIKK_KEY_WORD > 'تصنيفات' in tagify__input or search input and press enter :
        cy.get('[class=tagify__input]').type(`${SKIKK_KEY_WORD}`).type('{enter}');
        //get AdvancedOptions Button element and click on it:
        cy.get('[test-data=AdvancedOptions]').click()
        //get translateInput element and select English from it :
        cy.get('[test-data=translateInput]').select("English")
        //get search Button element and click on it:
        cy.get('[test-data=searchButton]').click()
        //we initailize an variable (MatchedKeywordIndex) with initial value -1 : to using it to acsses to the MatchedKeywords .
        let MatchedKeywordIndex =-1;
        //get search-result-box element witch have all search results :
        //for each div in search-result-box we will get search-item  elements and pass on each span element on it
        //then check if MatchedKeywords(MatchedKeywordIndex) have ratings(Translate "التصنيفات" in English) or not.
        cy.get('.search-result-box')    
            .each($div => {
                    cy.get('[class=search-item]')    
                    .each($span => {
                        MatchedKeywordIndex+=1;
                        cy.get('[test-data=MatchedKeywords]').eq(MatchedKeywordIndex).should('have.text' , '\n            ratings\n        ')
    
                    })
            })
      })
    
  



    it('Verify updating my skills page and profile', ()=>{
          //this code is for test case of updating my skills feature -happy senario-.
          //first we fisit the link of profile page.
            cy.visit('https://skillsmatch.mdx.ac.uk/en/profile/')
          
          //click these btns to go to the update my skills section to start the test.
          //here we get the elements by 'test-data' feature, and click the btns by the click() method.
            cy.get('[test-data=UpdateMySkills]').click()
            cy.get('[test-data=StartUpdatingMySkills]').click()
          
          //start input data by select one choice of each question.
        
          //first question about level of competence, here we choose the choice with id=3 and here answers are without values.
            cy.get('[id=3]').check().should('be.checked')
          //then we click btn to go to next section -area1-.
            cy.get('[test-data=NextStep]').click()


          //set values of 3 to all answers of area1 section.
            cy.get('[id=12]').check().should('be.checked')
            cy.get('[id=17]').check().should('be.checked')
            cy.get('[id=22]').check().should('be.checked')
            cy.get('[id=27]').check().should('be.checked')
        
        //the total score of area1 should be 12/16
            let score_1= "(12/16)"
        //the star score should be 4 out of 5, which is approximated from 3.75
            let stars_1= Math.ceil(5*12/16)
        //click next btn to go to area 2, because the cy.get('.next') return list of elements which have class next we use eq(index) to get the right element.
            cy.get('.next').eq(1).click()

        //the code will be duplicated himself because it is the same processes from here:
        
        //area 2
            cy.get('[id=32]').check().should('be.checked')
            cy.get('[id=37]').check().should('be.checked')
            cy.get('[id=42]').check().should('be.checked')
            let score_2= "(9/12)"
            let stars_2= Math.ceil(5*9/12)
            cy.get('.next').eq(2).click()

        //area 3
            cy.get('[id=47]').check().should('be.checked')
            cy.get('[id=52]').check().should('be.checked')
            cy.get('[id=57]').check().should('be.checked')
            cy.get('[id=62]').check().should('be.checked')
            let score_3= "(12/16)"
            let stars_3= Math.ceil(5*12/16)
            cy.get('.next').eq(3).click()
                  
        //area 4
            cy.get('[id=67]').check().should('be.checked')
            cy.get('[id=72]').check().should('be.checked')
            cy.get('[id=77]').check().should('be.checked')
            let score_4= "(9/12)"
            let stars_4= Math.ceil(5*9/12)
            cy.get('.next').eq(4).click()
        
        //area 5
                  
            cy.get('[id=82]').check().should('be.checked')
            cy.get('[id=87]').check().should('be.checked')
            cy.get('[id=92]').check().should('be.checked')
            let score_5= "(9/12)"
            let stars_5= Math.ceil(5*9/12)
            cy.get('.next').eq(5).click()
        
        //area 6

            cy.get('[id=97]').check().should('be.checked')
            cy.get('[id=102]').check().should('be.checked')
            cy.get('[id=107]').check().should('be.checked')
            cy.get('[id=112]').check().should('be.checked')
            cy.get('[id=117]').check().should('be.checked')
            let score_6= "(15/20)"
            let stars_6= Math.ceil(5*15/20)
            cy.get('.next').eq(6).click()
        //to here
          
        //here the final step of inserting data (choosing answers), which is without values.
           cy.get('[id=120]').check().should('be.checked')
           cy.get('[id=122]').check().should('be.checked')
           cy.get('[id=131]').check().should('be.checked')
           cy.get('.next').eq(7).click()
      
        
          
        //function to get throw spaces and other unneeded from string wich represent the score of area in profile page.
          function formatString(text) {
              return text.replace('kr', '').replace('\u00A0','').trim();
          }
        
       //here we test the value of scores of each area of the score shown in profile page of the area.
        
          cy.get('[test-data=area_1_Scor]').invoke("text").then(formatString).should("eq", score_1)   //area 1
          cy.get('[test-data=area_2_Scor]').invoke("text").then(formatString).should("eq", score_2)   //area 2
          cy.get('[test-data=area_3_Scor]').invoke("text").then(formatString).should("eq", score_3)   //area 3
          cy.get('[test-data=area_4_Scor]').invoke("text").then(formatString).should("eq", score_4)   //area 4
          cy.get('[test-data=area_5_Scor]').invoke("text").then(formatString).should("eq", score_5)   //area 5
          cy.get('[test-data=area_6_Scor]').invoke("text").then(formatString).should("eq", score_6)   //area 6
          
          
        //here we test the stars number of each area to what should be.
          cy.get('[test-data=area_1_myscore]>[test-data=filledStar]').its('length').should('eq', stars_1)  //area 1
          cy.get('[test-data=area_2_myscore]>[test-data=filledStar]').its('length').should('eq', stars_2)  //area 2
          cy.get('[test-data=area_3_myscore]>[test-data=filledStar]').its('length').should('eq', stars_3)  //area 3
          cy.get('[test-data=area_4_myscore]>[test-data=filledStar]').its('length').should('eq', stars_4)  //area 4
          cy.get('[test-data=area_5_myscore]>[test-data=filledStar]').its('length').should('eq', stars_5)  //area 5
          cy.get('[test-data=area_6_myscore]>[test-data=filledStar]').its('length').should('eq', stars_6)  //area 6
        
        //test case finished.

      })


})

 
