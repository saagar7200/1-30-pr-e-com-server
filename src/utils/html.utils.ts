import { Request } from "express";

export const account_registration_confirmation_html = (req:Request,user:any) =>{
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      padding: 20px;
      margin: 0;
    }
    .container {
      background-color: #ffffff;
      max-width: 600px;
      margin: auto;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #4CAF50;
    }
    h2 {
      color: #333333;
      margin-top: 30px;
    }
    p {
      font-size: 16px;
      color: #555555;
      margin: 10px 0;
    }
    span.label {
      font-weight: bold;
      color: #333333;
    }
    a.button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 24px;
      background-color: #4CAF50;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
    a.button:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Account Created Successfully</h1>
    <h2>Account Details</h2>
    <p><span class="label">Full Name:</span> ${user.full_name}</p>
    <p><span class="label">Email:</span> ${user.email}</p>
    <p><span class="label">Phone:</span> ${user.phone_number ?? 'Not provided'}</p>
    <p>
      You can now login to your account by clicking the button below:
    </p>
    <a href="${req.protocol}://${req.hostname}/login" class="button">Login to Your Account</a>
  </div>
</body>
</html>
`;
}


export const  oerder_confirmation_html = (items:any[],totalAmount:number) =>{
    return (
  `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f7f7;
      padding: 20px;
      margin: 0;
    }
    .container {
      background-color: #ffffff;
      padding: 30px;
      max-width: 600px;
      margin: auto;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    h1, h2 {
      color: #333333;
    }
    .order-summary {
      margin-top: 20px;
    }
    .order-header, .order-item, .order-total {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    .order-header {
      font-weight: bold;
      border-top: 2px solid #4CAF50;
      border-bottom: 2px solid #4CAF50;
      margin-bottom: 10px;
    }
    .order-total {
      font-weight: bold;
      border-top: 2px solid #4CAF50;
      margin-top: 10px;
    }
    .item-name {
      flex: 2;
    }
    .item-qty, .item-price {
      flex: 1;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Order Placed Successfully</h1>
    <p>Your order has been placed for <strong>${items.length}</strong> item(s).</p>

    <h2>Order Details</h2>

    <div class="order-summary">
      <div class="order-header">
        <div class="item-name">Product</div>
        <div class="item-qty">Quantity</div>
        <div class="item-price">Price</div>
      </div>

      ${
        items.map((item:any) => `
          <div class="order-item">
            <div class="item-name">${item.product?.name ?? '-'}</div>
            <div class="item-qty">${item.quantity ?? '-'}</div>
            <div class="item-price">${item.product?.price ? '$' + item.product.price.toFixed(2) : '-'}</div>
          </div>
        `).join('')
      }

      <div class="order-total">
        <div class="item-name">Total Amount</div>
        <div class="item-qty"></div>
        <div class="item-price">$${totalAmount.toFixed(2)}</div>
      </div>
    </div>
  </div>
</body>
</html>
`

    )
}
