let _id = 1;
export function uniqueId() {
  return _id++;
}

/*
export function createCustomer({ customerName, projectDefault }) {
  return {
    type: "CREATE_CUSTOMER",
    payload: {
      customerId: uniqueId(),
      customerName,
      projectDefault
    }
  };
}

export function updateCustomer({ customerId, customerName, projectDefault }) {
  return {
    type: "UPDATE_CUSTOMER",
    payload: {
      customerId: customerId,
      customerName,
      projectDefault
    }
  };
}
*/
