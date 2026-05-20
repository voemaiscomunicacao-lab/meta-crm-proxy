exports.handler = async function(event) {
  const { formId, token } = event.queryStringParameters;
  
  if (!formId || !token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "formId e token são obrigatórios" })
    };
  }

  const url = `https://graph.facebook.com/v19.0/${formId}/leads?fields=id,created_time,field_data&access_token=${token}&limit=100`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
