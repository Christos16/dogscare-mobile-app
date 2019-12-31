export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const GET_SITTERS = 'GET_SITTERS';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const GET_SITTER = 'GET_SITTER';
export const BOOK_SITTER = 'BOOK_SITTER';

export const fetchSitters = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://europe-west1-dogs-care.cloudfunctions.net/api/sitters'
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const resData = await response.json();

      dispatch({ type: GET_SITTERS, sitters: resData });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = productId => {
  return async dispatch => {
    await fetch(
      `https://tribe-628a0.firebaseio.com/products/${productId}.json`,
      {
        method: 'DELETE'
      }
    );
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    const response = await fetch(
      'https://tribe-628a0.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, imageUrl, price })
      }
    );

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title: title,
        description,
        imageUrl,
        price
      }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async dispatch => {
    await fetch(`https://tribe-628a0.firebaseio.com/products/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, imageUrl })
    });

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title: title,
        description,
        imageUrl
      }
    });
  };
};

export const getSitter = () => {
  return async dispatch => {
    const response = await fetch(
      `https://europe-west1-dogs-care.cloudfunctions.net/api/sitters/${sitterId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: GET_SITTER,
      sitter: resData
    });
  };
};

export const bookSitter = (token, from, to, comment) => {
  return async dispatch => {
    const response = await fetch(
      `https://europe-west1-dogs-care.cloudfunctions.net/api/sitter/${sitterId}/booking`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          from: from,
          to: to,
          comment: comment
        })
      }
    );
    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: BOOK_SITTER,
      reservation: resData
    });
  };
};
