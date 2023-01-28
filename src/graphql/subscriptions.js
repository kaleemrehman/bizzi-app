/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient($filter: ModelSubscriptionClientFilterInput) {
    onCreateClient(filter: $filter) {
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
export const onUpdateClient = /* GraphQL */ `
  subscription OnUpdateClient($filter: ModelSubscriptionClientFilterInput) {
    onUpdateClient(filter: $filter) {
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
export const onDeleteClient = /* GraphQL */ `
  subscription OnDeleteClient($filter: ModelSubscriptionClientFilterInput) {
    onDeleteClient(filter: $filter) {
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
export const onCreateSeller = /* GraphQL */ `
  subscription OnCreateSeller($filter: ModelSubscriptionSellerFilterInput) {
    onCreateSeller(filter: $filter) {
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
export const onUpdateSeller = /* GraphQL */ `
  subscription OnUpdateSeller($filter: ModelSubscriptionSellerFilterInput) {
    onUpdateSeller(filter: $filter) {
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
export const onDeleteSeller = /* GraphQL */ `
  subscription OnDeleteSeller($filter: ModelSubscriptionSellerFilterInput) {
    onDeleteSeller(filter: $filter) {
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
export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onCreateTransaction(filter: $filter) {
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
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onUpdateTransaction(filter: $filter) {
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
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onDeleteTransaction(filter: $filter) {
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
export const onCreateListings = /* GraphQL */ `
  subscription OnCreateListings($filter: ModelSubscriptionListingsFilterInput) {
    onCreateListings(filter: $filter) {
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
export const onUpdateListings = /* GraphQL */ `
  subscription OnUpdateListings($filter: ModelSubscriptionListingsFilterInput) {
    onUpdateListings(filter: $filter) {
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
export const onDeleteListings = /* GraphQL */ `
  subscription OnDeleteListings($filter: ModelSubscriptionListingsFilterInput) {
    onDeleteListings(filter: $filter) {
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
export const onCreateChats = /* GraphQL */ `
  subscription OnCreateChats($filter: ModelSubscriptionChatsFilterInput) {
    onCreateChats(filter: $filter) {
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
export const onUpdateChats = /* GraphQL */ `
  subscription OnUpdateChats($filter: ModelSubscriptionChatsFilterInput) {
    onUpdateChats(filter: $filter) {
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
export const onDeleteChats = /* GraphQL */ `
  subscription OnDeleteChats($filter: ModelSubscriptionChatsFilterInput) {
    onDeleteChats(filter: $filter) {
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
export const onCreateMessages = /* GraphQL */ `
  subscription OnCreateMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onCreateMessages(filter: $filter) {
      id
      senderId
      message
      createdAt
      updatedAt
      chatsMessagesId
    }
  }
`;
export const onUpdateMessages = /* GraphQL */ `
  subscription OnUpdateMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onUpdateMessages(filter: $filter) {
      id
      senderId
      message
      createdAt
      updatedAt
      chatsMessagesId
    }
  }
`;
export const onDeleteMessages = /* GraphQL */ `
  subscription OnDeleteMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onDeleteMessages(filter: $filter) {
      id
      senderId
      message
      createdAt
      updatedAt
      chatsMessagesId
    }
  }
`;
