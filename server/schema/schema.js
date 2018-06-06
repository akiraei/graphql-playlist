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


function consoling (a,b) {
    console.log('a',a,'b',b)
}


const bookType = new objType({
    name: 'book',
    fields: () => ({
    id: {type: idType},
    name: {type: strType},
    price: {type: intType},
    authorName: {type: strType},
    // author: {
    //     type : authorType,
    //     resolve(book, args){
    //         console.log(book)
    //         return modelAuthor.find(book.authorName)
    //     }
    // }
})
})


const authorType = new objType({
    name: 'author',
    fields: () => ({
        id: {type: idType},
        name: {type: strType},
        city: {type: strType},
        // books: {
        //     type: new listType(bookType),
        //     resolve (parent, args) {
        //         return book.find(parent => parent.authorName === args.name)
        //     }
        // }
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
                return modelBook.findById(args.id) // active
            }
        },
        author : {
            type: authorType,
            args: {
                name: {type: strType}
            },
            resolve(parent, args) {
                return modelAuthor.find({name: args.name}) // un-active
            }
        },
        books:{
            type: new listType(bookType),
            resolve(parent, args){
                return modelBook.find({}) // active
            }
        },
        authors:{
            type: new listType(authorType),
            resolve(parent, args) {
                return modelAuthor.find({}) //active
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
                authorName: {
                    type: strType
                }
            },
            resolve (parent, args) {
                let book = new modelBook({
                    name : args.name,
                    price: args.price,
                    authorName: args.authorName
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