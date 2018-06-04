const graphql = require('graphql')
const modelBook = require('../models/book.js');
const modelAuthor = require('../models/author.js');


const objType = graphql.GraphQLObjectType
const strType = graphql.GraphQLString
const intType = graphql.GraphQLInt
const listType = graphql.GraphQLList
const nonNullType = graphql.GraphQLNonNull
const schema = graphql.GraphQLSchema
const idType = graphql.GraphQLID

// let {a, b, c} = {a:1, b:2, c:3}
// console.log(a,b,c,c,c,c)
// => 1,2,3,3,3,3

//------------- hardcoded data--------------

const books = [
    { id: '1', name: 'harry', price: 2, authorId:'1'},
    { id: '2', name: 'ring', price: 3, authorId:'2'},
    { id: '3', name: 'nania', price: 4, authorId:'3'}
]

const authors = [
    { id: '1', name: 'joan', city: 'Yate'},
    { id: '2', name: 'tolkin', city: 'Bournemouth'},
    { id: '3', name: 'lewis', city: 'oxford'}
]

//------------- hardcoded data--------------

const bookType = new objType({
    name: 'book',
    fields: () => ({
    id: {type: idType},
    name: {type: strType},
    price: {type: intType},
    authorId: {type: idType},
    author: {
        type : authorType,
        resolve(parent, args){
            // return authors.filter( e => {
            //     return e.id === parent.authorId
            // })[0]
            }
        }
    })
})



const authorType = new objType({
    name: 'author',
    fields: () => ({
    id: {type: idType},
    name: {type: strType},
    city: {type: strType},
    books: {
        type: new listType(bookType),
        resolve (parent, args) {
            // return books.filter( e => e.authorId === parent.id)
        }
    }
    })
})



const rootQuery = new objType ({
    name: 'rootQueryType',
    fields: {
        book : {
            type: bookType,
            args: {
                id: {type: idType}
            },
            resolve(parent, args) {
                // for(let i = 0; i < books.length; i++) {
                //     if(books[i].id === args.id){
                //         return books[i]
                //     }
                // }
                return modelBook.findById(args.id)
            }
        },
        author : {
            type: authorType,
            args: {
                id: {type: idType}
            },
            resolve(parent, args) {
                //  for(let i = 0; i < authors.length; i++) {
                //     if(authors[i].id === args.id){
                //         return authors[i]
                //     }
                // }
                return modelAuthor.findByid(args.id)
            }
        },
        books:{
            type: new listType(bookType),
            resolve(parent, args){
                // return books
                return modelBook.find({})
            }
        },
        authors:{
            type: new listType(authorType),
            resolve(parent, args) {
                // return authors
                return modelAuthor.find({})
            }
        }
    }
})


const mutation = new objType({
    name: 'mutation',
    fields: {
        addAuthor: {
            type: authorType,
            args: {
                name: { 
                    type: strType 
                },
                city: { 
                    type: strType 
                }
            },
            resolve(parent, args){
                let author = new modelAuthor({ // from model author.js
                    name: args.name,
                    city: args.city
                });
                let k = author.save();
                // console.log(k)
                return k
            }
        },
        addBook: {
            type: bookType,
            args: {
                name : {
                    type: strType
                },
                price: {
                    type: intType
                },
                authorId: {
                    type: idType
                }
            },
            resolve (parent, args) {
                let book = new modelBook({
                    name : args.name,
                    price: args.price,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
});


module.exports = new schema({
    query: rootQuery,
    mutation: mutation
})