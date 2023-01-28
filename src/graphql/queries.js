/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClient = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
      id
      name
      email
      image
      transactions {
        items {
          id
          category
          description
          price
          sellerReview
          sellerStars
          buyerReview
          buyerStars
          isConfirmed
          createdAt
          updatedAt
          clientTransactionsId
          sellerTransactionsId
        }
        nextToken
      }
      phone
      chats {
        items {
          id
          lastSenderId
          lastMessage
          createdAt
          updatedAt
          clientChatsId
          sellerChatsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listClients = /* GraphQL */ `
  query ListClients(
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        image
        transactions {
          nextToken
        }
        phone
        chats {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSeller = /* GraphQL */ `
  query GetSeller($id: ID!) {
    getSeller(id: $id) {
      id
      name
      email
      address
      phone
      image
      transactions {
        items {
          id
          category
          description
          price
          sellerReview
          sellerStars
          buyerReview
          buyerStars
          isConfirmed
          createdAt
          updatedAt
          clientTransactionsId
          sellerTransactionsId
        }
        nextToken
      }
      listings {
        items {
          id
          category
          description
          price
          buyerReview
          createdAt
          updatedAt
          sellerListingsId
          listingsSellerId
        }
        nextToken
      }
      chats {
        items {
          id
          lastSenderId
          lastMessage
          createdAt
          updatedAt
          clientChatsId
          sellerChatsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSellers = /* GraphQL */ `
  query ListSellers(
    $filter: ModelSellerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSellers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        address
        phone
        image
        transactions {
          nextToken
        }
        listings {
          nextToken
        }
        chats {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
      id
      category
      description
      price
      sellerReview
      sellerStars
      buyerReview
      buyerStars
      isConfirmed
      createdAt
      updatedAt
      clientTransactionsId
      sellerTransactionsId
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        category
        description
        price
        sellerReview
        sellerStars
        buyerReview
        buyerStars
        isConfirmed
        createdAt
        updatedAt
        clientTransactionsId
        sellerTransactionsId
      }
      nextToken
    }
  }
`;
export const getListings = /* GraphQL */ `
  query GetListings($id: ID!) {
    getListings(id: $id) {
      id
      category
      description
      price
      seller {
        id
        name
        email
        address
        phone
        image
        transactions {
          nextToken
        }
        listings {
          nextToken
        }
        chats {
          nextToken
        }
        createdAt
        updatedAt
      }
      buyerReview
      createdAt
      updatedAt
      sellerListingsId
      listingsSellerId
    }
  }
`;
export const listListings = /* GraphQL */ `
  query ListListings(
    $filter: ModelListingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listListings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        category
        description
        price
        seller {
          id
          name
          email
          address
          phone
          image
          createdAt
          updatedAt
        }
        buyerReview
        createdAt
        updatedAt
        sellerListingsId
        listingsSellerId
      }
      nextToken
    }
  }
`;
export const getChats = /* GraphQL */ `
  query GetChats($id: ID!) {
    getChats(id: $id) {
      id
      lastSenderId
      lastMessage
      messages {
        items {
          id
          senderId
          message
          createdAt
          updatedAt
          chatsMessagesId
        }
        nextToken
      }
      client {
        id
        name
        email
        image
        transactions {
          nextToken
        }
        phone
        chats {
          nextToken
        }
        createdAt
        updatedAt
      }
      seller {
        id
        name
        email
        address
        phone
        image
        transactions {
          nextToken
        }
        listings {
          nextToken
        }
        chats {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      clientChatsId
      sellerChatsId
    }
  }
`;
export const listChats = /* GraphQL */ `
  query ListChats(
    $filter: ModelChatsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        lastSenderId
        lastMessage
        messages {
          nextToken
        }
        client {
          id
          name
          email
          image
          phone
          createdAt
          updatedAt
        }
        seller {
          id
          name
          email
          address
          phone
          image
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        clientChatsId
        sellerChatsId
      }
      nextToken
    }
  }
`;
export const getMessages = /* GraphQL */ `
  query GetMessages($id: ID!) {
    getMessages(id: $id) {
      id
      senderId
      message
      createdAt
      updatedAt
      chatsMessagesId
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessagesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        senderId
        message
        createdAt
        updatedAt
        chatsMessagesId
      }
      nextToken
    }
  }
`;
