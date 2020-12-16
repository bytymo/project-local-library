const totalBooksCount = books => books.reduce((bookTotal, book) => {
  // books.length
  
  // For every book in books, increase the bookTotal accumulator by 1, starting at 0
    if (book) bookTotal++
    return bookTotal
  }, 0)
  
  const totalAccountsCount = accounts => accounts.reduce((acctTotal, acct) => {
    // accounts.length
  
    // For every account in accounts, increase the acctTotal accumulator by 1, starting at 0
    if (acct) acctTotal++
    return acctTotal
  }, 0)
  
  function booksBorrowedCount(books) {
    // Create a counter variable
    let count = 0;
  
    for (let i = 0; i< books.length; i++) {
      // For every book in the array, filter through it's borrow array
      let borrow = books[i].borrows;
      for (let j = 0; j < borrow.length; j++){
        // For every returned status that is false (still being borrowed), increase the count var by 1
        let status = borrow[j].returned;
        if ( status === false){
        count++
        } 
      }
    }
    return count;
  }
   
  // Helper function for the next three functions to filter the resulting array to the top five entries
  const topFive = array => array.sort((a, b) => a.count < b.count ? 1 : -1).slice(0, 5)
  
  
  function mostCommonGenres(books) {
    // Create an array of book genres from the books array
    const genre = books.map(book => book.genre)
  
    // Create two container vars, an array to be sorted and a count object
    let topFiveArray = [], count = {};
  
    // Sort through each genre, and create an object with a tally of each book with this genre
    genre.forEach(function(i) { count[i] = (count[i] || 0) + 1})
    for (let key in count) {
      topFiveArray.push({
        name: key,
        count: count[key]
      })
    } 
    // Return the top five results
    return topFive(topFiveArray)
  }
  
  const mostPopularBooks = books => {
    // Create a container array to hold each book and count
    let topFiveArray = [] 
    for (let i=0;i<books.length; i++){ 
    // For each book, sort through the amount of times it was borrowed, and return an object with the title and number of times checked out, adding to the container array
      let novels = {} 
      // Create a novel key "name" and enter the title as it's value
      novels.name = books[i].title 
      // Create a novel key "count" and enter the counter as it's value
      novels.count = books[i].borrows.length 
      topFiveArray.push(novels)
    } 
    // Return the top five results
    return topFive(topFiveArray)
  }
  
  const mostPopularAuthors = (books, authors) => {
    // Create a container array to hold each book and count
    let topFiveArray = []
  
    // For each author, create an object with each key being the author's first and last name and the value being times their book(s) were borrowed 
    for (let i = 0; i < authors.length ; i++){
      let author = {}
      author.name = `${authors[i].name.first} ${authors[i].name.last}`
      author.count = 0
      // Cycle through each book and match the book's authorID to the author's id, increment the each time 
      for (let j = 0; j < books.length; j++){
        if (books[j].authorId === authors[i].id){
          author.count += books[j].borrows.length
        }
      }
      // Add every entry to the container array
      topFiveArray.push(author)
    }
    // Return the top five results
    return topFive(topFiveArray)
  }
  
  module.exports = {
    totalBooksCount,
    totalAccountsCount,
    booksBorrowedCount,
    mostCommonGenres,
    mostPopularBooks,
    mostPopularAuthors,
  }