const options = {
    apiVersion: "v1",
    endpoint: process.env.VAULT_ENDPOINT,
    namespace: process.env.VAULT_NAMESPACE
  }

const vault = require("node-vault")(options);
  
  const roleId = process.env.VAULT_ROLE_ID;
  const secretId = process.env.VAULT_SECRET_ID;
  
  const run = async () => {
    const result = await vault.approleLogin({
        role_id: roleId,
        secret_id: secretId,
    });
    vault.token = result.auth.client_token;
    const test = await vault.write("kv/data/test",{value:"test2"})
    const data = await vault.read("kv/data/test").then(e=>e.data).catch(()=>null)
    console.log(data)

  };
  
  run();