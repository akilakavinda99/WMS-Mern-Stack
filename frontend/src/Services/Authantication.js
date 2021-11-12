export default{
  login : async user=>{
  const res = await fetch('/supplier/login', {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (res.status !== 401)
      return res.json().then(data => data);

    else
      return { isAuthenticated: false, user: { username: "", role: "" } };

  },
  logout : async ()=>{
    const res = await fetch('/supplier/logout');
    const data = await res.json();
    return data;
  },

  isAuthenticated : async ()=>{
    const res = await fetch('/supplier/supplierauthenticated');
    if (res.status !== 401)
      return res.json().then(data => data);

    else
      return { isAuthenticated: false, user: { username: "", role: "" } };
  }
}