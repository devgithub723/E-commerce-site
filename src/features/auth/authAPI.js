// signup
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const responce = await fetch("/auth/signup", {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' }
    })
    const data = await responce.json()
    resolve({ data })
  }
  )
}
// login
export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try{
      const responce = await fetch("/auth/login", {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' }
      })
      if(responce.ok){
        const data = await responce.json()
        resolve({ data })
      }else{
        const err = await responce.text()
        reject(err)
      }
    } catch (err){
      reject({err})
    }
  }
  )
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try{
      const responce = await fetch("/auth/check")
      if(responce.ok){
        const data = await responce.json()
        resolve({ data })
      }else{
        const err = await responce.text()
        reject(err)
      }
    } catch (err){
      reject({err})
    }
  }
  )
}

export function signOut(userId) {
  return new Promise(async (resolve, reject) => {
    try{
      const responce = await fetch("/auth/logout")
      if(responce.ok){
        resolve({ data: "success" })
      }else{
        const err = await responce.text()
        reject(err)
      }
    } catch (err){
      reject({err})
    }
  }
  )
}


export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/reset-password-request', {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }

  });
}

export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
      });
      console.log("reset password:- ", response.ok)
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }

  });
}




// export function resetPasswordRequest(email) {
//   return new Promise(async (resolve, reject) => {
//     try{
//       const responce = await fetch("/auth/reset-password-request", {
//         method: 'POST',
//         body: JSON.stringify({email}),
//         headers: { 'content-type': 'application/json' }
//       })
//       if(responce.ok){
//         const data = await responce.json()
//         resolve({ data })
//       }else{
//         const err = await responce.text()
//         reject(err)
//       }
//     } catch (err){
//       reject(err)
//     }
//   }
//   )
// }

// export function resetPassword(data) {
//   return new Promise(async (resolve, reject) => {
//     try{
//       const responce = await fetch("/auth/reset-password", {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: { 'content-type': 'application/json' }
//       })
//       if(responce.ok){
//         const data = await responce.json()
//         resolve({ data })
//       }else{
//         const err = await responce.text()
//         reject(err)
//       }
//     } catch (err){
//       reject(err)
//     }
//   }
//   )
// }