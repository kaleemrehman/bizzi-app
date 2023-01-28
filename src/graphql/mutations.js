/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClient = /* GraphQL */ `
  mutation CreateClient(
    $input: CreateClientInput!
    $condition: ModelClientConditionInput
  ) {
    createClient(input: $input, condition: $condition) {
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
export const updateClient = /* GraphQL */ `
  mutation UpdateClient(
    $input: UpdateClientInput!
    $condition: ModelClientConditionInput
  ) {
    updateClient(input: $input, condition: $condition) {
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
export const deleteClient = /* GraphQL */ `
  mutation DeleteClient(
    $input: DeleteClientInput!
    $condition: ModelClientConditionInput
  ) {
    deleteClient(input: $input, condition: $condition) {
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
export const createSeller = /* GraphQL */ `
  mutation CreateSeller(
    $input: CreateSellerInput!
    $condition: ModelSellerConditionInput
  ) {
    createSeller(input: $input, condition: $condition) {
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
export const updateSeller = /* GraphQL */ `
  mutation UpdateSeller(
    $input: UpdateSellerInput!
    $condition: ModelSellerConditionInput
  ) {
    updateSeller(input: $input, condition: $condition) {
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
export const deleteSeller = /* GraphQL */ `
  mutation DeleteSeller(
    $input: DeleteSellerInput!
    $condition: ModelSellerConditionInput
  ) {
    deleteSeller(input: $input, condition: $condition) {
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
export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
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
export const updateTransaction = /* GraphQL */ `
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {
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
export const deleteTransaction = /* GraphQL */ `
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    deleteTransaction(input: $input, condition: $condition) {
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
export const createListings = /* GraphQL */ `
  mutation CreateListings(
    $input: CreateListingsInput!
    $condition: ModelListingsConditionInput
  ) {
    createListings(input: $input, condition: $condition) {
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
export const updateListings = /* GraphQL */ `
  mutation UpdateListings(
    $input: UpdateListingsInput!
    $condition: ModelListingsConditionInput
  ) {
    updateListings(input: $input, condition: $condition) {
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
export const deleteListings = /* GraphQL */ `
  mutation DeleteListings(
    $input: DeleteListingsInput!
    $condition: ModelListingsConditionInput
  ) {
    deleteListings(input: $input, condition: $condition) {
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
export const createChats = /* GraphQL */ `
  mutation CreateChats(
    $input: CreateChatsInput!
    $condition: ModelChatsConditionInput
  ) {
    createChats(input: $input, condition: $condition) {
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
export const updateChats = /* GraphQL */ `
  mutation UpdateChats(
    $input: UpdateChatsInput!
    $condition: ModelChatsConditionInput
  ) {
    updateChats(input: $input, condition: $condition) {
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
export const deleteChats = /* GraphQL */ `
  mutation DeleteChats(
    $input: DeleteChatsInput!
    $condition: ModelChatsConditionInput
  ) {
    deleteChats(input: $input, condition: $condition) {
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
export const createMessages = /* GraphQL */ `
  mutation CreateMessages(
    $input: CreateMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    createMessages(input: $input, condition: $condition) {
      id
      senderId
      message
      createdAt
      updatedAt
      chatsMessagesId
    }
  }
`;
export const updateMessages = /* GraphQL */ `
  mutation UpdateMessages(
    $input: UpdateMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    updateMessages(input: $input, condition: $condition) {
      id
      senderId
      message
      createdAt
      updatedAt
      chatsMessagesId
    }
  }
`;
export const deleteMessages = /* GraphQL */ `
  mutation DeleteMessages(
    $input: DeleteMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    deleteMessages(input: $input, condition: $condition) {
      id
      senderId
      message
      createdAt
      updatedAt
      chatsMessagesId
    }
  }
`;
