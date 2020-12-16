// Find the account object based on the entered id#
const findAccountById = (accounts, id) => accounts.find(account => account.id === id)

const sortAccountsByLastName = (accounts) => 
// Sort through each account, and order by last name
accounts.sort((lastNameA, lastNameB) => {
  return lastNameA.name.last > lastNameB.name.last ? 1 : -1
})

const numberOfBorrows = (account, books) => {
  // Create a variable that goes through each book...
  let result = books.reduce((borrowCount, book) => {
    // ...and filters through the book's borrowed array, returning the total matches to each occurance a specific account has borrowed a book
    book.borrows.filter(bookID => {if(bookID.id === account.id) borrowCount+= 1 })
    return borrowCount
  }, 0)
  // Return the results
  return result
}  

const getBooksPossessedByAccount = (account, books, authors) => {
  // Create a container array
  let possessedBooks = []

  // For every book, destructure the contents' id, title, genre, and borrows keys
  for(let i = 0; i < books.length; i++) {
    let book = books[i]
    const {id, title, genre, borrows} = book
    // Go through the borrows array for every book, and find the books still borrowed by the specified account
    for(let j = 0; j < borrows.length; j++) {
      if (borrows[j].id === account.id && borrows[j].returned === false) {
        // For every book currently possessed, go through each author and return the book's information, return the results to the container array
        for(let k = 0; k < authors.length; k++) {
          let author = authors[k]
          if(author.id === book.authorId){
            let tempBook = {id, title, genre, author, borrows}
            possessedBooks.push(tempBook)
          }
        }
      }
    }
  }
  // return the results 
  return possessedBooks
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};